import { NextResponse } from "next/server";



export const accessMaxAge = 60 * 1;
export const refreshMaxAge = 60 * 3


export const cookiesOption = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: '/',
    sameSite: "lax"
} as const


export function deleteCookie(response: NextResponse) {

    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken')

    return response;
}



export async function setNewToken(response: NextResponse, refreshToken: string) {

    try {
        const res = await fetch('https://dummyjson.com/auth/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken })
        })
        if (!res.ok) return null;

        const newTokens = await res.json()

        response.cookies.set('accessToken', newTokens.accessToken, {...cookiesOption, maxAge: accessMaxAge});
        response.cookies.set('refreshToken', newTokens.refreshToken, {...cookiesOption, maxAge: refreshMaxAge})

        return response;

    } catch {

        return null;
    }

}
