"use client"
import Calendar, { OnArgs } from 'react-calendar'
import "./calendar.css"
import { taskCounts } from './taskMaster'
import { useState } from 'react'
const colorNames = [
            "bg-[#545FFF]",
            "bg-[#39CE41]",
            "bg-[#DDC402]",
            "bg-[#E8770D]",
            "bg-[#E80624]",
        ]

const CalendarController = ({counts} : {counts : taskCounts}) => {
    const [date, setDate] = useState(new Date())

    date.setDate(1)

    const minDate = new Date(Object.keys(counts)[0])
    minDate.setMonth(minDate.getMonth() - 1)

    const maxDate = new Date(Object.keys(counts).toReversed()[0])

    function tileClassName ({date, view,}: {date: Date, view: string}) {
        var day = date.toISOString().split("T")[0]
        if(day in counts) {
            return colorNames[Math.min(counts[day]! - 1, colorNames.length)]
        }
        return "bg-[#1C2A35]"
    }
    function scrollToDay (value: Date, event: any) {
        let scroll_to = document.getElementById(value.toISOString().split("T")[0])
        if (scroll_to != null) {
            document.getElementById("taskList")!.scrollTo({ behavior: "smooth", top: scroll_to.offsetTop - 100});
            scroll_to.classList.remove("highlight")
            void scroll_to.offsetWidth
            scroll_to.classList.add("highlight")
        }
    }
    function onActiveStartDateChange ( {action, activeStartDate, value, view}: OnArgs) {
        if (action == "prev") {
            date.setMonth(date.getMonth() - 1)
            if (date < minDate) {
                date.setMonth(date.getMonth() + 1)
            }
        } else if (action == "next") {
            date.setMonth(date.getMonth() + 1)
            if (date > maxDate) {
                date.setMonth(date.getMonth() - 1)
            }
        }
    }

    
    return (
        <div>
            <Calendar activeStartDate = {date} minDetail="month" minDate={new Date(2024, 1, 1)} calendarType="gregory" onClickDay={scrollToDay} tileClassName={tileClassName} onActiveStartDateChange={onActiveStartDateChange}/>
        </div>
    )
}

export default CalendarController