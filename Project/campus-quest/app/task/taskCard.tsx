import { taskData } from "./dailyTask"
import Image from "next/image"

const Card = (item: taskData) => {
    return (
        <div key = {item.id} className = "bg-[#1C2A35] w-9/10 translate-x-1/20 p-3 rounded-[10] text-white">
            <div className=" grid grid-cols-3">
                <p className="text-left ">{item.name}</p>
                <p className="text-center">{item.class}</p>
                <div className="flex ml-auto">
                    <p className="pr-2">{item.coins}</p>
                    <Image 
                        src="/illini_coin.png" 
                        width = {42}
                        height = {42}
                        alt = "Image of gold coin"
                        className="self-center -translate-y-2"
                    />
                </div>
            </div>
            <p className="pb-3 text-left">{item.description}</p>
            <a href={item.link} className="text-blue-500" target="_blank">{item.link}</a>
        </div>
    )
}

export default Card