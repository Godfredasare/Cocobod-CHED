import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import type { News } from '@/types/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '0');

    let query = 'SELECT * FROM news ORDER BY date DESC';
    const params: any[] = [];

    if (limit > 0) {
      query += ' LIMIT ?';
      params.push(limit);
    }

    const [rows] = await pool.query(query, params);
    return NextResponse.json({ data: rows as News[] });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
