'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import AdminShell from '@/components/admin/AdminShell';
import { ArrowLeft } from 'lucide-react';

export default function VideoFormPage() {
  const router = useRouter();
  const params = useParams();
  const isEdit = params.id !== 'new';
  const videoId = isEdit ? (params.id as string) : null;

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '', description: '', youtube_id: '', thumbnail: '',
    duration: '', published_at: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (isEdit && videoId) {
      fetch(`/api/admin/videos/${videoId}`)
        .then(r => r.json())
        .then(d => {
          if (d.data) setForm({
            title: d.data.title, description: d.data.description || '',
            youtube_id: d.data.youtube_id, thumbnail: d.data.thumbnail || '',
            duration: d.data.duration || '', published_at: d.data.published_at ? d.data.published_at.split('T')[0] : '',
          });
        })
        .catch(() => router.push('/admin/videos'))
        .finally(() => setLoading(false));
    }
  }, [videoId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch(isEdit ? `/api/admin/videos/${videoId}` : '/api/admin/videos', {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    router.push('/admin/videos');
  };

  if (loading) {
    return <AdminShell><div className="flex justify-center py-20"><div className="w-6 h-6 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" /></div></AdminShell>;
  }

  return (
    <AdminShell>
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/admin/videos" className="p-1 text-gray-400 hover:text-gray-600"><ArrowLeft size={18} /></Link>
          <h1 className="text-lg font-semibold text-gray-900">{isEdit ? 'Edit Video' : 'Add Video'}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-white border border-gray-200 rounded-md p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Video ID *</label>
              <input type="text" value={form.youtube_id} onChange={e => setForm({ ...form, youtube_id: e.target.value })} required className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" placeholder="dQw4w9WgXcQ" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input type="text" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" placeholder="10:30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Published</label>
                <input type="date" value={form.published_at} onChange={e => setForm({ ...form, published_at: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
                <input type="url" value={form.thumbnail} onChange={e => setForm({ ...form, thumbnail: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" />
              </div>
            </div>

            {form.youtube_id && (
              <div className="bg-gray-50 rounded-md p-3">
                <p className="text-xs text-gray-500 mb-2">Preview:</p>
                <img src={`https://img.youtube.com/vi/${form.youtube_id}/maxresdefault.jpg`} alt="" className="w-full max-w-sm rounded" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <Link href="/admin/videos" className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200">Cancel</Link>
            <button type="submit" disabled={saving} className="px-4 py-2 text-sm text-white bg-gray-900 rounded-md hover:bg-gray-800 disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
