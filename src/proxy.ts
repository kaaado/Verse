import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Session Refresh via Supabase SSR
  const { response, user } = await updateSession(request);

  // 2. Creator Studio Protected Route Guard
  const isStudioRoute = pathname.startsWith('/studio');
  const isStudioLogin = pathname === '/studio/login' || pathname.startsWith('/studio/auth');

  // Whitelist login to prevent redirect loop (Remediation C5)
  if (isStudioRoute && !isStudioLogin) {
    if (!user) {
      const loginUrl = new URL('/studio/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If authenticated user visits login, redirect directly to studio dashboard
  if (isStudioLogin && user && pathname === '/studio/login') {
    return NextResponse.redirect(new URL('/studio', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
