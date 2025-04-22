"use client"
import Add_Task_Form from "./addTasks";
import CalendarController from "./calendar";
import TaskList from "./taskList";
import { taskCounts, taskData } from "./taskMaster";
import { useState } from "react";

interface taskPageProps {
    rawTasks : taskData[]
    tasks : {any?: taskData[]}
    taskCounts : taskCounts
    coinsData : number
}

const TaskPage = ({rawTasks, taskCounts, coinsData} : taskPageProps) => {
    const style = `.no-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .no-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }`;
    const [taskState, setTasks] = useState(rawTasks)
    const [taskCountsState, setCounts] = useState(taskCounts)
    const [refresh, trigger] = useState(false)
    const [coins, setCoins] = useState(coinsData)
    if(refresh) trigger(false)

    return (
        <div className="h-screen w-screen bg-[#061119]">
            <h2 className = "text-center text-[64px] h-1/10 text-white">Task Tracker</h2>
            <div className = "flex justify-center h-9/10">
                <div className = "w-2/5 p-5 justify-center h-19/20 overflow-hidden">
                    <div className="bg-[#171E24] p-5 rounded-[10] w-120 self-start">
                        <CalendarController counts={taskCounts}/>
                    </div>
                    <div className="pt-5 pb-10 h-1/5">
                        <div className="bg-[#171E24] w-120 h-200 rounded-[10] text-center items-center text-white py-3">
                            <div className={rawTasks.length > 0 ? "text-[30px]":"hidden"}>
                                <h2>{rawTasks.length} Tasks Remaining</h2>
                                <h2 className="pb-3">Upcoming deadline: {rawTasks[0].due_date.split("T")[0]}</h2>
                                <Add_Task_Form/>
                                <h2 className="pt-3">Coins: {coins}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className = "w-3/5 p-5 text-blue-500">
                    <style>
                        {style}
                    </style>
                    <TaskList tasks={taskState} counts={taskCountsState} trig = {trigger} coins={coins} setCoins={setCoins}/>
                </div>
            </div>
        </div>
    )
}

export default TaskPage