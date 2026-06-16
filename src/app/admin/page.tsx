'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminShell from '@/components/admin/AdminShell';
import { Newspaper, Calendar, Youtube, Image, BookOpen, MessageSquare } from 'lucide-react';

interface Stats {
  newsCount: number;
  eventsCount: number;
  videosCount: number;
  galleryCount: number;
  documentsCount: number;
  conversationsCount: number;
}

const links = [
  { label: 'News', href: '/admin/news', count: (s: Stats) => s.newsCount, icon: Newspaper },
  { label: 'Events', href: '/admin/events', count: (s: Stats) => s.eventsCount, icon: Calendar },
  { label: 'Videos', href: '/admin/videos', count: (s: Stats) => s.videosCount, icon: Youtube },
  { label: 'Gallery', href: '/admin/gallery', count: (s: Stats) => s.galleryCount, icon: Image },
  { label: 'Documents', href: '/admin/knowledge-base', count: (s: Stats) => s.documentsCount, icon: BookOpen },
  { label: 'Conversations', href: '/admin/conversations', count: (s: Stats) => s.conversationsCount, icon: MessageSquare },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ newsCount: 0, eventsCount: 0, videosCount: 0, galleryCount: 0, documentsCount: 0, conversationsCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d) setStats(d); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminShell>
      <h1 className="text-lg font-semibold text-foreground mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {links.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="bg-card border border-border rounded-lg p-5 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              <item.icon size={18} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{item.label}</span>
            </div>
            <span className="text-2xl font-semibold text-foreground">
              {loading ? '-' : item.count(stats)}
            </span>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
