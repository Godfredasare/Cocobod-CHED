'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';
import Header from '@/components/ched/Header';
import Footer from '@/components/ched/Footer';
import { supabase } from '@/lib/supabase';
import type { News } from '@/types/database';
import { useState, useEffect } from 'react';

interface Props {
  slug: string;
}

export default function NewsDetailContent({ slug }: Props) {
  const [article, setArticle] = useState<News | null>(null);
  const [otherNews, setOtherNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        // Fetch the main article
        const { data: articleData, error: articleError } = await supabase
          .from('news')
          .select('*')
          .eq('slug', slug)
          .single();

        if (articleError) throw articleError;
        setArticle(articleData);

        // Fetch other news
        const { data: otherData, error: otherError } = await supabase
          .from('news')
          .select('*')
          .neq('slug', slug)
          .order('date', { ascending: false })
          .limit(3);

        if (otherError) throw otherError;
        setOtherNews(otherData || []);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="pt-32 pb-16 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/2 mx-auto mb-4" />
            <div className="h-4 bg-muted rounded w-1/4 mx-auto" />
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!article) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="pt-32 pb-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Article Not Found</h1>
          <Link href="/news" className="text-primary hover:underline">Back to News</Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Article Header */}
      <section className="pt-24 pb-8 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/news" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
              <ArrowLeft size={16} />
              Back to News
            </Link>
            
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              {article.category}
            </span>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar size={16} />
                {new Date(article.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1">
                <User size={16} />
                CHED Communications
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-8 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden"
          >
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          <div className="mt-8 pt-8 border-t border-border">
            <div className="flex flex-wrap items-center gap-2">
              <Tag size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Tags:</span>
              {['CHED', article.category, 'Cocoa', 'Ghana'].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-muted text-sm rounded-full text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Other News */}
      {otherNews.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-foreground">Other News</h2>
              <Link href="/news" className="text-sm text-primary hover:underline">
                View All
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherNews.map((news, index) => (
                <motion.article
                  key={news.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group bg-white rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow flex flex-col h-full"
                >
                  <Link href={`/news/${news.slug}`} className="flex flex-col h-full">
                    <div className="relative h-40 overflow-hidden flex-shrink-0">
                      <Image
                        src={news.image}
                        alt={news.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-1 bg-white/90 text-primary text-xs font-medium rounded">
                          {news.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <Calendar size={12} />
                        {new Date(news.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                      <h3 className="font-medium text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors min-h-[2.5rem]">
                        {news.title}
                      </h3>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
