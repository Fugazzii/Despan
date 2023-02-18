import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const dev = "http://localhost:3000";

    const session = await getToken({
        req,
        secret: process.env.JWT_SECRET,
        secureCookie: process.env.NODE_ENV === "production",
    });

    if (req.nextUrl.pathname !== "/") {
        // You could also check for any property on the session object,
        // like role === "admin" or name === "John Doe", etc.
        if (!session) return NextResponse.redirect(`${dev}/`);
        // If user is authenticated, continue.
    } else {
        if(session) return NextResponse.redirect("/dashboard");
    }
}