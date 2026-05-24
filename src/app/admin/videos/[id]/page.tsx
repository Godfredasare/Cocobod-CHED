'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import AdminShell from '@/components/admin/AdminShell';
import { ArrowLeft } from 'lucide-react';
import type { VideoPlatform } from '@/types/database';

const PLATFORM_OPTIONS: { value: VideoPlatform; label: string; placeholder: string }[] = [
  { value: 'youtube', label: 'YouTube', placeholder: 'dQw4w9WgXcQ' },
  { value: 'facebook', label: 'Facebook', placeholder: 'https://www.facebook.com/watch/?v=123456' },
  { value: 'tiktok', label: 'TikTok', placeholder: '7253749136482536743' },
];

function getThumbnailPreview(videoId: string, platform: VideoPlatform): string | null {
  if (!videoId) return null;
  if (platform === 'youtube') return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  return null;
}

export default function VideoFormPage() {
  const router = useRouter();
  const params = useParams();
  const isEdit = params.id !== 'new';
  const videoId = isEdit ? (params.id as string) : null;

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '', description: '', youtube_id: '', platform: 'youtube' as VideoPlatform,
    thumbnail: '', duration: '', published_at: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (isEdit && videoId) {
      fetch(`/api/admin/videos/${videoId}`)
        .then(r => r.json())
        .then(d => {
          if (d.data) setForm({
            title: d.data.title, description: d.data.description || '',
            youtube_id: d.data.youtube_id, platform: d.data.platform || 'youtube',
            thumbnail: d.data.thumbnail || '',
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
    return <AdminShell><div className="flex justify-center py-20"><div className="w-6 h-6 border-2 border-border border-t-primary rounded-full animate-spin" /></div></AdminShell>;
  }

  const previewUrl = getThumbnailPreview(form.youtube_id, form.platform);
  const currentPlaceholder = PLATFORM_OPTIONS.find(o => o.value === form.platform)?.placeholder || '';

  return (
    <AdminShell>
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/admin/videos" className="p-1 text-muted-foreground hover:text-foreground"><ArrowLeft size={18} /></Link>
          <h1 className="text-lg font-semibold text-foreground">{isEdit ? 'Edit Video' : 'Add Video'}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-card border border-border rounded-md p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Title *</label>
              <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent" />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Description</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Platform *</label>
              <select
                value={form.platform}
                onChange={e => setForm({ ...form, platform: e.target.value as VideoPlatform })}
                className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              >
                {PLATFORM_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Video ID / URL *</label>
              <input type="text" value={form.youtube_id} onChange={e => setForm({ ...form, youtube_id: e.target.value })} required className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent" placeholder={currentPlaceholder} />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Duration</label>
                <input type="text" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent" placeholder="10:30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Published</label>
                <input type="date" value={form.published_at} onChange={e => setForm({ ...form, published_at: e.target.value })} className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Thumbnail URL</label>
                <input type="url" value={form.thumbnail} onChange={e => setForm({ ...form, thumbnail: e.target.value })} className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent" placeholder={form.platform !== 'youtube' ? 'Required for this platform' : 'Auto-generated if empty'} />
              </div>
            </div>

            {form.youtube_id && (
              <div className="bg-muted rounded-md p-3">
                <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                {previewUrl ? (
                  <img src={previewUrl} alt="" className="w-full max-w-sm rounded" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                ) : (
                  <p className="text-sm text-muted-foreground">No auto-preview for {PLATFORM_OPTIONS.find(o => o.value === form.platform)?.label}. Provide a thumbnail URL above.</p>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <Link href="/admin/videos" className="px-4 py-2 text-sm text-muted-foreground bg-secondary rounded-md hover:bg-secondary/80">Cancel</Link>
            <button type="submit" disabled={saving} className="px-4 py-2 text-sm text-primary-foreground bg-primary rounded-md hover:bg-primary/90 disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
