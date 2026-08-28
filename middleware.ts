import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest){

    const accessToken =  request.cookies.get('accessToken')?.value;
    const {pathname} = request.nextUrl;

    if(pathname === '/'){
        if(accessToken) return NextResponse.redirect(new URL('/dashboard', request.url));
        return NextResponse.redirect(new URL('/login', request.url));
    }
    if(pathname.startsWith('/dashboard')){
        if(!accessToken) return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    mstcher: ['/' +  '/dashboard/:path*']
}