import { NextResponse, NextRequest } from "next/server";
import { deleteCookie, setNewToken } from "./lib/authCookies";


export async function proxy(request: NextRequest) {

    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;
    const { pathname } = request.nextUrl;
    const destination = new URL(request.url);
    const setResponse = NextResponse.redirect(destination)
    const deleteResponse = NextResponse.redirect(new URL('/login', request.url))

    if (pathname === '/') {
        if (accessToken) return NextResponse.redirect(new URL('/dashboard', request.url));
        if (refreshToken) {
            const res = await setNewToken(setResponse ,refreshToken, new URL('/dashboard', request.url));
            return res ?? deleteCookie(deleteResponse);
        }
        return NextResponse.redirect(new URL('/login', request.url))
    }
    if (pathname.startsWith('/dashboard')) {
        if (accessToken) return NextResponse.next();
        if (refreshToken) {
            const res = await setNewToken(setResponse, refreshToken, destination);
            return res ?? deleteCookie(deleteResponse);
        }
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/dashboard/:path*']
}




