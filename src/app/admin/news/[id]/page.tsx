'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import AdminShell from '@/components/admin/AdminShell';
import ImageUpload from '@/components/admin/ImageUpload';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { ArrowLeft } from 'lucide-react';

const categories = ['Extension Services', 'Disease Control', 'Training', 'Partnership', 'Achievement', 'Announcement'];

export default function NewsFormPage() {
  const router = useRouter();
  const params = useParams();
  const isEdit = params.id !== 'new';
  const newsId = isEdit ? (params.id as string) : null;

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '', slug: '', excerpt: '', content: '', image: '',
    category: categories[0], date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (isEdit && newsId) {
      fetch(`/api/admin/news/${newsId}`)
        .then(r => r.json())
        .then(d => {
          if (d.data) setForm({ ...d.data, image: d.data.image || '', date: d.data.date.split('T')[0] });
        })
        .catch(() => router.push('/admin/news'))
        .finally(() => setLoading(false));
    }
  }, [newsId]);

  const generateSlug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const url = isEdit ? `/api/admin/news/${newsId}` : '/api/admin/news';
    await fetch(url, {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    router.push('/admin/news');
  };

  if (loading) {
    return <AdminShell><div className="flex justify-center py-20"><div className="w-6 h-6 border-2 border-border border-t-primary rounded-full animate-spin" /></div></AdminShell>;
  }

  return (
    <AdminShell>
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/admin/news" className="p-1 text-muted-foreground hover:text-foreground"><ArrowLeft size={18} /></Link>
          <h1 className="text-lg font-semibold text-foreground">{isEdit ? 'Edit News' : 'Add News'}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-card border border-border rounded-md p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Title *</label>
              <input
                type="text" value={form.title}
                onChange={e => { const t = e.target.value; setForm({ ...form, title: t, slug: generateSlug(t) }); }}
                required
                className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                placeholder="News title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Slug *</label>
              <input
                type="text" value={form.slug}
                onChange={e => setForm({ ...form, slug: e.target.value })}
                required
                className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
              <p className="text-xs text-muted-foreground mt-1">/news/{form.slug}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Excerpt *</label>
              <textarea
                value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })}
                required rows={2}
                className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Content *</label>
              <RichTextEditor value={form.content} onChange={v => setForm({ ...form, content: v })} placeholder="Write content..." height="300px" />
            </div>

            <ImageUpload value={form.image} onChange={url => setForm({ ...form, image: url })} folder="news" label="Featured Image" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Category *</label>
                <select
                  value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Date *</label>
                <input
                  type="date" value={form.date}
                  onChange={e => setForm({ ...form, date: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Link href="/admin/news" className="px-4 py-2 text-sm text-muted-foreground bg-secondary rounded-md hover:bg-secondary/80">Cancel</Link>
            <button type="submit" disabled={saving} className="px-4 py-2 text-sm text-primary-foreground bg-primary rounded-md hover:bg-primary/90 disabled:opacity-50">
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
