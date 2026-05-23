'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  {
    src: '/images/gallery-1.png',
    alt: 'Cocoa farmers at work in the field',
    category: 'Field Work',
  },
  {
    src: '/images/gallery-2.png',
    alt: 'Farmer training session outdoors',
    category: 'Training',
  },
  {
    src: '/images/gallery-3.png',
    alt: 'Cocoa processing facility',
    category: 'Facilities',
  },
  {
    src: '/images/gallery-4.png',
    alt: 'Community meeting with farmers',
    category: 'Community',
  },
  {
    src: '/images/news-1.png',
    alt: 'Indoor training workshop',
    category: 'Training',
  },
  {
    src: '/images/news-2.png',
    alt: 'Fire safety demonstration',
    category: 'Events',
  },
  {
    src: '/images/news-3.png',
    alt: 'Community engagement program',
    category: 'Community',
  },
  {
    src: '/images/hero-bg.jpg',
    alt: 'Premium cocoa beans',
    category: 'Products',
  },
  {
    src: '/images/gallery-1.png',
    alt: 'Extension officer with farmers',
    category: 'Field Work',
  },
];

const categories = ['All', 'Training', 'Field Work', 'Community', 'Events', 'Facilities', 'Products'];

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <section id="gallery" className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4"
          >
            Media
          </motion.span>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4"
          >
            Photo Gallery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Highlights from our training sessions, field operations, and community programs across Ghana.
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-white text-foreground hover:bg-muted border border-border'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={`${image.src}-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              onClick={() => openLightbox(index)}
              className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer bg-muted"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors">
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                  <p className="text-white text-sm font-medium">{image.alt}</p>
                  <span className="text-white/70 text-xs">{image.category}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white hover:text-white/70 transition-colors"
          >
            <X size={24} />
          </button>
          
          <button
            onClick={prevImage}
            className="absolute left-4 p-2 text-white hover:text-white/70 transition-colors"
          >
            <ChevronLeft size={32} />
          </button>
          
          <div className="relative w-full max-w-4xl aspect-video">
            <Image
              src={filteredImages[currentImageIndex]?.src || ''}
              alt={filteredImages[currentImageIndex]?.alt || ''}
              fill
              className="object-contain"
            />
          </div>
          
          <button
            onClick={nextImage}
            className="absolute right-4 p-2 text-white hover:text-white/70 transition-colors"
          >
            <ChevronRight size={32} />
          </button>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {currentImageIndex + 1} / {filteredImages.length}
          </div>
        </div>
      )}
    </section>
  );
}
