'use client';

import { createContext, useContext } from "react";
import { UserType } from "@/lib/definision";
import { useQuery } from "@tanstack/react-query";


type CurrentUser = Omit<UserType, "accessToken" | "refreshToken">

const UserContext = createContext<CurrentUser | null>(null);


export default function UserProvider({ initialUser, children }: { initialUser: CurrentUser, children: React.ReactNode }) {

    const { data: user } = useQuery({
        queryKey: ['currentUser'],
        queryFn: () => fetch('/api/me').then(res => res.json()),
        initialData: initialUser,
    });


    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    return useContext(UserContext);
}