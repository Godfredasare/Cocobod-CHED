import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import type { Event } from '@/types/database';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM events ORDER BY date ASC');
    return NextResponse.json({ data: rows as Event[] });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}
