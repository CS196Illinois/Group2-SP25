import Calendar from 'react-calendar'
import "./calendar.css"
import Month from 'react-calendar/dist/cjs/YearView/Month'
import { View } from 'react-calendar/dist/cjs/shared/types'
import { taskCounts } from './dailyTask'
// const colorNames = [
        //     "bg-red-300",
        //     "bg-orange-300",
        //     "bg-yellow-300",
        //     "bg-lime-300",
        //     "bg-blue-300",
        //     "bg-purple-300"
        // ]

const calendar = (counts: taskCounts) => {
    function tileClassName ({date, view}: {date: Date, view: string}) {
        return "font-bold"
        // if(view == 'month') {
        //     var day = date.toDateString().split("T")[0]
        //     if(day in counts) {
        //         return colorNames[Math.min(counts[day]!, colorNames.length)]
        //     }
        // }
    }

    return (
        <Calendar minDetail="month" calendarType="gregory"/>
    )
}

export default calendar