import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import type { GalleryImage, GalleryImageInput } from '@/types/database';

export async function GET() {
  try {
    await requireAuth();
    const [rows] = await pool.query('SELECT * FROM gallery ORDER BY created_at DESC');
    return NextResponse.json({ data: rows as GalleryImage[] });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Error fetching gallery:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery images' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body: GalleryImageInput = await request.json();
    const { src, alt, category } = body;

    if (!src || !alt || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const [result] = await pool.query(
      'INSERT INTO gallery (src, alt, category) VALUES (?, ?, ?)',
      [src, alt.substring(0, 255), category]
    );

    const insertResult = result as any;
    return NextResponse.json({ data: { id: insertResult.insertId } }, { status: 201 });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Error creating gallery image:', error);
    return NextResponse.json({ error: 'Failed to create gallery image' }, { status: 500 });
  }
}
