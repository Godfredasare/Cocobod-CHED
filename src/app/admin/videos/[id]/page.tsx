'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';
import AdminShell from '@/components/admin/AdminShell';
import { supabase } from '@/lib/supabase';

export default function VideoFormPage() {
  const router = useRouter();
  const params = useParams();
  const isEdit = params.id !== 'new';
  const videoId = isEdit ? (params.id as string) : null;

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    youtube_id: '',
    thumbnail: '',
    duration: '',
    published_at: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (isEdit && videoId) fetchVideo();
  }, [videoId]);

  const fetchVideo = async () => {
    try {
      const { data, error } = await supabase.from('videos').select('*').eq('id', videoId).single();
      if (error) throw error;
      if (data) setFormData(data);
    } catch (error) {
      console.error('Error fetching video:', error);
      router.push('/admin/videos');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEdit) {
        const { error } = await supabase
          .from('videos')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', videoId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('videos').insert([formData]);
        if (error) throw error;
      }
      router.push('/admin/videos');
    } catch (error) {
      console.error('Error saving video:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/videos" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              {isEdit ? 'Edit Video' : 'Add Video'}
            </h1>
            <p className="text-muted-foreground mt-1">Add a YouTube video</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Video Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Enter video title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                placeholder="Video description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                YouTube Video ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.youtube_id}
                onChange={(e) => setFormData({ ...formData, youtube_id: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="e.g., dQw4w9WgXcQ"
              />
              <p className="text-xs text-muted-foreground mt-1">
                The ID from youtube.com/watch?v=<span className="font-medium">VIDEO_ID</span>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Duration</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="10:30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Published Date</label>
                <input
                  type="date"
                  value={formData.published_at}
                  onChange={(e) => setFormData({ ...formData, published_at: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Custom Thumbnail</label>
                <input
                  type="url"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Optional"
                />
              </div>
            </div>

            {formData.youtube_id && (
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-medium text-foreground mb-2">Preview:</p>
                <img
                  src={`https://img.youtube.com/vi/${formData.youtube_id}/maxresdefault.jpg`}
                  alt="Video thumbnail preview"
                  className="w-full max-w-md rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-4">
            <Link
              href="/admin/videos"
              className="px-6 py-3 bg-gray-100 text-foreground font-medium rounded-xl hover:bg-gray-200 transition-colors"
            >
              Cancel
            </Link>
            <motion.button
              type="submit"
              disabled={saving}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-70"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Video
                </>
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
