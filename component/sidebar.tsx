'use client';

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { DocumentTextIcon, ClipboardDocumentListIcon, ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { MdDashboard } from "react-icons/md";
import { poppins } from "../ui/font";

export default function Sidebar({ className }: { className?: string }) {

    const pathname = usePathname();

    const items = [
        { name: 'Home', href: '/dashboard', icon: HomeIcon },
        { name: 'Orders', href: '/dashboard/orders', icon: DocumentTextIcon },
        { name: 'Reports', href: '/dashboard/reports', icon: ClipboardDocumentListIcon },
        { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
    ]

    return (
        <div className={`bg-background flex md:flex-col  rounded-lg md:w-[12%] lg:w-[20%]  ${className}`}>

            <Link href={'./'} className="h-[5rem] flex justify-center lg:justify-start items-center rounded-md px-1 mb-1">
                <MdDashboard className="w-15 h-15 text-primary" />
                <strong className={`${poppins.className} font-poppins text-[1.5rem] font-extrabold hidden lg:block`}>Pasta</strong>
            </Link>
            <section className="mb-10">
                <h2 className="text-gray-400 text-[0.9rem] px-2 text-center lg:text-start">Menu</h2>
                {items.map((item, index) => {
                    const LinkIcon = item.icon;
                    return (
                        <Link key={index}
                            className={clsx("flex md:flex-col lg:flex-row w-full md:items-center lg:items-start gap-2 p-2 lg:py-3 rounded-md md:hover:bg-secondry md:hover:text-primary ", item.href === pathname && 'text-primary bg-secondry')}
                            href={item.href}>
                            <LinkIcon className="w-6 h-6" />
                            <p>{item.name}</p>
                        </Link>
                    )
                })}
            </section>
            <section>
                <h2 className="text-gray-400 text-[0.9rem] text-center lg:text-start px-2">General</h2>
                <div className="flex gap-2 md:flex-col lg:flex-row md:items-center lg:items-start p-2 py-3 rounded-md md:hover:bg-secondry md:hover:text-primary">
                    <ArrowLeftStartOnRectangleIcon className="w-6 h-6" />
                    <button className="">Logout</button>
                </div>
            </section>
        </div >
    )
}
