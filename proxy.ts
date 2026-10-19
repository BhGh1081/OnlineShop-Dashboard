import { NextResponse, NextRequest } from "next/server";
import { deleteCookie, setNewToken } from "./lib/authCookies";
import path from "path";


export async function proxy(request: NextRequest) {

    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;
    const { pathname, search } = request.nextUrl;
    const destination = new URL(request.url);
    const loginUrl = new URL('/login', request.url)

    if (pathname === '/') {
        if (accessToken) return NextResponse.redirect(new URL('/dashboard', request.url));
        if (refreshToken) {
            const res = await setNewToken(NextResponse.redirect(destination),refreshToken);
            return res ?? deleteCookie(NextResponse.redirect(loginUrl));
        }
        return NextResponse.redirect(new URL('/login', request.url))
    }
    if (pathname.startsWith('/dashboard')) {
        if (accessToken) return NextResponse.next();

        const redirectTo = pathname + search;
        loginUrl.searchParams.set('redirect', redirectTo)

        if (refreshToken) {
            const res = await setNewToken(NextResponse.redirect(destination), refreshToken);
            return res ?? deleteCookie(NextResponse.redirect(loginUrl));
        }
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/dashboard/:path*']
}




