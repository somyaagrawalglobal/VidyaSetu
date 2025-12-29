import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Paths that require authentication
const protectedPaths = ['/dashboard', '/profile'];

export async function middleware(req) {
    const { pathname } = req.nextUrl;

    // Check if path is protected
    const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

    if (isProtected) {
        const token = req.cookies.get('token')?.value;

        if (!token) {
            const loginUrl = new URL('/login', req.url);
            loginUrl.searchParams.set('from', pathname);
            return NextResponse.redirect(loginUrl);
        }

        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            await jwtVerify(token, secret);
            // Valid token
            return NextResponse.next();
        } catch (error) {
            // Invalid token
            const loginUrl = new URL('/login', req.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    // Protect legacy resource URLs by rewriting them to the branded viewer page
    if (pathname.startsWith('/uploads/courses/resources/')) {
        const filename = pathname.split('/').pop();
        const viewerUrl = new URL(`/resources/${filename}`, req.url);
        return NextResponse.rewrite(viewerUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*', '/uploads/courses/resources/:path*'],
};
