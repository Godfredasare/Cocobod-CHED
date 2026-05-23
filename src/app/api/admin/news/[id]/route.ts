import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import type { News, NewsInput } from '@/types/database';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const { id } = await params;
    const [rows] = await pool.query('SELECT * FROM news WHERE id = ?', [id]);
    const results = rows as News[];

    if (results.length === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ data: results[0] });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'Failed to fetch news article' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const { id } = await params;
    const body: Partial<NewsInput> = await request.json();

    const fields: string[] = [];
    const values: any[] = [];

    if (body.title !== undefined) { fields.push('title = ?'); values.push(body.title); }
    if (body.slug !== undefined) { fields.push('slug = ?'); values.push(body.slug); }
    if (body.excerpt !== undefined) { fields.push('excerpt = ?'); values.push(body.excerpt); }
    if (body.content !== undefined) { fields.push('content = ?'); values.push(body.content); }
    if (body.image !== undefined) { fields.push('image = ?'); values.push(body.image); }
    if (body.category !== undefined) { fields.push('category = ?'); values.push(body.category); }
    if (body.date !== undefined) { fields.push('date = ?'); values.push(body.date); }

    if (fields.length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    values.push(id);
    await pool.query(`UPDATE news SET ${fields.join(', ')} WHERE id = ?`, values);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Error updating news:', error);
    return NextResponse.json({ error: 'Failed to update news article' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const { id } = await params;
    await pool.query('DELETE FROM news WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Error deleting news:', error);
    return NextResponse.json({ error: 'Failed to delete news article' }, { status: 500 });
  }
}
