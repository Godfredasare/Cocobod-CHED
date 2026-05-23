import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'ched-dev-secret-change-in-production'
);

async function verifyAuth(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get('ched_admin_token')?.value;
  if (!token) return false;

  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect API admin routes
  if (pathname.startsWith('/api/admin/')) {
    const authenticated = await verifyAuth(request);
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  // Protect admin pages (except login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const authenticated = await verifyAuth(request);
    if (!authenticated) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/admin/:path*', '/admin/:path*'],
};
