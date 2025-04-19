import supabase from "../supabaseClient";
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
    const { data, error } = await supabase
                                    .from("tasks")
                                    .select("id, name, class, due_date, coins, link, comments, user_id")
                                    .eq("user_id", uid)
    if (error) {
        console.error('Error fetching tasks:', error);
        return <div>Error loading tasks</div>;
    }
    var rawTasks = JSON.parse(JSON.stringify(data || []));
    var tasks = Object.groupBy((rawTasks.sort(function (a : taskData, b : taskData) {
        const dateA = Date.parse(a.due_date)
        const dateB = Date.parse(b.due_date)
        if (dateA == dateB) {
            return 0
        } else if (dateA > dateB) {
            return 1
        }
        return -1
    })), ({due_date} : {due_date: String}) => due_date.split("T")[0])
    var taskCounts =  Object.fromEntries(Object.entries(tasks).map((Day) => [Day[0], Day[1]?.length]))

    return (
        <TaskPage rawTasks = {rawTasks} tasks = {JSON.parse(JSON.stringify(tasks))} taskCounts={taskCounts}/>
    )
}

export const Delete = async (id: string) => {
    console.log(id)
    const {data, error} = await supabase
                            .from("tasks")
                            .delete()
                            .eq("id", id)
    
}

export default Tasks