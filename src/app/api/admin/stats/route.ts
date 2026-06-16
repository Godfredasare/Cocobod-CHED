import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    await requireAuth();

    const [newsResult] = await pool.query('SELECT COUNT(*) as count FROM news');
    const [eventsResult] = await pool.query('SELECT COUNT(*) as count FROM events');
    const [videosResult] = await pool.query('SELECT COUNT(*) as count FROM videos');
    const [galleryResult] = await pool.query('SELECT COUNT(*) as count FROM gallery');
    const [documentsResult] = await pool.query('SELECT COUNT(*) as count FROM documents');
    const [conversationsResult] = await pool.query('SELECT COUNT(*) as count FROM conversations');

    const getCount = (result: any) => (result as any[])[0]?.count || 0;

    return NextResponse.json({
      newsCount: getCount(newsResult),
      eventsCount: getCount(eventsResult),
      videosCount: getCount(videosResult),
      galleryCount: getCount(galleryResult),
      documentsCount: getCount(documentsResult),
      conversationsCount: getCount(conversationsResult),
    });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Error fetching stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
