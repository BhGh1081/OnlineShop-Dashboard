import { NextResponse } from "next/server";
import { Authentication } from "@/services/auth";
import { cookiesOption, accessMaxAge, refreshMaxAge } from "@/lib/authCookies";


export async function POST(request: Request) {

    const { userName, password } = await request.json();


    try {

        const data = await Authentication({ userName, password });

        const { accessToken, refreshToken, ...user } = data;

        const response = NextResponse.json({ user });

        response.cookies.set("accessToken", accessToken, {...cookiesOption, maxAge: accessMaxAge });

        response.cookies.set("refreshToken", refreshToken, {...cookiesOption, maxAge: refreshMaxAge});

        return response;
    } catch (err) {
        if (err instanceof Error) return NextResponse.json({ error: err.message }, { status: 400 })
        return NextResponse.json({error: 'Something went wrong'}, {status:500})
    }

}