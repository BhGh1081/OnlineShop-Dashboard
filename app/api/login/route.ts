import { NextResponse } from "next/server";
import { Authentication } from "@/services/auth";


export async function POST(request: Request) {

    const { userName, password } = await request.json();

    try {

        const data = await Authentication({ userName, password });

        const { accessToken, refreshToken, ...user } = data;

        const response = NextResponse.json({ user });

        response.cookies.set("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: '/',
            sameSite: 'lax',
            maxAge: 60 * 60
        });

        response.cookies.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: '/',
            sameSite: 'lax',
            maxAge: 60 * 60
        });

        return response;
    } catch (error) {
        return NextResponse.json({ error: "Invalid Credential" }, { status: 401 })
    }

}