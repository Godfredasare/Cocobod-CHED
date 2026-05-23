import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import type { News, NewsInput } from '@/types/database';

export async function GET() {
  try {
    await requireAuth();
    const [rows] = await pool.query('SELECT * FROM news ORDER BY date DESC');
    return NextResponse.json({ data: rows as News[] });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body: NewsInput = await request.json();
    const { title, slug, excerpt, content, image, category, date } = body;

    if (!title || !slug || !excerpt || !content || !category || !date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const [result] = await pool.query(
      'INSERT INTO news (title, slug, excerpt, content, image, category, date) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, slug, excerpt, content, image || null, category, date]
    );

    const insertResult = result as any;
    return NextResponse.json({ data: { id: insertResult.insertId } }, { status: 201 });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Error creating news:', error);
    return NextResponse.json({ error: 'Failed to create news article' }, { status: 500 });
  }
}
