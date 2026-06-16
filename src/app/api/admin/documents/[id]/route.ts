import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { clearDocumentCache } from '@/services/documents';
import type { Document } from '@/types/database';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const { id } = await params;
    const [rows] = await pool.query('SELECT * FROM documents WHERE id = ?', [id]);
    const results = rows as Document[];

    if (results.length === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ data: results[0] });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Error fetching document:', error);
    return NextResponse.json({ error: 'Failed to fetch document' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const { id } = await params;

    // Get file path
    const [rows] = await pool.query('SELECT file_path FROM documents WHERE id = ?', [id]);
    const results = rows as { file_path: string }[];

    // Delete from database
    await pool.query('DELETE FROM documents WHERE id = ?', [id]);

    // Delete file from disk
    if (results.length > 0) {
      const fs = await import('fs/promises');
      try {
        await fs.unlink(`public${results[0].file_path}`);
      } catch {
        console.warn(`Could not delete file: ${results[0].file_path}`);
      }
    }

    // Clear document cache so next chat picks up changes
    clearDocumentCache();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Error deleting document:', error);
    return NextResponse.json({ error: 'Failed to delete document' }, { status: 500 });
  }
}
