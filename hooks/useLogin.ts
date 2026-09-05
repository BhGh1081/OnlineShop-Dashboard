'use client';

import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";


export function useLogin() {

    const searchParam = useSearchParams();
    const router = useRouter();
    const redirectTo = searchParam.get('redirect');
    const queryClient = useQueryClient();

    const mutationFN = async(credentials: {userName: string, password: string}) => {

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credentials)
        });

        const result = await res.json();

        if(!res.ok){
            throw new Error(result.error);
        }
        
        return result;
    }

    return useMutation({
        mutationFn: mutationFN ,

        onSuccess: (data) => {
            queryClient.setQueryData(['currentUser'], data.user)
            router.replace(redirectTo || '/');
            router.refresh();
        },

        onError: (error) => {
            console.log(error);
        }
    })

}