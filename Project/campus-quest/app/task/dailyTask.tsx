import Image from "next/image"

export function Tasks () {
    const data = [
        {
            day : new Date("2023-08-19T00:00:00.000Z"),
            task : "Reading",
            course : "ENG 100",
            coins : 2,
            id : 1
        },
        {
            day : new Date("2024-08-19T00:00:00.000Z"),
            task : "Homework",
            course : "MATH 100",
            coins : 2,
            id : 2
        },
        {
            day : new Date("2023-08-20T00:00:00.000Z"),
            task : "Reading",
            course : "ENG 100",
            coins : 2,
            id : 3
        },
        {
            day : new Date("2023-08-21T00:00:00.000Z"),
            task : "Reading",
            course : "ENG 100",
            coins : 2,
            id : 4
        },
        {
            day : new Date("2023-08-21T00:00:00.000Z"),
            task : "Reading",
            course : "ENG 100",
            coins : 2,
            id : 1
        },
        {
            day : new Date("2024-08-22T00:00:00.000Z"),
            task : "Homework",
            course : "MATH 100",
            coins : 2,
            id : 2
        },
        {
            day : new Date("2023-08-22T00:00:00.000Z"),
            task : "Reading",
            course : "ENG 100",
            coins : 2,
            id : 3
        },
        {
            day : new Date("2023-08-22T00:00:00.000Z"),
            task : "Reading",
            course : "ENG 100",
            coins : 2,
            id : 4
        }
    ]
    const sort = data.sort(function (a, b) {
        if (a.day > b.day) return 1
        if (b.day > a.day) return -1
        return 0
    })
    const byDay = Object.groupBy(sort, ({day}) => day.toISOString().split("T")[0])
    const test = Object.entries(byDay)
    console.log(test)

    return (
        <div className = "flex">
            <iframe className = "w-3/5 h-screen p-10" src="https://calendar.google.com/calendar/embed?src=unnownforces777%40gmail.com"></iframe>
            <div className = "bg-gray-300 w-2/5 h-screen pl-5 pr-5">
                <h1 className = "text-center text-[64px]"> TO-DO List</h1>
                <div className = "overflow-auto h-4/5 p-5 rounded-l-[25] bg-gray-200">
                    {Object.entries(byDay).map((Day) => (
                        <div key = {Day[0]} className="pb-10 grid grid-col-1 grid-flow-row gap-2"> 
                            <p className = "text-[32px] text-left">
                                {formatDate(Day[0])} 
                            </p>
                            {Day[1]?.map((item) => (
                            <div key = {item.id} className = "bg-gray-500 w-19/20 translate-x-1/20 h-12 flex items-center justify-between pr-3 pl-3">
                                <p>{item.task}</p>
                                <p>{item.course}</p>
                                <div className="flex items-center">
                                    <p>{item.coins}</p>
                                    <Image 
                                        src="/illini_coin.png" 
                                        width = {42}
                                        height = {42}
                                        alt = "Image of gold coin"
                                        className="self-center pl-2"
                                    />
                                </div>
                            </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
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

    return date + " | " + s.substring(5)
}