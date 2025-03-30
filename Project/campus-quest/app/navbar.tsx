'use client'
import React,{useState} from "react"

const Navbar = () => {
// Name of the menus at the bottom of the page
const Menus =[
    {name: "Task Tracker"},
    {name: "Quad Quest"},
]
const [active, setActive] = useState(0);
    return (
        <div className='bg-blue-950 h-20 w-140 absolute bottom-15 rounded-full px-4'>
         <ul className='flex relative'>
            {Menus.map((menu,i) => (
                <li className='w=20' key={i}>
                  <a className='text-orange-600 text-3xl flex flex-col text-center p-5 cursor-pointer px-11' onClick={() => setActive(i)}>
                   <span className={`${active === i ? "duration-700 opacity-100 font-bold":"opacity-40"}`}>
                    {menu.name}
                   </span>
                  </a>
                </li>
            ))}
         </ul>
        </div>
    )
}

export default Navbar