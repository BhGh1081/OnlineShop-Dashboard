'use client';

import { useState } from "react";
import { errorType} from "../lib/definision";
import z from "zod";
import { useLogin } from "../hooks/useLogin";


export default function LoginForm({ className }: { className?: string }) {

    const [userName, setUserName] = useState('emilys');
    const [password, setPassword] = useState('emilyspass');
    const [zodError, setZodError] = useState<errorType>();
    const {mutate, data, error, isPending} = useLogin();


    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const parseCredential = z.object({
            userName: z.string()
                .min(3, { message: 'At least 3 characters' })
                .regex(/^[a-zA-Z]+$/, { message: 'Only English letters' }),
            password: z.string().min(3, 'should not be less than 3 characters')
        }).safeParse({ userName: userName, password: password })

        if (!parseCredential.success) {
            setZodError(parseCredential.error.flatten().fieldErrors);
            console.log('error:', zodError);
            return
        }

        mutate({ userName, password })

    }




    return (
        <div className={className}>
            <form onSubmit={(e) => handleSubmit(e)} className="w-[80%] h-fit space-y-15 p-10 bg-background rounded-lg text-center">
                <div className="space-y-5">
                    <section>
                        <input
                            name="userName"
                            value={userName}
                            placeholder="User name"
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full h-15 rounded-lg bg-secondry p-4"
                        />
                        {zodError?.userName && <p className='text-red-400 w-full text-start'>{zodError.userName}</p>}
                    </section>
                    <section>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-15 rounded-lg bg-secondry p-4"
                        />
                        {zodError?.password && <p className="text-red-400 w-full text-start">{zodError.password}</p>}
                    </section>
                </div>
                <div>
                    <button disabled={isPending} type="submit" className="w-full h-15 bg-primary text-xl text-white rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">{isPending ? "Signing in..." : "Login"}</button>
                </div>
                { error && <p className="text-red-500">{error.message}</p> }
            </form>
        </div>
    )
}