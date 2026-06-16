import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import type { Document } from '@/types/database';

export async function GET() {
  try {
    await requireAuth();
    const [rows] = await pool.query(
      'SELECT * FROM documents ORDER BY created_at DESC'
    );
    return NextResponse.json({ data: rows as Document[] });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Error fetching documents:', error);
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 });
  }
}
