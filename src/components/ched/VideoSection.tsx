'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Play, Youtube, Clock, Calendar, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import type { Video } from '@/types/database';

const cardVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
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
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={onClose}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative pt-[56.25%] bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtube_id}?autoplay=1&rel=0`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-2">{video.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{video.description}</p>
            </div>
          </div>
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
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="group cursor-pointer h-full"
      onClick={onClick}
    >
      <div className="relative rounded-2xl overflow-hidden bg-muted shadow-sm hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
        {/* Thumbnail */}
        <div className="relative pt-[56.25%] bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 hover:scale-[1.02] transition-transform duration-300">
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
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-7 h-7 text-white fill-white ml-1" />
            </div>
          </div>

          {/* Duration Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 right-4 bg-black/80 text-white text-xs font-medium px-3 py-1.5 rounded-lg backdrop-blur-sm"
          >
            {video.duration}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-4 bg-white flex flex-col flex-grow">
          <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2 min-h-[2.75rem]">
            {video.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-grow min-h-[2.5rem]">{video.description}</p>
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
        const res = await fetch('/api/videos');
        if (res.ok) {
          const { data } = await res.json();
          // Client-side limit to 3 for homepage
          setVideos((data || []).slice(0, 3));
        }
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

  // Don't render anything if loading is complete and no videos
  if (!loading && videos.length === 0) {
    return null;
  }

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
            transition={{ duration: 0.3 }}
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
        ) : (
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
        )}

        {/* Subscribe CTA */}
        {!loading && videos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="mt-12 text-center"
          >
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 hover:scale-[1.02] active:scale-[1.00] transition-all duration-300 shadow-lg shadow-red-500/20"
            >
              <Youtube size={22} />
              <span>Subscribe to Our Channel</span>
            </a>
          </motion.div>
        )}
      </div>

      {/* Video Modal */}
      {isModalOpen && selectedVideo && (
        <VideoModal video={selectedVideo} isOpen={isModalOpen} onClose={closeModal} />
      )}
    </section>
  );
}
