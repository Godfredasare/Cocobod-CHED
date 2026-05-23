'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import AdminShell from '@/components/admin/AdminShell';
import ImageUpload from '@/components/admin/ImageUpload';
import { ArrowLeft } from 'lucide-react';

const categories = ['Festival', 'Workshop', 'Meeting', 'Celebration', 'Conference', 'Training'];

export default function EventFormPage() {
  const router = useRouter();
  const params = useParams();
  const isEdit = params.id !== 'new';
  const eventId = isEdit ? (params.id as string) : null;

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '', description: '', date: new Date().toISOString().split('T')[0],
    time: '09:00', venue: '', category: categories[0], image: '',
  });

  useEffect(() => {
    if (isEdit && eventId) {
      fetch(`/api/admin/events/${eventId}`)
        .then(r => r.json())
        .then(d => { if (d.data) setForm({ ...d.data, image: d.data.image || '', date: d.data.date.split('T')[0] }); })
        .catch(() => router.push('/admin/events'))
        .finally(() => setLoading(false));
    }
  }, [eventId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch(isEdit ? `/api/admin/events/${eventId}` : '/api/admin/events', {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    router.push('/admin/events');
  };

  if (loading) {
    return <AdminShell><div className="flex justify-center py-20"><div className="w-6 h-6 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" /></div></AdminShell>;
  }

  return (
    <AdminShell>
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/admin/events" className="p-1 text-gray-400 hover:text-gray-600"><ArrowLeft size={18} /></Link>
          <h1 className="text-lg font-semibold text-gray-900">{isEdit ? 'Edit Event' : 'Add Event'}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-white border border-gray-200 rounded-md p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required rows={3} className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                <input type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} required className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Venue *</label>
              <input type="text" value={form.venue} onChange={e => setForm({ ...form, venue: e.target.value })} required className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent">
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <ImageUpload label="Image" value={form.image} onChange={url => setForm({ ...form, image: url })} folder="events" />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Link href="/admin/events" className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200">Cancel</Link>
            <button type="submit" disabled={saving} className="px-4 py-2 text-sm text-white bg-gray-900 rounded-md hover:bg-gray-800 disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
