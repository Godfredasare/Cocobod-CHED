'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { News } from '@/types/database';
import { useRef, useState, useEffect } from 'react';

// Animation variants
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 60,
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
      delay: i * 0.12
    }
  }),
  hover: {
    y: -10,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 20
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const imageVariants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20
    }
  }
};

export default function NewsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchNews() {
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .order('date', { ascending: false })
          .limit(3);

        if (error) {
          console.error('Error fetching news:', error.message || error);
          setNews([]);
        } else {
          setNews(data || []);
        }
      } catch (error) {
        console.error('Error fetching news:', error instanceof Error ? error.message : error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  // Don't render anything if loading is complete and no news
  if (!loading && news.length === 0) {
    return null;
  }

  return (
    <section ref={sectionRef} id="news" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4"
          >
            Latest News
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 80, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-5"
          >
            News & Updates
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Stay informed about our latest programs, training sessions, 
            and community engagement activities.
          </motion.p>
        </div>

        {/* News Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-card rounded-2xl overflow-hidden border border-border">
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
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8"
          >
            {news.map((article, index) => (
              <motion.article
                key={article.id}
                custom={index}
                variants={cardVariants}
                whileHover="hover"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                className="group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
              >
                <Link href={`/news/${article.slug}`} className="flex flex-col h-full">
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <motion.div
                      variants={imageVariants}
                      initial="rest"
                      whileHover="hover"
                      className="w-full h-full"
                    >
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Category Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="absolute top-4 left-4"
                    >
                      <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-primary text-xs font-semibold rounded-full shadow-md">
                        {article.category}
                      </span>
                    </motion.div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Calendar size={14} className="text-primary" />
                      <span>{new Date(article.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    
                    <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-snug min-h-[3.5rem]">
                      {article.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed flex-grow min-h-[2.5rem]">
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
        )}

        {/* View All */}
        {!loading && news.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 80 }}
            className="text-center mt-14"
          >
            <Link
              href="/news"
              className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
            >
              View All News
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
