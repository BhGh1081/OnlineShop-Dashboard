'use client';

import { useMutation } from "@tanstack/react-query";
import { Authentication } from "@/services/userApi";
import { useRouter, useSearchParams } from "next/navigation";

export function UseLogin() {

    const searchParam = useSearchParams();
    const router = useRouter();

    const redirectTo = searchParam.get('redirect');

    return useMutation({
        mutationFn: Authentication,

        onSuccess: (data) => {
            router.replace(redirectTo || '/');
            router.refresh();
        },

        onError: (error) => {
            console.log(error);
        }
    })

}