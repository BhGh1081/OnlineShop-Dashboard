'use client'

import { MdDashboard } from "react-icons/md";
import Toggle from "../ui/toggle";
import { BiSolidUserCircle } from "react-icons/bi";
import React, { useState } from "react";
import clsx from "clsx";
import { BellAlertIcon, Bars4Icon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import { poppins } from "../ui/font";


export default function TopBar({ children }: { children?: React.ReactNode }) {

    const [profile, setProfile] = useState(false);
    const pathname = usePathname();
    const title = (pathname.split('/'));

    return (
        <div className="bg-background relative h-[5rem] w-full flex items-center justify-between rounded-md p-1 md:p-4">
            <div className="flex items-center">
                <div className="md:hidden">
                    <MdDashboard className="w-15 h-15 text-primary" />
                </div>
                <strong className='font-poppins text-[1.3rem] font-bold'>{title[title.length - 1].toLocaleUpperCase()}</strong>
                {/* <div className="h-[5rem] flex justify-center lg:justify-start items-center rounded-md px-1 mb-1">
                    <MdDashboard className="w-15 h-15 text-primary" />
                    <strong className={`${poppins.className} font-poppins text-[1.5rem] font-extrabold hidden lg:block`}>Pasta</strong>
                </div> */}
            </div>
            {children}
            <div className="sm:hidden">
                <Bars4Icon className="w-10 h-10" />
            </div>
            <div className="hidden sm:flex gap-2">
                <Toggle />
                <div className="flex w-12 h-12 justify-center items-center border-solid border-1 border-gray-400 rounded-lg hover:bg-gray-400/20">
                    <BellAlertIcon className="w-8 h-8" />
                </div>
                <div className="relative z-10" >
                    <div className="w-12 h-12 flex items-center justify-center border-solid border-1 border-gray-400 rounded-lg p-1 hover:bg-gray-400/20">
                        <BiSolidUserCircle
                            onClick={() => setProfile(!profile)}
                            className="w-10 h-10" />
                    </div>
                    {/*<div className={clsx("w-0 h-0 absolute top-12 right-5 border-transparent border-t-solid border-t-10 border-r-solid border-r-10 border-b-solid border-b-10 border-b-modal border-l-solid border-l-10 transition-all duration-400 ease-in-out", !profile ? 'opacity-1' : 'opacity-100')}>
                    </div> */}
                    <div 
                        onMouseLeave={() => setProfile(false)}
                        className={clsx("bg-modal h-45 shadow-md w-50 absolute space-y-6 justify-start px-6 py-4 rounded-lg top-21 right-0 transition-all duration-400 ease-in-out", !profile ? 'translate-0 opacity-0' : '-translate-y-5 opacity-100')}>
                        <div className="border-b-solid border-b-1 border-b-gray-300 py-4">
                            <p>Petter John</p>
                            <p className="text-[.8rem] text-gray-400">Admin</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}