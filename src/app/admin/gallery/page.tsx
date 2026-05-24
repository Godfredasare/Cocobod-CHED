'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminShell from '@/components/admin/AdminShell';
import { GalleryImage } from '@/types/database';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';

export default function GalleryAdminPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch('/api/admin/gallery')
      .then(r => r.json())
      .then(d => setImages(d.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    await fetch(`/api/admin/gallery/${deleteId}`, { method: 'DELETE' });
    setImages(images.filter(i => i.id !== deleteId));
    setDeleteId(null);
    setDeleting(false);
  };

  const filtered = images.filter(i =>
    i.alt.toLowerCase().includes(search.toLowerCase()) ||
    i.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold text-foreground">Gallery</h1>
        <Link href="/admin/gallery/new" className="inline-flex items-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90">
          <Plus size={14} /> Add Image
        </Link>
      </div>

      <div className="relative mb-4">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="w-full pl-9 pr-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent" />
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground py-8 text-center">Loading...</p>
      ) : filtered.length === 0 ? (
        <div className="bg-card border border-border rounded-md p-12 text-center">
          <p className="text-sm text-muted-foreground">{search ? 'No results' : 'No images yet'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(image => (
            <div key={image.id} className="group bg-card border border-border rounded-md overflow-hidden">
              <div className="aspect-square bg-secondary">
                <img src={image.src} alt={image.alt} className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).src = '/images/placeholder.jpg'; }} />
              </div>
              <div className="p-3 flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground truncate">{image.alt}</p>
                  <span className="text-xs text-muted-foreground">{image.category}</span>
                </div>
                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href={`/admin/gallery/${image.id}`} className="p-1 text-muted-foreground hover:text-primary"><Edit2 size={13} /></Link>
                  <button onClick={() => setDeleteId(image.id)} className="p-1 text-muted-foreground hover:text-destructive"><Trash2 size={13} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setDeleteId(null)}>
          <div onClick={e => e.stopPropagation()} className="bg-card rounded-md border border-border p-6 max-w-sm w-full">
            <h3 className="font-medium text-foreground mb-2">Delete image?</h3>
            <p className="text-sm text-muted-foreground mb-4">This cannot be undone.</p>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm text-muted-foreground bg-secondary rounded-md hover:bg-secondary/80">Cancel</button>
              <button onClick={handleDelete} disabled={deleting} className="px-4 py-2 text-sm text-primary-foreground bg-destructive rounded-md hover:bg-destructive/90 disabled:opacity-50">{deleting ? 'Deleting...' : 'Delete'}</button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
