"use client"
import { taskCounts, taskData } from "./taskMaster";
import Image from "next/image";
import "./details.css"
import { act, Dispatch, SetStateAction, useState } from "react";
import { Delete } from "./taskMaster";

const TaskList = ({tasks, counts, trig}: 
    {tasks : { any? : taskData[] }, counts : taskCounts, trig : Dispatch<SetStateAction<boolean>>}) => {
    const [active, setActive] = useState(0)
    const [activeOption, setOption] = useState(0)

    return (
    <div id = "taskList" className = "overflow-auto h-full p-5 rounded-[25] bg-[#171E24] no-scrollbar">
        {Object.entries(tasks).map((Day) => (
            <div key = {Day[0]} id = {Day[0]} className="pb-5 grid grid-col-1 grid-flow-row gap-2 border-1 border-transparent rounded-[10]"> 
                <div className = "text-[32px] grid grid-cols-3">
                    <p className="text-left">{formatDate(Day[0])} </p>
                    <p className="text-center">{Day[0].substring(5)}</p>
                </div>
                {Day[1]!.map((item: taskData) => (
                    <div  key = {item.id} className="flex justify-center">
                        <div onClick={() => {
                            setActive(active == item.id ? 0 : item.id)
                            setOption(0)
                        }} className = {(active == item.id? "bg-[#304B5E]": "bg-[#1C2A35]") + " text-wrap break-words w-160 p-1 px-3 rounded-[10] text-white"}>
                            <div className="grid grid-cols-3 font-bold">
                                <p className="text-left ">{item.name}</p>
                                <p className="text-center">{item.class}</p>
                                <div className="flex ml-auto">
                                    <p className="pr-2">{item.coins}</p>
                                    <Image 
                                        src="/illini_coin.png" 
                                        width = {20}
                                        height = {20}
                                        alt = "Image of gold coin"
                                        className="self-center"
                                    />
                                </div>
                            </div>
                            <p className="text-left">{item.comments}</p>
                            <a href={item.link} className="text-blue-500" target="_blank">{item.link}</a>
                        </div>
                        <div className={active == item.id ? "flex items-center pl-1":"hidden"}>
                            <div className={(activeOption == 0 ? "grid pl-2 grid-row-3":"hidden")}>
                                <Image 
                                    src="/deleteIcon.png" 
                                    width = {30}
                                    height = {30}
                                    alt = "Delete Task"
                                    onClick={() => setOption(1)}
                                />
                                <Image 
                                    src="/editIcon.png" 
                                    width = {30}
                                    height = {30}
                                    alt = "Edit Task"
                                    onClick={() => setOption(2)}
                                />
                                <Image 
                                    src="/confirmIcon.png" 
                                    width = {30}
                                    height = {30}
                                    alt = "Complete Task"
                                    onClick={() => setOption(3)}
                                />
                            </div>
                            <div className={activeOption == 1 ? "select-none bg-red-700 w-12 rounded-[3] text-white text-[12px]":"hidden"}
                                onClick={() => {
                                    // Delete(item.id)
                                    const day = Day[0] as keyof {any?:taskData[]}
                                    tasks[day] = tasks[day]?.filter(x => x.id != item.id)
                                    if (tasks[day]?.length == 0) delete tasks[day]
                                    setActive(0)
                                    setOption(0)
                                    if (counts[day] == 1) delete counts[day]
                                    else {
                                        counts[day] = counts[day]! - 1
                                    }
                                    trig(true)
                                }}>
                                <p className="">Delete Task</p>
                            </div>
                            <div className={activeOption == 3 ? "select-none bg-green-500 w-12 rounded-[3] text-white text-[12px]":"hidden"}>
                                <p className="align-middle">Finish Task</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ))}
    </div>
    )
}

function formatDate(s: string) {
    var date;
    switch(new Date(s).getDay()) {
        case 0: date = "SUN"
            break;
        case 1: date = "MON"
            break;
        case 2: date = "TUES"
            break;
        case 3: date = "WED"
            break;
        case 4: date = "THUR"
            break;
        case 5: date = "FRI"
            break;
        case 6: date = "SAT"
            break;        
    }

    return date
}

export default TaskList