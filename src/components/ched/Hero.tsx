'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const slides = [
  {
    image: '/images/hero-bg.png',
    title: 'Empowering Cocoa Farmers',
    subtitle: 'Across Ghana',
    description: 'Dedicated to ensuring sustainable cocoa production through innovative extension services and farmer education.',
  },
  {
    image: '/images/hero-2.png',
    title: 'Sustainable Cocoa',
    subtitle: 'Production',
    description: 'Supporting farmers with modern techniques for healthier crops and better yields.',
  },
  {
    image: '/images/hero-3.png',
    title: 'Expert Extension',
    subtitle: 'Services',
    description: 'Our trained extension officers provide hands-on support to farming communities nationwide.',
  },
  {
    image: '/images/hero-4.png',
    title: 'Quality Cocoa',
    subtitle: 'For The World',
    description: 'Ensuring Ghana maintains its position as a leading producer of premium quality cocoa.',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // Increased from 5000ms to 6000ms
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  return (
    <section id="home" className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-16 lg:pt-20 overflow-hidden">
      {/* Background Images Slideshow - Crossfade approach */}
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          initial={false}
          animate={{ opacity: index === currentSlide ? 1 : 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
          style={{ zIndex: index === currentSlide ? 1 : 0 }}
        >
          <Image
            src={slide.image}
            alt="Hero background"
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 bg-accent/20 text-accent text-sm font-medium rounded-full mb-4">
              Ghana Cocoa Board
            </span>
          </motion.div>

          <motion.h1
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6"
          >
            {slides[currentSlide].title}
            <span className="block text-accent">{slides[currentSlide].subtitle}</span>
          </motion.h1>

          <motion.p
            key={`desc-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-white/85 mb-8 max-w-xl"
          >
            {slides[currentSlide].description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="/operations"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent/90 transition-colors"
            >
              Our Services
              <ArrowRight size={18} />
            </a>
            <a
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              Learn More
            </a>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 lg:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {[
            { value: '50+', label: 'Years of Service' },
            { value: '800K+', label: 'Farmers Supported' },
            { value: '14', label: 'Regions Covered' },
            { value: '1M+', label: 'Hectares Monitored' },
          ].map((stat) => (
            <div key={stat.label} className="text-center lg:text-left">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent">
                {stat.value}
              </p>
              <p className="text-sm text-white/70 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Slideshow Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'w-6 bg-accent' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
