'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Building, Users, MapPin } from 'lucide-react';
import Header from '@/components/ched/Header';
import Footer from '@/components/ched/Footer';
import { useRef } from 'react';

const aboutCards = [
  {
    title: 'Company Profile',
    description: 'Learn about our rich history, vision, mission, and core values that guide our commitment to Ghana\'s cocoa industry.',
    href: '/about/company-profile',
    icon: Building,
    image: '/images/about-profile.png',
  },
  {
    title: 'Departments',
    description: 'Explore our organizational structure and the various departments working together to support cocoa farmers.',
    href: '/about/departments',
    icon: Users,
    image: '/images/about-dept.png',
  },
  {
    title: 'Regional Offices',
    description: 'Find our regional and district offices across Ghana\'s cocoa-growing regions for accessible extension services.',
    href: '/about/regions',
    icon: MapPin,
    image: '/images/about-regions.png',
  },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
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
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 20
    }
  }
};

export default function AboutPage() {
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-50px" });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-primary" />
          <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/90" />
          
          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-accent/20 rounded-full"
                style={{
                  left: `${10 + i * 20}%`,
                  top: `${30 + (i % 2) * 40}%`,
                }}
                animate={{
                  y: [0, -20, 0],
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
                Cocoa Health and{' '}
                <span className="text-accent">Extension Division</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-white/90 leading-relaxed"
              >
                A subsidiary of Ghana Cocoa Board, dedicated to ensuring sustainable cocoa production 
                through innovative extension services and farmer education since 1945.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Quick Stats */}
        <section ref={statsRef} className="relative -mt-12 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 80, damping: 15 }}
              className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                {[
                  { value: '1945', label: 'Established' },
                  { value: '800K+', label: 'Farmers Supported' },
                  { value: '14', label: 'Regions Covered' },
                  { value: '9', label: 'Regional Offices' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center group cursor-default"
                  >
                    <motion.p
                      className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary"
                      whileHover={{ scale: 1.1 }}
                    >
                      {stat.value}
                    </motion.p>
                    <p className="text-sm text-muted-foreground mt-2 group-hover:text-foreground transition-colors">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Cards */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Explore Our Organization
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Discover more about who we are, how we operate, and where we serve across Ghana.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-7 lg:gap-8">
              {aboutCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, margin: "-30px" }}
                >
                  <Link href={card.href} className="group block h-full">
                    <div className="relative bg-white rounded-2xl overflow-hidden shadow-md h-full border border-border">
                      {/* Image */}
                      <div className="relative h-52 bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            <card.icon className="w-24 h-24 text-primary/20" />
                          </motion.div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                        
                        {/* Animated corner accent */}
                        <motion.div
                          className="absolute top-4 right-4 w-12 h-12 border-2 border-primary/20 rounded-xl"
                          animate={{ rotate: [0, 5, 0, -5, 0] }}
                          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {card.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                          {card.description}
                        </p>
                        <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                          Learn More
                          <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Brief History */}
        <section className="py-20 bg-muted/50 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: 'spring', stiffness: 60, damping: 15 }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                  Our History
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-lg">
                  The Cocoa Health and Extension Division (CHED) of Ghana Cocoa Board, formerly CSSVD 
                  and Cocoa Services Division, has had a remarkable journey since its establishment in 1945.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The Cocoa Swollen Shoot Virus Disease (CSSVD) was first reported in the 1930s in the 
                  Eastern Region and has since spread throughout the cocoa growing regions in the country. 
                  The government set up the Cocoa Division as a Unit under the then Department of Agriculture 
                  to control the CSSVD and cocoa pests.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  In April 2014, the CSSVD-CU was upgraded to a Division and renamed the Cocoa Health 
                  and Extension Division with expanded mandates to serve Ghana's cocoa farmers better.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: 'spring', stiffness: 60, damping: 15, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-6">
                    Key Milestones
                  </h3>
                  <div className="space-y-4">
                    {[
                      { year: '1945', event: 'Cocoa Division established under Department of Agriculture' },
                      { year: '1964', event: 'Cocoa Division reconstituted after brief dissolution' },
                      { year: '1972', event: 'Renamed Cocoa Production Division under Ministry of Cocoa Affairs' },
                      { year: '1985', event: 'Renamed Cocoa Services Division (CSD) with three core functions' },
                      { year: '2001', event: 'CSSVD Control Unit and Seed Production Unit created' },
                      { year: '2010', event: 'Public Private Partnership in Cocoa Extension launched' },
                      { year: '2014', event: 'Upgraded to Cocoa Health and Extension Division (CHED)' },
                    ].map((milestone, index) => (
                      <motion.div
                        key={milestone.year}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ x: 5 }}
                        className="flex gap-4 group cursor-default"
                      >
                        <div className="flex-shrink-0 w-16">
                          <span className="text-sm font-bold text-accent group-hover:text-primary transition-colors">
                            {milestone.year}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {milestone.event}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
