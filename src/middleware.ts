import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
 
	if (!sessionCookie) {
		//return NextResponse.redirect(new URL("/authentication", request.url));
	}
 
	return NextResponse.next();
}
 
export const config = {
  matcher: [
    '/dashboard',
    '/appointments',
    '/patients',
    '/doctors',
    '/subscription',
    '/clinic-form',
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}