import { NextResponse } from 'next/server';

// Next.js Middleware runs on every request
export function middleware(request) {
    // Protect the dashboard route
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        // Check for the admin_token cookie
        const token = request.cookies.get('admin_token');

        // If no token exists, redirect to the login page
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Otherwise, continue the request normally
    return NextResponse.next();
}

// Specify the paths where the middleware should run
export const config = {
    matcher: ['/dashboard/:path*'],
};
