'use client';

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useLogout(){

    const queryClient = useQueryClient();
    const router = useRouter();

return useMutation({
    mutationFn: async () => { 
        const res = await fetch('/api/logout', {method: 'POST'});
        if(!res.ok) throw new Error('something went wrong');

        return res.json();
    },

    onSuccess(){
        // queryClient.clear();
        queryClient.setQueryData(['currentUser'], null);
        router.push('/');
        router.refresh();
        
    }
})

}