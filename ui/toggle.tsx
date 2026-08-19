'use client';

import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function Toggle({className} : {className?: string}) {

    const [mounted, setMounted] = useState(false)
    const [dark, setDark] = useState(() => {
        if (typeof window !== undefined ) return;
        return localStorage.getItem('theme') === 'dark'
    });

    useEffect(() => {
        setMounted(true);
        const theme = localStorage.getItem('theme') === 'dark';
        setDark(theme);
    },[])

    useEffect(() => {
        if(!mounted) return
        localStorage.setItem('theme', dark ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', dark)
    },[mounted, dark])


    return (
        <div className="w-12 h-12 flex justify-center items-center border-solid border-1 border-gray-400 rounded-lg hover:bg-gray-400/20">
            <MdDarkMode onClick={() => setDark(true)}
                className={clsx("w-9 h-9 text-sky-700 active:scale-90 transition-transform duration-100", dark && 'hidden' )} />
            <MdLightMode onClick={() => setDark(false)}
                className={clsx("w-9 h-9 text-yellow-400 active:scale-90 transition-transform duration-100", !dark && 'hidden')} />
        </div>
    )
}