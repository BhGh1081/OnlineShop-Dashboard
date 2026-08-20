'use client';

import { useMutation } from "@tanstack/react-query";
import { Authentication } from "@/services/userApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, UseDispatch } from "react-redux";
import { setUser } from "@/store/slices/authSlice";

export function UseLogin() {

    const dispatch = useDispatch();

    const searchParam = useSearchParams();
    const router = useRouter();

    const redirectTo = searchParam.get('redirect');

    return useMutation({
        mutationFn: Authentication,

        onSuccess: (data) => {
            dispatch(setUser({user: data, accessToken:data.accessToken}))
            router.replace(redirectTo || '/');
            router.refresh();
        },

        onError: (error) => {
            console.log(error);
        }
    })

}