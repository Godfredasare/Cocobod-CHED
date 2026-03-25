'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Calendar, Youtube, Image, TrendingUp, Eye, Plus, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import AdminShell from '@/components/admin/AdminShell';
import { supabase } from '@/lib/supabase';

interface Stats {
  newsCount: number;
  eventsCount: number;
  videosCount: number;
  galleryCount: number;
}

const quickActions = [
  { name: 'Add News', href: '/admin/news/new', icon: Newspaper, color: 'bg-blue-500' },
  { name: 'Add Event', href: '/admin/events/new', icon: Calendar, color: 'bg-purple-500' },
  { name: 'Add Video', href: '/admin/videos/new', icon: Youtube, color: 'bg-red-500' },
  { name: 'Add Image', href: '/admin/gallery/new', icon: Image, color: 'bg-green-500' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    newsCount: 0,
    eventsCount: 0,
    videosCount: 0,
    galleryCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [newsResult, eventsResult, videosResult, galleryResult] = await Promise.all([
        supabase.from('news').select('id', { count: 'exact', head: true }),
        supabase.from('events').select('id', { count: 'exact', head: true }),
        supabase.from('videos').select('id', { count: 'exact', head: true }),
        supabase.from('gallery').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        newsCount: newsResult.count || 0,
        eventsCount: eventsResult.count || 0,
        videosCount: videosResult.count || 0,
        galleryCount: galleryResult.count || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { name: 'News Articles', count: stats.newsCount, icon: Newspaper, color: 'text-blue-600', bg: 'bg-blue-100', href: '/admin/news' },
    { name: 'Events', count: stats.eventsCount, icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-100', href: '/admin/events' },
    { name: 'Videos', count: stats.videosCount, icon: Youtube, color: 'text-red-600', bg: 'bg-red-100', href: '/admin/videos' },
    { name: 'Gallery Images', count: stats.galleryCount, icon: Image, color: 'text-green-600', bg: 'bg-green-100', href: '/admin/gallery' },
  ];

  return (
    <AdminShell>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-foreground"
          >
            Dashboard
          </motion.h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here&apos;s an overview of your content.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={stat.href}
                className="block bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-muted-foreground">{stat.name}</p>
                <p className="text-3xl font-bold text-foreground mt-1">
                  {loading ? '...' : stat.count}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 border border-gray-200 mb-8"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                href={action.href}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
              >
                <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {action.name}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Getting Started Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-primary to-primary/90 rounded-2xl p-8 text-white"
        >
          <h2 className="text-xl font-bold mb-2">Getting Started</h2>
          <p className="text-white/80 mb-6">
            This admin dashboard allows you to manage all content on your CHED website. 
            Use the navigation menu to add, edit, or delete news, events, videos, and gallery images.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
              <Eye className="w-4 h-4" />
              <span className="text-sm">View all content</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
              <Plus className="w-4 h-4" />
              <span className="text-sm">Add new content</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">Track engagement</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AdminShell>
  );
}
