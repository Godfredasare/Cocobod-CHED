'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';
import AdminShell from '@/components/admin/AdminShell';
import ImageUpload from '@/components/admin/ImageUpload';
import { supabase } from '@/lib/supabase';

const categories = ['Training', 'Extension', 'Disease Control', 'Partnership', 'Events', 'Farm Visit'];

export default function GalleryFormPage() {
  const router = useRouter();
  const params = useParams();
  const isEdit = params.id !== 'new';
  const imageId = isEdit ? (params.id as string) : null;

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    src: '',
    alt: '',
    category: categories[0],
  });

  useEffect(() => {
    if (isEdit && imageId) fetchImage();
  }, [imageId]);

  const fetchImage = async () => {
    try {
      const { data, error } = await supabase.from('gallery').select('*').eq('id', imageId).single();
      if (error) throw error;
      if (data) setFormData({ src: data.src, alt: data.alt, category: data.category });
    } catch (error) {
      console.error('Error fetching image:', error);
      router.push('/admin/gallery');
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
          .from('gallery')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', imageId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('gallery').insert([formData]);
        if (error) throw error;
      }
      router.push('/admin/gallery');
    } catch (error) {
      console.error('Error saving image:', error);
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
          <Link href="/admin/gallery" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              {isEdit ? 'Edit Image' : 'Add Image'}
            </h1>
            <p className="text-muted-foreground mt-1">Add an image to the gallery</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
            <ImageUpload
              value={formData.src}
              onChange={(url) => setFormData({ ...formData, src: url })}
              folder="gallery"
              label="Image"
              required
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Alt Text <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.alt}
                onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Image description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4">
            <Link
              href="/admin/gallery"
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
                  Save Image
                </>
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
