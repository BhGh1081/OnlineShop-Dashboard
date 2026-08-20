import { BiSolidUserCircle } from "react-icons/bi";
import { useState } from "react";
import { InitialType } from "@/lib/definision";
import { useSelector } from "react-redux";
import clsx from "clsx";


type StateType = {
    auth: InitialType;
}

export default function Profile() {

    const state = useSelector((state: StateType) => state)
    const user = state.auth.user;
    const isAuthenticate = state.auth.isAuthenticate

    const [profile, setProfile] = useState(false);

    return (
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
                <div className="border-b-solid border-b border-b-gray-300 py-4">
                    <p>{isAuthenticate ? `${user?.firstName} ${user?.lastName}` : "Please Login"}</p>
                    <p className="text-[.8rem] text-gray-400">Admin</p>
                </div>
            </div>
        </div>
    )
}