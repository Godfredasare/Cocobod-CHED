'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import AdminShell from '@/components/admin/AdminShell';
import ImageUpload from '@/components/admin/ImageUpload';
import { ArrowLeft } from 'lucide-react';

const categories = ['Training', 'Extension', 'Disease Control', 'Partnership', 'Events', 'Farm Visit'];

export default function GalleryFormPage() {
  const router = useRouter();
  const params = useParams();
  const isEdit = params.id !== 'new';
  const imageId = isEdit ? (params.id as string) : null;

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ src: '', alt: '', category: categories[0] });

  useEffect(() => {
    if (isEdit && imageId) {
      fetch(`/api/admin/gallery/${imageId}`)
        .then(r => r.json())
        .then(d => { if (d.data) setForm({ src: d.data.src, alt: d.data.alt, category: d.data.category }); })
        .catch(() => router.push('/admin/gallery'))
        .finally(() => setLoading(false));
    }
  }, [imageId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch(isEdit ? `/api/admin/gallery/${imageId}` : '/api/admin/gallery', {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    router.push('/admin/gallery');
  };

  if (loading) {
    return <AdminShell><div className="flex justify-center py-20"><div className="w-6 h-6 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" /></div></AdminShell>;
  }

  return (
    <AdminShell>
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/admin/gallery" className="p-1 text-gray-400 hover:text-gray-600"><ArrowLeft size={18} /></Link>
          <h1 className="text-lg font-semibold text-gray-900">{isEdit ? 'Edit Image' : 'Add Image'}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-white border border-gray-200 rounded-md p-6 space-y-5">
            <ImageUpload value={form.src} onChange={url => setForm({ ...form, src: url })} folder="gallery" label="Image" required />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text *</label>
              <input type="text" value={form.alt} onChange={e => setForm({ ...form, alt: e.target.value })} required className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" placeholder="Image description" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Link href="/admin/gallery" className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200">Cancel</Link>
            <button type="submit" disabled={saving} className="px-4 py-2 text-sm text-white bg-gray-900 rounded-md hover:bg-gray-800 disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
