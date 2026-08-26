'use client';

import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

export function useLogin() {

    const searchParam = useSearchParams();
    const router = useRouter();
    const redirectTo = searchParam.get('redirect');

    const mutationFN = async(credentials: {userName: string, password: string}) => {

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credentials)
        });

        if(!res.ok){
            throw new Error("Unsuccess Login, Try Again");
        }
        
        return res.json();
    }

    return useMutation({
        mutationFn: mutationFN ,

        onSuccess: () => {
            router.replace(redirectTo || '/');
            router.refresh();
        },

        onError: (error) => {
            console.log(error);
        }
    })

}