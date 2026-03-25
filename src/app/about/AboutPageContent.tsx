'use client';

import { motion } from 'framer-motion';
import { Users, MapPin, Award, Target, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/ched/Header';
import Footer from '@/components/ched/Footer';

const stats = [
  { 
    icon: Users, 
    value: '800,000+', 
    label: 'Farmers Supported',
    description: 'Direct support to cocoa farming communities'
  },
  { 
    icon: MapPin, 
    value: '14', 
    label: 'Regions Covered',
    description: 'Nationwide presence across Ghana'
  },
  { 
    icon: Award, 
    value: '50+', 
    label: 'Years of Excellence',
    description: 'Decades of dedicated service'
  },
  { 
    icon: Target, 
    value: '95%', 
    label: 'Success Rate',
    description: 'In disease control programs'
  },
];

const timeline = [
  { year: '1970s', title: 'Establishment', description: 'CHED was established as a specialized division of Ghana Cocoa Board.' },
  { year: '1980s', title: 'Expansion', description: 'Extended operations to all cocoa-growing regions in Ghana.' },
  { year: '1990s', title: 'CSSVD Control', description: 'Launched major cocoa swollen shoot virus disease control programs.' },
  { year: '2000s', title: 'Modernization', description: 'Introduced modern extension services and farmer education programs.' },
  { year: '2010s', title: 'Rehabilitation', description: 'Scaled up cocoa rehabilitation programs across the country.' },
  { year: '2020s', title: 'Innovation', description: 'Embracing digital tools and sustainable farming practices.' },
];

export default function AboutPageContent() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Banner */}
      <section className="pt-24 pb-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              About Us
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              About CHED
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learn about our mission, history, and commitment to Ghana&apos;s cocoa industry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-muted/30 p-6 rounded-xl border border-border"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-2xl lg:text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="font-semibold text-foreground mt-1">{stat.label}</p>
                <p className="text-sm text-muted-foreground mt-2">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-xl border border-border"
            >
              <h2 className="text-xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground">
                To provide efficient and effective extension services that empower 
                cocoa farmers with knowledge and skills for sustainable production, 
                while controlling diseases and pests that threaten cocoa farms.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-xl border border-border"
            >
              <h2 className="text-xl font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground">
                A thriving Ghanaian cocoa industry where farmers are empowered with 
                knowledge, technology, and resources to produce premium quality cocoa 
                beans sustainably and profitably.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Objectives */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Core Objectives</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Control and manage cocoa diseases and pests',
              'Rehabilitate diseased and aged cocoa farms',
              'Educate farmers on best practices',
              'Improve cocoa yield and quality',
              'Ensure sustainable cocoa production',
              'Support farmer livelihoods'
            ].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg"
              >
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-foreground">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Our Journey</h2>
            <p className="text-muted-foreground">Key milestones in CHED&apos;s history</p>
          </div>
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex gap-4 p-6 bg-white rounded-xl border border-border"
              >
                <div className="w-20 flex-shrink-0 text-primary font-bold">{item.year}</div>
                <div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Want to Learn More?
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Explore our management team, operations, and partnership opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/management"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent/90 transition-colors"
            >
              Meet Our Team
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/operations"
              className="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              Our Operations
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
