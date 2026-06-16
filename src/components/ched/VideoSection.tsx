'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Play, Youtube, Facebook, Music2, Clock, Calendar, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import type { Video, VideoPlatform } from '@/types/database';

const cardVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } }
};

function getEmbedUrl(video: Video): string {
  const platform: VideoPlatform = video.platform || 'youtube';
  switch (platform) {
    case 'facebook':
      const fbId = video.youtube_id.includes('facebook.com') ? video.youtube_id : `https://www.facebook.com/watch/?v=${video.youtube_id}`;
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(fbId)}&show_text=false&width=734`;
    case 'tiktok':
      const tkId = video.youtube_id.replace('https://', '').replace('www.tiktok.com/', '').replace('tiktok.com/', '');
      const cleanId = tkId.includes('/video/') ? tkId.split('/video/')[1].split('?')[0] : video.youtube_id;
      return `https://www.tiktok.com/embed/v2/${cleanId}`;
    case 'youtube':
    default:
      return `https://www.youtube.com/embed/${video.youtube_id}?autoplay=1&rel=0`;
  }
}

function getThumbnailUrl(video: Video): string {
  const platform: VideoPlatform = video.platform || 'youtube';
  if (platform === 'youtube') {
    return `https://img.youtube.com/vi/${video.youtube_id}/maxresdefault.jpg`;
  }
  return video.thumbnail || '';
}

function getThumbnailFallback(video: Video): string {
  const platform: VideoPlatform = video.platform || 'youtube';
  if (platform === 'youtube') {
    return `https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg`;
  }
  return '';
}

function getPlatformIcon(platform: VideoPlatform) {
  switch (platform) {
    case 'facebook': return <Facebook size={16} className="flex-shrink-0" />;
    case 'tiktok': return <Music2 size={16} className="flex-shrink-0" />;
    case 'youtube':
    default: return <Youtube size={16} className="flex-shrink-0" />;
  }
}

function getPlatformBadgeColor(platform: VideoPlatform): string {
  switch (platform) {
    case 'facebook': return 'bg-blue-500/10 text-blue-500';
    case 'tiktok': return 'bg-gray-800/10 text-gray-700';
    case 'youtube':
    default: return 'bg-red-500/10 text-red-500';
  }
}

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

  const platform: VideoPlatform = video.platform || 'youtube';
  const embedUrl = getEmbedUrl(video);

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
              {platform === 'youtube' || platform === 'tiktok' ? (
                <iframe
                  src={embedUrl}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              ) : (
                <iframe
                  src={embedUrl}
                  title={video.title}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              )}
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
  const platform: VideoPlatform = video.platform || 'youtube';
  const thumbnailUrl = getThumbnailUrl(video);
  const fallbackUrl = getThumbnailFallback(video);
  const hasThumbnail = !!thumbnailUrl;

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
            {hasThumbnail ? (
              <img
                src={thumbnailUrl}
                alt={video.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (fallbackUrl) {
                    target.src = fallbackUrl;
                  } else {
                    target.style.display = 'none';
                  }
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                {getPlatformIcon(platform)}
              </div>
            )}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-7 h-7 text-white fill-white ml-1" />
            </div>
          </div>

          {/* Duration Badge */}
          {video.duration && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-4 right-4 bg-black/80 text-white text-xs font-medium px-3 py-1.5 rounded-lg backdrop-blur-sm"
            >
              {video.duration}
            </motion.div>
          )}

          <div className={`absolute top-4 left-4 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${getPlatformBadgeColor(platform)}`}>
            {platform === 'youtube' ? 'YouTube' : platform === 'facebook' ? 'Facebook' : 'TikTok'}
          </div>
        </div>

        <div className="p-4 bg-white flex flex-col flex-grow">
          <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2 min-h-[2.75rem]">
            {video.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-grow min-h-[2.5rem]">{video.description}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock size={12} className="text-primary" />
              <span>{video.duration || 'Video'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={12} className="text-primary" />
              <span>{video.published_at ? new Date(video.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}</span>
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

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch('/api/videos');
        if (res.ok) {
          const { data } = await res.json();
          setVideos((data || []).slice(0, 4));
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

  if (!loading && videos.length === 0) {
    return null;
  }

  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-white to-muted/20 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-red-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-3">
              <Play size={16} className="flex-shrink-0" />
              <span>Watch & Learn</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Latest Videos
            </h2>
            <p className="text-muted-foreground text-lg mt-3 max-w-xl leading-relaxed">
              Watch informative videos about our programs, farmer success stories, and cocoa farming best practices.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
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

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
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
            viewport={{ once: true, margin: "-20px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {videos.map((video, index) => (
              <VideoCard key={video.id} video={video} index={index} onClick={() => openModal(video)} />
            ))}
          </motion.div>
        )}
      </div>

      {isModalOpen && selectedVideo && (
        <VideoModal video={selectedVideo} isOpen={isModalOpen} onClose={closeModal} />
      )}
    </section>
  );
}
