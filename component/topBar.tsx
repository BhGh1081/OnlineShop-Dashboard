'use client'

import { MdDashboard } from "react-icons/md";
import Toggle from "../ui/toggle";
import { BellAlertIcon, Bars4Icon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import Profile from "./profile";



export default function TopBar({ children }: { children?: React.ReactNode }) {
    
    const pathname = usePathname();
    const title = (pathname.split('/'));

    return (
        <div className="bg-background relative h-20 w-full flex items-center justify-between rounded-md p-1 md:p-4">
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
                <Profile />
            </div>
        </div>
    )
}