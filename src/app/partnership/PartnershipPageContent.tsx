'use client';

import { motion, useInView } from 'framer-motion';
import { Handshake, Building2, Globe, Users, ArrowRight, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/ched/Header';
import Footer from '@/components/ched/Footer';
import partnershipData from '@/data/partnership.json';
import { useRef } from 'react';

const iconMap = {
  Handshake: Handshake,
  Building2: Building2,
  Globe: Globe,
  Users: Users,
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
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
      delay: i * 0.08
    }
  }),
  hover: {
    y: -5,
    boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.1)",
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 20
    }
  }
};

const partnerVariants = {
  hidden: { 
    opacity: 0, 
    x: -20,
    scale: 0.98
  },
  visible: (i: number) => ({ 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 12,
      delay: i * 0.05
    }
  }),
  hover: {
    x: 5,
    borderColor: "rgba(22, 101, 52, 0.3)",
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 20
    }
  }
};

export default function PartnershipPageContent() {
  const { partners, benefits } = partnershipData;
  const ctaRef = useRef(null);
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-50px" });

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Banner */}
      <section className="relative pt-28 pb-16 bg-gradient-to-br from-primary via-primary to-primary/95 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-20 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          
          {/* Floating particles */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-accent/20 rounded-full"
              style={{
                left: `${15 + i * 25}%`,
                top: `${25 + (i % 2) * 50}%`,
              }}
              animate={{
                y: [0, -15, 0],
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 80, damping: 15 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-block px-5 py-2 bg-accent/20 text-accent text-sm font-semibold rounded-full mb-6 backdrop-blur-sm border border-accent/10"
            >
              Collaboration
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Partnerships
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-white/90 leading-relaxed"
            >
              We collaborate with local and international organizations to strengthen 
              Ghana&apos;s cocoa industry and improve farmer livelihoods.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Benefits of Partnership
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Why organizations choose to collaborate with CHED
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = iconMap[benefit.icon as keyof typeof iconMap] || LinkIcon;
              
              return (
                <motion.div
                  key={benefit.title}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, margin: "-30px" }}
                  className="text-center p-8 bg-gradient-to-br from-muted/40 to-muted/20 rounded-2xl border border-border"
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  >
                    <IconComponent className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h3 className="font-semibold text-lg text-foreground mb-3">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partners List */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Partners
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Organizations we work with to achieve our mission
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                custom={index}
                variants={partnerVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, margin: "-20px" }}
                className="p-6 bg-white rounded-2xl border border-border"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-lg text-foreground">{partner.name}</h4>
                    <p className="text-sm text-primary font-medium mt-1">{partner.type}</p>
                  </div>
                  <p className="text-sm text-muted-foreground sm:text-right sm:max-w-xs leading-relaxed">
                    {partner.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Partner CTA */}
      <section ref={ctaRef} className="py-20 bg-gradient-to-br from-primary via-primary to-primary/95 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-0 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-5"
          >
            Become a Partner
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-lg mb-8 max-w-xl mx-auto leading-relaxed"
          >
            Interested in partnering with CHED? We welcome collaborations that align 
            with our mission to support Ghana&apos;s cocoa farmers.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-primary font-semibold rounded-xl hover:bg-accent/90 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
            >
              Contact Us
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
