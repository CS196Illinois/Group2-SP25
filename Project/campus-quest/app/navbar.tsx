'use client'
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();

    const Menus = [
        { name: "Task Tracker", href: "/tasktracker" },
        { name: "Quad Quest", href: "/quadquest" },
    ];

    return (
        <div className='bg-blue-950 h-20 w-fit absolute bottom-10 left-1/2 -translate-x-1/2 rounded-full px-4'>
            <ul className='flex gap-x-8 items-center h-full px-4'>
                {Menus.map((menu, i) => {
                    const isActive = pathname === menu.href;
                    return (
                        <li key={i}>
                            <Link
                                href={menu.href}
                                className='text-orange-600 text-xl flex flex-col text-center p-5 cursor-pointer'
                            >
                                <span className={`${isActive ? "font-bold opacity-100" : "opacity-50"}`}>
                                    {menu.name}
                                </span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Navbar;

