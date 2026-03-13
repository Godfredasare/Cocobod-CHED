'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Play, Youtube, Clock, Calendar, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Video } from '@/types/database';

// Animation variants
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
      delay: i * 0.12
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

const playButtonVariants = {
  rest: { 
    scale: 1,
    boxShadow: "0 0 0 0 rgba(22, 101, 52, 0.4)"
  },
  hover: { 
    scale: 1.1,
    boxShadow: "0 0 0 20px rgba(22, 101, 52, 0)",
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 15
    }
  },
  tap: { scale: 0.95 }
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

// Video Modal Component
function VideoModal({
  video,
  isOpen,
  onClose
}: {
  video: Video | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!video) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ 
              type: 'spring',
              stiffness: 300,
              damping: 25
            }}
            className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video Player */}
            <div className="relative pt-[56.25%] bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtube_id}?autoplay=1&rel=0`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            {/* Video Info */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-2">{video.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{video.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Video Card Component
function VideoCard({
  video,
  index,
  onClick
}: {
  video: Video;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-30px" }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative rounded-2xl overflow-hidden bg-muted shadow-sm hover:shadow-2xl transition-all duration-300">
        {/* Thumbnail */}
        <div className="relative pt-[56.25%] bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
          <motion.div
            initial={{ scale: 1.1 }}
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <Image
              src={`https://img.youtube.com/vi/${video.youtube_id}/maxresdefault.jpg`}
              alt={video.title}
              fill
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg`;
              }}
            />
          </motion.div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              variants={playButtonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="w-18 h-18 rounded-full bg-primary flex items-center justify-center shadow-xl"
            >
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </motion.div>
          </div>

          {/* Duration Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="absolute bottom-4 right-4 bg-black/80 text-white text-xs font-medium px-3 py-1.5 rounded-lg backdrop-blur-sm"
          >
            {video.duration}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-5 bg-white">
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-3">
            {video.title}
          </h3>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock size={12} className="text-primary" />
              <span>{video.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={12} className="text-primary" />
              <span>{new Date(video.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function VideoSection() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const channelUrl = "https://www.youtube.com/@CHEDGhanaCocoaBoard";

  useEffect(() => {
    async function fetchVideos() {
      try {
        const { data, error } = await supabase
          .from('videos')
          .select('*')
          .order('published_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        setVideos(data || []);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  const openModal = (video: Video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedVideo(null), 300);
  };

  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-white to-muted/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-red-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-500/10 text-red-500 text-sm font-semibold rounded-full mb-3">
              <Youtube size={16} className="flex-shrink-0" />
              <span>Watch & Learn</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Featured Videos
            </h2>
            <p className="text-muted-foreground text-lg mt-3 max-w-xl leading-relaxed">
              Watch informative videos about our programs, farmer success stories, and cocoa farming best practices.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <Link
              href="/videos"
              className="group inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              <span>View All Videos</span>
              <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Videos Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="rounded-2xl overflow-hidden bg-muted">
                  <div className="pt-[56.25%] bg-muted" />
                  <div className="p-5 bg-white">
                    <div className="h-5 bg-muted rounded w-3/4 mb-3" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : videos.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {videos.map((video, index) => (
              <VideoCard key={video.id} video={video} index={index} onClick={() => openModal(video)} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center py-16 bg-white rounded-3xl border border-border shadow-sm"
          >
            <Youtube className="w-20 h-20 text-muted-foreground/20 mx-auto mb-6" />
            <h3 className="font-semibold text-xl text-foreground mb-2">No Videos Available</h3>
            <p className="text-muted-foreground">Check back soon for new video content.</p>
          </motion.div>
        )}

        {/* Subscribe CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 80 }}
          className="mt-12 text-center"
        >
          <motion.a
            href={channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
          >
            <Youtube size={22} />
            <span>Subscribe to Our Channel</span>
          </motion.a>
        </motion.div>
      </div>

      {/* Video Modal */}
      {isModalOpen && selectedVideo && (
        <VideoModal video={selectedVideo} isOpen={isModalOpen} onClose={closeModal} />
      )}
    </section>
  );
}
