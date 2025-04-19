const Navbar = ({selected}:{selected: number}) => {
// Name of the menus at the bottom of the page
const Menus =[
    {name: "Task Tracker", page: "task"},
    {name: "Quad Quest", page:"game"},
] 
    return (
        <div className="w-screen absolute bottom-4 flex justify-center">
            <div className='bg-blue-950 h-16 w-120 rounded-full px-4 z-1000'>
            <ul className='flex'>
                {Menus.map((menu,i) => (
                    <li className='w-1/2' key={i}>
                    <a href = {"/" + menu.page} className='text-orange-600 text-2xl translate-y-2 pt-2 flex flex-col text-center cursor-pointer'>
                    <span 
                        className={`${selected == i ? "duration-700 opacity-100 font-bold":"opacity-40"}`}
                    >
                        {menu.name}
                    </span>
                    </a>
                    </li>
                ))}
            </ul>
            </div>
        </div>
    )
}

export default Navbar