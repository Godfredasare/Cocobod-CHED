import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import type { Event, EventInput } from '@/types/database';

export async function GET() {
  try {
    await requireAuth();
    const [rows] = await pool.query('SELECT * FROM events ORDER BY date ASC');
    return NextResponse.json({ data: rows as Event[] });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body: EventInput = await request.json();
    const { title, description, date, time, venue, category, image } = body;

    if (!title || !description || !date || !time || !venue || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const [result] = await pool.query(
      'INSERT INTO events (title, description, date, time, venue, category, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description, date, time, venue, category, image || null]
    );

    const insertResult = result as any;
    return NextResponse.json({ data: { id: insertResult.insertId } }, { status: 201 });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Error creating event:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
