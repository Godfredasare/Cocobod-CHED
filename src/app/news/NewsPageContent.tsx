'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';
import Header from '@/components/ched/Header';
import Footer from '@/components/ched/Footer';
import VideoSection from '@/components/ched/VideoSection';
import { supabase } from '@/lib/supabase';
import type { News } from '@/types/database';
import { useState, useEffect } from 'react';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.95
  },
  visible: (i: number) => ({ 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 70,
      damping: 12,
      delay: i * 0.08
    }
  }),
  hover: {
    y: -8,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 20
    }
  }
};

export default function NewsPageContent() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
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
    }

    fetchNews();
  }, []);

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Banner */}
      <section className="relative pt-28 pb-16 bg-gradient-to-br from-primary via-primary to-primary/95 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-20 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 80, damping: 15 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-block px-5 py-2 bg-accent/20 text-accent text-sm font-semibold rounded-full mb-6 backdrop-blur-sm border border-accent/10"
            >
              Latest Updates
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              News & Updates
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-white/90 leading-relaxed"
            >
              Stay informed about our latest programs, training sessions, and community engagement activities.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-white rounded-2xl overflow-hidden border border-border">
                    <div className="h-56 bg-muted" />
                    <div className="p-6">
                      <div className="h-4 bg-muted rounded w-1/4 mb-3" />
                      <div className="h-6 bg-muted rounded w-3/4 mb-3" />
                      <div className="h-4 bg-muted rounded w-full mb-2" />
                      <div className="h-4 bg-muted rounded w-1/2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : news.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8"
            >
              {news.map((article, index) => (
                <motion.article
                  key={article.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, margin: "-30px" }}
                  className="group bg-white rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-shadow"
                >
                  <Link href={`/news/${article.slug}`}>
                    <div className="relative h-56 overflow-hidden">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="w-full h-full"
                      >
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-primary text-xs font-semibold rounded-full shadow-md">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <Calendar size={14} className="text-primary" />
                        <span>{new Date(article.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                      <h3 className="font-bold text-xl text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                        {article.excerpt}
                      </p>
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
                      >
                        Read more
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <Calendar className="w-20 h-20 text-muted-foreground/20 mx-auto mb-6" />
              <h3 className="font-semibold text-xl text-foreground mb-2">No News Available</h3>
              <p className="text-muted-foreground">Check back soon for the latest updates.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Video Section */}
      <VideoSection />

      <Footer />
    </main>
  );
}
