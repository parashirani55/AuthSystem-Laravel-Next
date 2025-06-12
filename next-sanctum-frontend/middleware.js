import { NextResponse } from 'next/server';

const blockedForAuth = ['/login', '/register'];

export function middleware(request) {
  console.log('Middleware triggered for:', request.nextUrl.pathname); // <-- Optional for testing

  const token = request.cookies.get('token')?.value; // ✅ Correct cookie name

  if (token && blockedForAuth.includes(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    url.searchParams.set('alert', 'logout-required');
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/register'], // ✅ Run middleware only on these routes
};
