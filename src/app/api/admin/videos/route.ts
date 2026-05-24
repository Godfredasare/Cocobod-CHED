import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import type { Video, VideoInput } from '@/types/database';

export async function GET() {
  try {
    await requireAuth();
    const [rows] = await pool.query('SELECT * FROM videos ORDER BY published_at IS NULL ASC, published_at DESC, created_at DESC, id DESC');
    return NextResponse.json({ data: rows as Video[] });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Error fetching videos:', error);
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body: VideoInput = await request.json();
    const { title, description, youtube_id, platform, thumbnail, duration, published_at } = body;

    if (!title || !youtube_id) {
      return NextResponse.json({ error: 'Title and Video ID are required' }, { status: 400 });
    }

    const [result] = await pool.query(
      'INSERT INTO videos (title, description, youtube_id, platform, thumbnail, duration, published_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description || null, youtube_id, platform || 'youtube', thumbnail || null, duration || null, published_at || null]
    );

    const insertResult = result as any;
    return NextResponse.json({ data: { id: insertResult.insertId } }, { status: 201 });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Error creating video:', error);
    return NextResponse.json({ error: 'Failed to create video' }, { status: 500 });
  }
}
