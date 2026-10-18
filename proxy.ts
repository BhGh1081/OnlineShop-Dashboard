import { NextResponse, NextRequest } from "next/server";


function deleteCookie(destination: URL) {

    const response = NextResponse.redirect(new URL('/login', destination));
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken')

    return response;
}


async function newToken(refreshToken: string, destination: URL) {

    try {
        const res = await fetch('https://dummyjson.com/auth/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken })
        })
        if (!res.ok) return null;

        const newTokens = await res.json()
        const response = NextResponse.redirect(destination);

        response.cookies.set('accessToken', newTokens.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60,
            path: '/',
            sameSite: "lax"
        });
        response.cookies.set('refreshToken', newTokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60 * 24,
            sameSite: "lax"
        })

        return response;

    } catch {

        return null;
    }

}


export async function proxy(request: NextRequest) {

    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;
    const { pathname } = request.nextUrl;
    const destination = new URL(request.url);

    if (pathname === '/') {
        if (accessToken) return NextResponse.redirect(new URL('/dashboard', request.url));
        if (refreshToken) {
            const res = await newToken(refreshToken, new URL('/dashboard', request.url));
            return res ?? deleteCookie(destination);
        }
        return NextResponse.redirect(new URL('/login', request.url))
    }
    if (pathname.startsWith('/dashboard')) {
        if (accessToken) return NextResponse.next();
        if (refreshToken) {
            const res = await newToken(refreshToken, destination);
            return res ?? deleteCookie(destination);
        }
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/dashboard/:path*']
}




