import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import type { GalleryImage } from '@/types/database';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM gallery ORDER BY created_at DESC');
    return NextResponse.json({ data: rows as GalleryImage[] });
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery images' }, { status: 500 });
  }
}
