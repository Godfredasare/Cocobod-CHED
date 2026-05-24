'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Youtube, Facebook, Music2, Clock, Calendar, X, Search } from 'lucide-react';
import Header from '@/components/ched/Header';
import Footer from '@/components/ched/Footer';
import type { Video, VideoPlatform } from '@/types/database';

// Helpers
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-foreground hover:bg-white transition-colors shadow-lg hover:scale-110 active:scale-95"
            >
              <X size={20} />
            </button>

            <div className="relative pt-[56.25%] bg-black">
              <iframe
                src={embedUrl}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-2">{video.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{video.description}</p>
              <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-primary" />
                  <span>{video.duration || 'Video'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-primary" />
                  <span>{video.published_at ? new Date(video.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}</span>
                </div>
              </div>
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
  onClick
}: {
  video: Video;
  onClick: () => void;
}) {
  const platform: VideoPlatform = video.platform || 'youtube';
  const thumbnailUrl = getThumbnailUrl(video);
  const fallbackUrl = getThumbnailFallback(video);
  const hasThumbnail = !!thumbnailUrl;

  return (
    <div
      className="group cursor-pointer h-full transition-all duration-300 hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="relative rounded-2xl overflow-hidden bg-muted shadow-sm hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
        {/* Thumbnail */}
        <div className="relative pt-[56.25%] bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-300">
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
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <Play size={48} className="text-muted-foreground/30" />
              </div>
            )}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-xl group-hover:scale-110 active:scale-95 transition-transform">
              <Play className="w-7 h-7 text-white fill-white ml-1" />
            </div>
          </div>

          {video.duration && (
            <div className="absolute bottom-4 right-4 bg-black/80 text-white text-xs font-medium px-3 py-1.5 rounded-lg backdrop-blur-sm">
              {video.duration}
            </div>
          )}

          <div className={`absolute top-4 left-4 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${getPlatformBadgeColor(platform)}`}>
            {platform === 'youtube' ? 'YouTube' : platform === 'facebook' ? 'Facebook' : 'TikTok'}
          </div>
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
              <span>{video.duration || 'Video'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={12} className="text-primary" />
              <span>{video.published_at ? new Date(video.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch('/api/videos');
        if (res.ok) {
          const { data } = await res.json();
          setVideos(data || []);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (video.description || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (video: Video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedVideo(null), 300);
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-28 pb-12 bg-gradient-to-br from-primary/5 via-white to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6"
            >
              <Play className="w-10 h-10 text-primary" />
            </div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4"
            >
              Media Library
            </motion.span>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-5"
            >
              Video Gallery
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Explore our collection of educational videos, farmer success stories, and informative content about cocoa farming best practices.
            </motion.p>
          </motion.div>

          {/* Search and Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="rounded-2xl overflow-hidden bg-muted">
                    <div className="pt-[56.25%] bg-muted" />
                    <div className="p-5 bg-white">
                      <div className="h-5 bg-muted rounded w-3/4 mb-3" />
                      <div className="h-4 bg-muted rounded w-full mb-2" />
                      <div className="h-4 bg-muted rounded w-1/2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredVideos.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <VideoCard key={video.id} video={video} onClick={() => openModal(video)} />
              ))}
            </div>
          ) : (
            <div
              className="text-center py-20"
            >
              <Play className="w-20 h-20 text-muted-foreground/20 mx-auto mb-6" />
              <h3 className="font-semibold text-xl text-foreground mb-2">
                {searchQuery ? 'No Videos Found' : 'No Videos Available'}
              </h3>
              <p className="text-muted-foreground">
                {searchQuery ? 'Try a different search term.' : 'Check back soon for new video content.'}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Video Modal */}
      {isModalOpen && selectedVideo && (
        <VideoModal video={selectedVideo} isOpen={isModalOpen} onClose={closeModal} />
      )}
    </main>
  );
}
