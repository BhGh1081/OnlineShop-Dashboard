import { NextResponse } from "next/server";
import { getUser } from "@/services/auth";

export async function GET() {

    try {
        const user = await getUser();

        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        return NextResponse.json(user)

    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }
}