'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, Eye, Calendar, AlertCircle, X } from 'lucide-react';
import Link from 'next/link';
import AdminShell from '@/components/admin/AdminShell';
import { supabase } from '@/lib/supabase';
import { News } from '@/types/database';
import Image from 'next/image';

export default function NewsAdminPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    
    setDeleting(true);
    try {
      const { error } = await supabase.from('news').delete().eq('id', deleteId);
      if (error) throw error;
      setNews(news.filter((item) => item.id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.error('Error deleting news:', error);
    } finally {
      setDeleting(false);
    }
  };

  const filteredNews = news.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminShell>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">News Management</h1>
            <p className="text-muted-foreground mt-1">Manage news articles and updates</p>
          </div>
          <Link
            href="/admin/news/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            <Plus className="w-5 h-5" />
            Add News
          </Link>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* News List */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-xl" />
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredNews.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-200 p-12 text-center"
          >
            <Newspaper className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No News Found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery ? 'Try a different search term' : 'Get started by adding your first news article'}
            </p>
            {!searchQuery && (
              <Link
                href="/admin/news/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl"
              >
                <Plus className="w-5 h-5" />
                Add News
              </Link>
            )}
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredNews.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
                    <Image
                      src={item.image || '/images/placeholder.jpg'}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-2">
                          {item.category}
                        </span>
                        <h3 className="text-lg font-semibold text-foreground line-clamp-2">{item.title}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(item.date).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm mt-3 line-clamp-2">{item.excerpt}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Link
                          href={`/news/${item.slug}`}
                          target="_blank"
                          className="p-2 text-muted-foreground hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="w-5 h-5" />
                        </Link>
                        <Link
                          href={`/admin/news/${item.id}`}
                          className="p-2 text-muted-foreground hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => setDeleteId(item.id)}
                          className="p-2 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
              onClick={() => setDeleteId(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Delete News</h3>
                    <p className="text-sm text-muted-foreground">This action cannot be undone</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">
                  Are you sure you want to delete this news article? All associated data will be permanently removed.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteId(null)}
                    className="flex-1 px-4 py-3 bg-gray-100 text-foreground font-medium rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex-1 px-4 py-3 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors disabled:opacity-70"
                  >
                    {deleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminShell>
  );
}

// Import Newspaper icon
import { Newspaper } from 'lucide-react';
