'use client';

import { motion, AnimatePresence } from 'framer-motion';
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

// Animation variants
const textVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    filter: 'blur(10px)'
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      mass: 1
    }
  },
  exit: {
    opacity: 0,
    y: -30,
    filter: 'blur(8px)',
    transition: {
      duration: 0.4,
      ease: 'easeInOut'
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const statsVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    y: 20
  },
  visible: (i: number) => ({ 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 12,
      delay: i * 0.1
    }
  })
};

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    
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
      {/* Background Images Slideshow with Ken Burns Effect */}
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          initial={false}
          animate={{ 
            opacity: index === currentSlide ? 1 : 0,
            scale: index === currentSlide ? 1.05 : 1
          }}
          transition={{ 
            opacity: { duration: 1.2, ease: 'easeInOut' },
            scale: { duration: 8, ease: 'linear' }
          }}
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

      {/* Animated particles/decoration */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent/20 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.span
                variants={textVariants}
                className="inline-block px-4 py-1.5 bg-accent/20 text-accent text-sm font-semibold rounded-full mb-6 backdrop-blur-sm border border-accent/10"
              >
                Ghana Cocoa Board
              </motion.span>

              <motion.h1
                variants={textVariants}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6"
              >
                {slides[currentSlide].title}
                <span className="block text-accent mt-2">{slides[currentSlide].subtitle}</span>
              </motion.h1>

              <motion.p
                variants={textVariants}
                className="text-lg sm:text-xl text-white/90 mb-10 max-w-xl leading-relaxed"
              >
                {slides[currentSlide].description}
              </motion.p>

              <motion.div
                variants={textVariants}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="/operations"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-primary font-semibold rounded-xl hover:bg-accent/90 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5"
                >
                  Our Services
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="/about"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 backdrop-blur-sm hover:-translate-y-0.5"
                >
                  Learn More
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Stats with animated counter */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 0.8,
            type: 'spring',
            stiffness: 80,
            damping: 15
          }}
          className="mt-16 lg:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {[
            { value: '50+', label: 'Years of Service' },
            { value: '800K+', label: 'Farmers Supported' },
            { value: '14', label: 'Regions Covered' },
            { value: '1M+', label: 'Hectares Monitored' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={statsVariants}
              initial="hidden"
              animate="visible"
              className="text-center lg:text-left group"
            >
              <motion.p
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                {stat.value}
              </motion.p>
              <p className="text-sm text-white/70 mt-1 group-hover:text-white/90 transition-colors">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Slideshow Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevSlide}
            className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </motion.button>
          
          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="relative overflow-hidden"
                aria-label={`Go to slide ${index + 1}`}
              >
                <motion.div
                  className={`rounded-full transition-all ${
                    index === currentSlide 
                      ? 'w-8 h-2.5 bg-accent' 
                      : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/60'
                  }`}
                  layout
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                />
              </button>
            ))}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextSlide}
            className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-xs uppercase tracking-widest rotate-90 origin-center translate-y-8">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
