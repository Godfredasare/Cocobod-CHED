'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Newspaper, 
  Calendar, 
  Youtube, 
  Image, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  ExternalLink,
  User
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'News', href: '/admin/news', icon: Newspaper },
  { name: 'Events', href: '/admin/events', icon: Calendar },
  { name: 'Videos', href: '/admin/videos', icon: Youtube },
  { name: 'Gallery', href: '/admin/gallery', icon: Image },
];

interface AdminShellProps {
  children: React.ReactNode;
}

export default function AdminShell({ children }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { signOut } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-foreground">CHED Admin</span>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/admin' && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                  isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'text-muted-foreground hover:bg-gray-100 hover:text-foreground'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          {/* View Website */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-gray-100 rounded-xl transition-all mb-2"
          >
            <ExternalLink className="w-5 h-5" />
            <span className="font-medium">View Website</span>
          </Link>

          {/* Sign Out */}
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-72">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">Administrator</p>
              <p className="text-xs text-muted-foreground">CHED Dashboard</p>
            </div>
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
