'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Users, MapPin, Award, Target, ArrowRight, Building, Briefcase } from 'lucide-react';

const stats = [
  { 
    icon: Users, 
    value: '800K+', 
    label: 'Farmers Supported',
  },
  { 
    icon: MapPin, 
    value: '14', 
    label: 'Regions Covered',
  },
  { 
    icon: Award, 
    value: '50+', 
    label: 'Years of Service',
  },
  { 
    icon: Target, 
    value: '1M+', 
    label: 'Hectares Monitored',
  },
];

const aboutLinks = [
  {
    title: 'Company Profile',
    description: 'Our history, vision, mission & values',
    href: '/about/company-profile',
    icon: Building,
  },
  {
    title: 'Departments',
    description: 'Organizational structure & functions',
    href: '/about/departments',
    icon: Briefcase,
  },
  {
    title: 'Regional Offices',
    description: 'Locations across cocoa-growing regions',
    href: '/about/regions',
    icon: MapPin,
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-6"
          >
            About Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6"
          >
            Transforming Ghana&apos;s Cocoa Industry
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed"
          >
            The Cocoa Health and Extension Division (CHED) is a specialized division 
            of Ghana Cocoa Board, dedicated to ensuring sustainable cocoa production 
            through innovative extension services since 1945.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-gradient-to-br from-primary to-primary/90 rounded-3xl p-8 lg:p-10 mb-16 shadow-xl"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-3xl lg:text-4xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-white/70 mt-2 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* About Links */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {aboutLinks.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <Link href={link.href} className="group block h-full">
                <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all h-full border border-border hover:border-primary/30 hover:-translate-y-1 duration-300">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                    <link.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{link.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn More <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
          >
            Learn More About Us
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
