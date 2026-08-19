import React from "react";
import TopBar from "../../component/topBar";
import Sidebar from "../../component/sidebar";
import NavBar from "../../component/navBar";
import Menu from "../../ui/menu";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {


  const items = [
    { title: 'Dashboard', href: '/dashboard'},
    { title: 'Setting', href: '/setting'},
    { title: 'Login', href: '/login'}
  ]

    return (
        <div className="flex gap-2.5 h-screen overflow-hidden p-2 md:p-4">
            <Sidebar className="hidden md:flex" />
            <div className="flex gap-2.5 flex-col flex-1">
                <TopBar />
                <div className="bg-background rounded-md w-full h-full px-2 py-4 md:p-4">
                    {children}
                </div>
                <NavBar />
            </div>
        </div>
    )
}