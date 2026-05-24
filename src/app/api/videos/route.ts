import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import type { Video } from '@/types/database';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM videos ORDER BY published_at IS NULL ASC, published_at DESC, created_at DESC, id DESC');
    return NextResponse.json({ data: rows as Video[] });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}
