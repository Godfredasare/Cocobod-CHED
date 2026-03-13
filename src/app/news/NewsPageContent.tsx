'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';
import Header from '@/components/ched/Header';
import Footer from '@/components/ched/Footer';
import VideoSection from '@/components/ched/VideoSection';
import newsData from '@/data/news.json';

export default function NewsPageContent() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Banner */}
      <section className="pt-24 pb-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              Latest Updates
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              News & Updates
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay informed about our latest programs, training sessions, and community engagement activities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {newsData.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group bg-muted/30 rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow"
              >
                <Link href={`/news/${article.slug}`}>
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-white/90 text-primary text-xs font-medium rounded">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Calendar size={14} />
                      {article.date}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {article.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                      Read more
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <VideoSection />

      <Footer />
    </main>
  );
}
