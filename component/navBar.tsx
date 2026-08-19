'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { HomeIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { DocumentTextIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

export default function NavBar({ className }: { className?: string }) {

    const pathname = usePathname();

    const links = [
        { name: 'Home', href: '/dashboard', icon: HomeIcon },
        { name: 'Orders', href: '/dashboard/orders', icon: DocumentTextIcon },
        { name: 'Reports', href: '/dashboard/reports', icon: ClipboardDocumentListIcon },
        { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
    ]
    return (
        <div className="md:hidden flex w-full h-[60px] justify-between px-4">

            {links.map((item, index) => {
                const LinkIcon = item.icon
                return (
                    <Link
                        key={index}
                        href={item.href}
                        className={clsx("w-full flex flex-col justify-center items-center", pathname === item.href && 'text-primary')} >
                        <LinkIcon className="w-8 h-8" />
                        <p className="text-[.9rem] active:text-primary">{item.name}</p>
                    </Link>)
            }
            )}
        </div >
    )

}