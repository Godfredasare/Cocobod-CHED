'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Building2, ArrowRight } from 'lucide-react';
import Header from '@/components/ched/Header';
import Footer from '@/components/ched/Footer';
import regionsData from '@/data/regions.json';
import Link from 'next/link';

interface Region {
  name: string;
  location: string;
  digitalAddress: string;
  tel: string[];
  fax?: string[];
  email: string;
  isHeadquarters?: boolean;
  isCollege?: boolean;
}

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
      delay: i * 0.06
    }
  }),
  hover: {
    y: -8,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 20
    }
  }
};

export default function RegionsPage() {
  const { regions, coverageAreas } = regionsData;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-primary" />
          <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/90" />
          
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
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                About CHED
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              >
                Regional Offices
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-white/90 leading-relaxed"
              >
                Find our offices across Ghana's cocoa-growing regions for accessible extension services and support.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 80, damping: 15 }}
              className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-border"
            >
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center"
                >
                  <MapPin className="w-8 h-8 text-primary" />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Coverage Area</h2>
                  <p className="text-muted-foreground text-lg">Serving all cocoa-growing regions across Ghana</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {coverageAreas.map((region, i) => (
                  <motion.div
                    key={region}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                    whileHover={{ y: -3, scale: 1.02 }}
                    className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 text-center border border-primary/10"
                  >
                    <p className="text-sm font-semibold text-foreground">{region}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Regional Offices Grid */}
        <section className="py-20 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Our Regional Offices
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Contact any of our regional offices for extension services, farmer support, and cocoa health interventions.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {regions.map((region: Region, index: number) => (
                <motion.div
                  key={region.name}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, margin: "-20px" }}
                  className={`relative bg-white rounded-2xl shadow-md overflow-hidden border border-border ${
                    region.isHeadquarters ? 'ring-2 ring-accent' : ''
                  }`}
                >
                  {/* Header */}
                  <div className={`p-6 ${region.isHeadquarters ? 'bg-gradient-to-r from-primary to-primary/90 text-white' : region.isCollege ? 'bg-gradient-to-r from-green-700 to-green-600 text-white' : 'bg-gradient-to-r from-primary/10 to-primary/5'}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        {region.isHeadquarters && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-block px-3 py-1 bg-accent text-primary text-xs font-bold rounded-full mb-2"
                          >
                            HEADQUARTERS
                          </motion.span>
                        )}
                        {region.isCollege && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full mb-2 backdrop-blur-sm"
                          >
                            TRAINING INSTITUTE
                          </motion.span>
                        )}
                        <h3 className="text-lg font-bold">{region.name}</h3>
                      </div>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        region.isHeadquarters || region.isCollege ? 'bg-white/20 backdrop-blur-sm' : 'bg-primary/10'
                      }`}>
                        <Building2 className={`w-6 h-6 ${region.isHeadquarters || region.isCollege ? 'text-white' : 'text-primary'}`} />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    {/* Location */}
                    <motion.div 
                      className="flex items-start gap-3"
                      whileHover={{ x: 3 }}
                    >
                      <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{region.location}</p>
                        <p className="text-xs text-muted-foreground">Digital Address: {region.digitalAddress}</p>
                      </div>
                    </motion.div>

                    {/* Phone */}
                    <motion.div 
                      className="flex items-start gap-3"
                      whileHover={{ x: 3 }}
                    >
                      <Phone className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-foreground">
                          {region.tel.map((t, i) => (
                            <span key={i}>
                              {t}{i < region.tel.length - 1 ? ' | ' : ''}
                            </span>
                          ))}
                        </p>
                        {region.fax && (
                          <p className="text-xs text-muted-foreground">
                            Fax: {region.fax.join(' | ')}
                          </p>
                        )}
                      </div>
                    </motion.div>

                    {/* Email */}
                    <motion.div 
                      className="flex items-center gap-3"
                      whileHover={{ x: 3 }}
                    >
                      <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                      <a href={`mailto:${region.email}`} className="text-sm text-primary hover:underline font-medium">
                        {region.email}
                      </a>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary/95 relative overflow-hidden">
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

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 80, damping: 15 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
                Need Assistance?
              </h2>
              <p className="text-white/90 text-lg mb-8 leading-relaxed">
                Our team across all regional offices is ready to support cocoa farmers with extension 
                services, disease control, and productivity enhancement programs.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-primary font-semibold rounded-xl hover:bg-accent/90 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
              >
                Contact Us
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
