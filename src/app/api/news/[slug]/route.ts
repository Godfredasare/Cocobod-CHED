import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import type { News } from '@/types/database';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const [rows] = await pool.query('SELECT * FROM news WHERE slug = ?', [slug]);
    const results = rows as News[];

    if (results.length === 0) {
      return NextResponse.json({ error: 'News article not found' }, { status: 404 });
    }

    return NextResponse.json({ data: results[0] });
  } catch (error) {
    console.error('Error fetching news article:', error);
    return NextResponse.json({ error: 'Failed to fetch news article' }, { status: 500 });
  }
}
