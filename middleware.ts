import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected routes (admin dashboard, settings, etc.)
const protectedRoutes = ["/admin"];

export function middleware(req: NextRequest) {
    const token = req.cookies.get("accessToken")?.value; // Get token from cookies
    const isAdminRoute = protectedRoutes.some((route) =>
        req.nextUrl.pathname.startsWith(route)
    );

    if (isAdminRoute && !token) {
        // If no token, redirect to login page
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next(); // Allow request to proceed
}

// Apply middleware to only `/admin` routes
export const config = {
    matcher: ['/admin', '/admin/(.*)',],
};
