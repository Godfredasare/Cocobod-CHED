'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Target, Eye, Heart, Shield, Leaf, Users, Lightbulb, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

const values = [
  {
    icon: Shield,
    title: 'Integrity',
    description: 'We uphold the highest standards of honesty and transparency in all our operations.',
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    description: 'Committed to environmentally responsible practices for future generations.',
  },
  {
    icon: Users,
    title: 'Farmer-Centric',
    description: 'Every decision we make prioritizes the welfare of cocoa farmers.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Embracing modern techniques to improve cocoa production and farmer livelihoods.',
  },
];

const services = [
  'Extension Services & Farmer Education',
  'Disease & Pest Control Programs',
  'Cocoa Rehabilitation Initiatives',
  'Technical Training & Capacity Building',
  'Farm Management Support',
  'Youth in Cocoa Development',
];

// Animation variants
const slideIn = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 60,
      damping: 15,
      mass: 1
    }
  }
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 60,
      damping: 15,
      mass: 1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const cardHover = {
  rest: { 
    scale: 1,
    y: 0
  },
  hover: { 
    scale: 1.02,
    y: -5,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 20
    }
  }
};

export default function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} id="about" className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Left - Image with parallax effect */}
          <motion.div
            variants={slideIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            <motion.div
              className="relative h-[350px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Image
                src="/images/about-profile.png"
                alt="Cocoa farming in Ghana"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-primary/10 to-transparent" />
              
              {/* Decorative elements */}
              <motion.div
                className="absolute top-4 left-4 w-20 h-20 border-2 border-white/20 rounded-xl"
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute bottom-4 right-4 w-16 h-16 border-2 border-accent/30 rounded-full"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 40, x: 20 }}
              animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 40, x: 20 }}
              transition={{ 
                delay: 0.4,
                type: 'spring',
                stiffness: 80,
                damping: 12
              }}
              className="absolute -bottom-6 -right-6 lg:right-6 bg-white rounded-2xl shadow-2xl p-6 border border-border"
              whileHover={{ 
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
              }}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Heart className="w-7 h-7 text-primary" />
                </motion.div>
                <div>
                  <motion.p 
                    className="text-2xl sm:text-3xl font-bold text-primary"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    800K+
                  </motion.p>
                  <p className="text-sm text-muted-foreground">Farmers Supported</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4"
            >
              Who We Are
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight"
            >
              Empowering Cocoa Farmers Since{' '}
              <span className="text-primary relative">
                1945
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-accent rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                />
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg mb-6 leading-relaxed"
            >
              The Cocoa Health and Extension Division (CHED) is a specialized division of Ghana Cocoa Board,
              established to ensure sustainable cocoa production through innovative extension services.
              We work directly with farming communities across all cocoa-growing regions of Ghana.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground mb-8 leading-relaxed"
            >
              Our team of dedicated extension officers provides hands-on support, training, and resources
              to help farmers improve their yields, manage pests and diseases, and adopt sustainable
              farming practices that protect both their livelihoods and the environment.
            </motion.p>

            {/* Mission & Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
              className="grid sm:grid-cols-2 gap-4 mb-8"
            >
              {[
                { icon: Target, title: 'Our Mission', text: 'To provide quality extension services for sustainable cocoa production.' },
                { icon: Eye, title: 'Our Vision', text: 'A thriving cocoa industry with empowered farming communities.' }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index === 0 ? -20 : 20 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -3, boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.1)" }}
                  className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl p-5 border border-border transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
              >
                Learn More About Us
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-20"
        >
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-sm font-semibold rounded-full mb-4">
              Our Values
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              What Drives Us Forward
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={scaleIn}
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="group"
              >
                <motion.div
                  variants={cardHover}
                  className="bg-gradient-to-br from-muted/40 to-muted/20 rounded-2xl p-6 border border-border hover:border-primary/30 transition-all h-full"
                >
                  <motion.div
                    className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-5"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <value.icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: 'spring', stiffness: 60, damping: 15 }}
          className="bg-gradient-to-br from-primary via-primary to-primary/95 rounded-3xl overflow-hidden relative"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -top-20 -right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
          </div>

          <div className="relative grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1.5 bg-white/10 text-white text-sm font-semibold rounded-full mb-6 backdrop-blur-sm">
                What We Do
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
                Our Services & Programs
              </h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                CHED provides comprehensive support to cocoa farmers through various programs
                designed to improve productivity and ensure sustainable farming practices.
              </p>
              <Link
                href="/operations"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary font-semibold rounded-xl hover:bg-accent/90 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
              >
                View All Operations
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-3"
            >
              {services.map((service, index) => (
                <motion.div
                  key={service}
                  variants={{
                    hidden: { opacity: 0, x: 20, y: 10 },
                    visible: { 
                      opacity: 1, 
                      x: 0, 
                      y: 0,
                      transition: {
                        type: 'spring',
                        stiffness: 100,
                        damping: 12
                      }
                    }
                  }}
                  whileHover={{ 
                    x: 5, 
                    backgroundColor: "rgba(255,255,255,0.2)"
                  }}
                  className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3.5 backdrop-blur-sm border border-white/5 cursor-default"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, type: 'spring', stiffness: 400 }}
                  >
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  </motion.div>
                  <span className="text-white text-sm font-medium">{service}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
