'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminShell from '@/components/admin/AdminShell';
import type { Document } from '@/types/database';
import { Plus, Trash2, FileText, Loader2, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const TYPE_LABELS: Record<string, string> = {
  'application/pdf': 'PDF',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
  'text/plain': 'TXT',
};

function StatusBadge({ status, errorMessage }: { status: string; errorMessage?: string | null }) {
  switch (status) {
    case 'ready':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">
          <CheckCircle size={10} /> Ready
        </span>
      );
    case 'processing':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
          <Loader2 size={10} className="animate-spin" /> Processing
        </span>
      );
    case 'failed':
      return (
        <span className="inline-flex flex-col gap-0.5">
          <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-700 w-fit">
            <AlertCircle size={10} /> Failed
          </span>
          {errorMessage && (
            <span className="text-[10px] text-red-600 max-w-[200px] line-clamp-2" title={errorMessage}>
              {errorMessage}
            </span>
          )}
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
          <Clock size={10} /> {status}
        </span>
      );
  }
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function KnowledgeBasePage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch('/api/admin/documents')
      .then((r) => r.json())
      .then((d) => setDocuments(d.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    await fetch(`/api/admin/documents/${deleteId}`, { method: 'DELETE' });
    setDocuments(documents.filter((d) => d.id !== deleteId));
    setDeleteId(null);
    setDeleting(false);
  };

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Knowledge Base</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Upload documents for the AI assistant to learn from
          </p>
        </div>
        <Link
          href="/admin/knowledge-base/upload"
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90"
        >
          <Plus size={14} /> Upload Document
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground py-8 text-center">Loading...</p>
      ) : documents.length === 0 ? (
        <div className="bg-card border border-border rounded-md p-12 text-center">
          <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground mb-4">No documents uploaded yet</p>
          <Link
            href="/admin/knowledge-base/upload"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90"
          >
            <Plus size={14} /> Upload First Document
          </Link>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Title</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Type</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Size</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id} className="border-b border-border/50 hover:bg-muted/50">
                  <td className="px-4 py-3">
                    <span className="text-foreground line-clamp-1">{doc.title}</span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-xs text-muted-foreground">
                      {TYPE_LABELS[doc.file_type] || doc.file_type}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-xs text-muted-foreground">{formatBytes(doc.file_size)}</span>
                  </td>
<td className="px-4 py-3">
                    <StatusBadge status={doc.status} errorMessage={doc.error_message} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setDeleteId(doc.id)}
                        className="p-1.5 text-muted-foreground hover:text-destructive rounded"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          onClick={() => setDeleteId(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-md border border-border p-6 max-w-sm w-full"
          >
            <h3 className="font-medium text-foreground mb-2">Delete document?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This will remove the document and all its knowledge from the AI assistant.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm text-muted-foreground bg-secondary rounded-md hover:bg-secondary/80"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 text-sm text-primary-foreground bg-destructive rounded-md hover:bg-destructive/90 disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
