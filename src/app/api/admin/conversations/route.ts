import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import type { Conversation } from '@/types/database';

export async function GET() {
  try {
    await requireAuth();
    const [rows] = await pool.query(
      'SELECT * FROM conversations ORDER BY updated_at DESC LIMIT 100'
    );
    return NextResponse.json({ data: rows as Conversation[] });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Error fetching conversations:', error);
    return NextResponse.json({ error: 'Failed to fetch conversations' }, { status: 500 });
  }
}
