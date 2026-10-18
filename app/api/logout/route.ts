import { NextResponse } from "next/server";
import { deleteCookie } from "@/lib/authCookies";


export function POST(){

    const response = NextResponse.json({success: true});

    return deleteCookie(response);
    
}
