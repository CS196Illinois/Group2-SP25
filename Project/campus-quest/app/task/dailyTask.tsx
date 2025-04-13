import supabase from "../supabaseClient"
import Card from "./taskCard"
import calendar from "./calendar";
import Calendar from "react-calendar";
import Image from "next/image";

export type taskData = {
    id: any;
    name: any;
    class: any;
    due_date: any;
    coins: any;
    link: any;
    description: any;
}
export type taskCounts =  {
    [k: string]: number | undefined;
}


const uid = 1
const Tasks = async () => {
    const { data, error } = await supabase
                                    .from("tasks")
                                    .select("id, name, class, due_date, coins, link, description, user_id")
                                    .eq("user_id", 1)
                                    .order("due_date")
    var tasks = Object.groupBy((data!.sort(function (a, b) {
        if (a.due_date > b.due_date) return 1
        if (b.due_date > a.due_date) return -1
        return 0
    })), ({due_date}) => due_date.split("T")[0])
    const taskCounts = Object.fromEntries(Object.entries(tasks).map((Day) => [Day[0], Day[1]?.length]))


    const style = `.no-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .no-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }`;

    return (
        <div className = "flex">
            <div className = "bg-[#061119] w-2/5 h-screen p-2 grid grid-col-1 grid-row-3 justify-center">
                <div className="bg-[#171E24] p-5 translate-y-10 h-75 rounded-[10] w-120">
                    {calendar(taskCounts)}
                </div>
                <div className="bg-[#171E24] translate-y-2 h-75 rounded-[10]">
                </div>
            </div>
            <div className = "bg-[#061119] w-3/5 h-screen pl-5 pr-5 text-white">
                <h1 className = "text-center text-[64px]"> TO-DO List</h1>
                <style>
                    {style}
                </style>
                <div className = "overflow-auto h-4/5 p-5 rounded-[25] bg-[#171E24] no-scrollbar">
                    {Object.entries(tasks).map((Day) => (
                        <div key = {Day[0]} className="pb-5 grid grid-col-1 grid-flow-row gap-2"> 
                            <div className = "text-[32px] grid grid-cols-3">
                                <p className="text-left">{formatDate(Day[0])} </p>
                                <p className="text-center">{Day[0].substring(5)}</p>
                            </div>
                            {Day[1]?.map((item) => Card(item))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Tasks

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

