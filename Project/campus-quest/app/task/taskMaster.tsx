import supabase from "../../lib/supabaseClient";
import TaskPage from "./tasksLayout";

export type taskData = {
    id: any;
    name: any;
    class: any;
    due_date: any;
    coins: any;
    link: any;
    comments: any;
}
export type taskCounts =  {
    [k: string]: number | undefined;
}

const uid = 1
const Tasks = async () => {
    const batch = await Promise.all([
        await supabase.from("tasks").select("id, name, class, due_date, coins, link, comments").eq("user_id", uid),
        await supabase.from("users").select("id, Coins").eq("id", uid)
    ])
    if (batch[0].error || batch[1].error) {
        console.error('Error fetching tasks:', batch[0].error);
        console.error('Error fetching coins', batch[1].error)
        return <div>Error loading tasks</div>;
    }
    var rawTasks = JSON.parse(JSON.stringify(batch[0].data || []));
    var tasks = Object.groupBy((rawTasks.sort(CompareTasks)), ({due_date} : {due_date: String}) => due_date.split("T")[0])
    var taskCounts =  Object.fromEntries(Object.entries(tasks).map((Day) => [Day[0], Day[1]?.length]))
    const coins = batch[1].data?.filter(x => x.id == uid)[0].Coins

    return (
        <TaskPage rawTasks = {rawTasks} coinsData = {coins} tasks = {JSON.parse(JSON.stringify(tasks))} taskCounts={taskCounts}/>
    )
}

export const Delete = async (id: string) => {
    const {data, error} = await supabase
                            .from("tasks")
                            .delete()
                            .eq("id", id)
    
}

export const CompleteTask = async (coins: number) => {
    // Delete(id)
    const {error} = await supabase
                        .from("users")
                        .update({"Coins" : coins})
                        .eq("id", uid)
}

export const EditTask = async (task: taskData) => {
    console.log(task)
}

export const AddTasks = async (tasks: any[]) => {
    if (tasks.length === 0) return;
    const { error } = await supabase.from("tasks").insert(
        tasks.map((task) => ({
            name: task.name,
            comments: task.comments,
            due_date: task.dueDate,
            category: task.category,
        }))
    );

    if (error) {
        console.error("❌ Failed to submit tasks:", error.message);
        alert("Something went wrong while submitting tasks.");
    } else {
        console.log("✅ All tasks submitted!");
        alert("All tasks submitted successfully.");
    }
}

export function CompareTasks (a : taskData, b : taskData) {
    const dateA = Date.parse(a.due_date)
    const dateB = Date.parse(b.due_date)
    if (dateA == dateB) {
        return 0
    } else if (dateA > dateB) {
        return 1
    }
    return -1
}

export default Tasks