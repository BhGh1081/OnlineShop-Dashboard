import React from "react";
import TopBar from "../../component/topBar";
import Sidebar from "../../component/sidebar";
import NavBar from "../../component/navBar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {



    const items = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Setting', href: '/setting' },
        { title: 'Login', href: '/login' }
    ]

    return (

        <div className="flex gap-2.5 h-dvh overflow-hidden p-2 md:p-4">
            <Sidebar className="hidden md:flex" />
            <div className="flex gap-2.5 flex-col min-w-0 flex-1">
                <TopBar />
                <div className="w-full h-full bg-background px-2 py-4 md:p-4 rounded-md overflow-hidden">
                {children}
                </div>
                <NavBar />
            </div>
        </div>

    )
}