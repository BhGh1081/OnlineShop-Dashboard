import LoginForm from "../ui/loginForm";
import QueryProvider from "../providers/queryProvider"
import Image from "next/image";

export default function Login() {


    return (
        <QueryProvider>
            <div className="flex flex-col-reverse md:flex-row h-screen py-5">
                <div className="flex-2 flex justify-center items-center">
                    <Image src={'/auth.png'} alt="authentication" width={500} height={400}  />
                </div>
                <LoginForm className="md:flex-3 flex md:items-center justify-center" />
            </div>
        </QueryProvider>
    )
}