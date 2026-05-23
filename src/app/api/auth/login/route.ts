import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { comparePassword, setAuthCookie } from '@/lib/auth';
import { signToken } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const [rows] = await pool.query(
      'SELECT * FROM admins WHERE email = ?',
      [email]
    );

    const admins = rows as any[];
    if (admins.length === 0) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const admin = admins[0];
    const valid = await comparePassword(password, admin.password_hash);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const token = signToken({ id: admin.id, email: admin.email });
    await setAuthCookie(token);

    return NextResponse.json({ user: { id: admin.id, email: admin.email } });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
