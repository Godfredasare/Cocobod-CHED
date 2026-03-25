'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, Calendar, MapPin, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import AdminShell from '@/components/admin/AdminShell';
import { supabase } from '@/lib/supabase';
import { Event } from '@/types/database';

const categoryColors: Record<string, string> = {
  Festival: 'bg-purple-100 text-purple-700',
  Workshop: 'bg-blue-100 text-blue-700',
  Meeting: 'bg-green-100 text-green-700',
  Celebration: 'bg-amber-100 text-amber-700',
  Conference: 'bg-rose-100 text-rose-700',
  Training: 'bg-teal-100 text-teal-700',
};

export default function EventsAdminPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase.from('events').select('*').order('date', { ascending: true });
      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const { error } = await supabase.from('events').delete().eq('id', deleteId);
      if (error) throw error;
      setEvents(events.filter((item) => item.id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.error('Error deleting event:', error);
    } finally {
      setDeleting(false);
    }
  };

  const filteredEvents = events.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminShell>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Events Management</h1>
            <p className="text-muted-foreground mt-1">Manage upcoming and past events</p>
          </div>
          <Link
            href="/admin/events/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Event
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : filteredEvents.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <Calendar className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Events Found</h3>
            <p className="text-muted-foreground mb-6">Get started by adding your first event</p>
            <Link
              href="/admin/events/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl"
            >
              <Plus className="w-5 h-5" />
              Add Event
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-2 ${
                        categoryColors[event.category] || 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {event.category}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{event.description}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(event.date).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {event.venue}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/events/${event.id}`}
                      className="p-2 text-muted-foreground hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => setDeleteId(event.id)}
                      className="p-2 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

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
                className="bg-white rounded-2xl p-6 max-w-md w-full"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Delete Event</h3>
                    <p className="text-sm text-muted-foreground">This action cannot be undone</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
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
