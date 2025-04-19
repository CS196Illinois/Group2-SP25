"use client"
import CalendarController from "./calendar";
import TaskList from "./taskList";
import { taskCounts, taskData } from "./taskMaster";
import { useState } from "react";

interface taskPageProps {
    rawTasks : taskData[]
    tasks : {any?: taskData[]}
    taskCounts : taskCounts
}

const TaskPage = ({rawTasks, tasks, taskCounts} : taskPageProps) => {
    const style = `.no-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .no-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }`;
    const [editing, setEditItem] = useState(0)
    const [taskState, setTasks] = useState(tasks)
    const [taskCountsState, setCounts] = useState(taskCounts)
    const [refresh, trigger] = useState(false)
    if(refresh) trigger(false)

    return (
        <div className="h-screen w-screen bg-[#061119]">
            <h1 className = "text-center text-[64px] h-1/10 text-white">Task Tracker</h1>
            <div className = "flex justify-center h-9/10">
                <div className = "w-2/5 p-5 justify-center pb-10">
                    <div className="bg-[#171E24] p-5 rounded-[10] w-120 self-start h-3/5">
                        <CalendarController counts={taskCounts}/>
                    </div>
                    <div className="pt-5 pb-10 h-2/5">
                        <div className="bg-[#171E24] w-120 h-1/1 rounded-[10] text-center text-white py-3">
                            <p>{rawTasks.length} Tasks Remaining</p>
                        </div>
                    </div>
                </div>
                <div className = "w-3/5 p-5 text-blue-500">
                    <style>
                        {style}
                    </style>
                    <TaskList tasks={taskState} counts={taskCountsState} trig = {trigger}/>
                </div>
            </div>
        </div>
    )
}

export default TaskPage