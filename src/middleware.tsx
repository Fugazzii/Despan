import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const dev = "http://localhost:3000";

    const session = await getToken({
        req,
        secret: process.env.JWT_SECRET,
        secureCookie: process.env.NODE_ENV === "production",
    });

    if (req.nextUrl.pathname === "/") {
        if (session) return NextResponse.redirect(`${dev}/dashboard`);
    }
}