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
    <section id="about" className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4"
          >
            About Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4"
          >
            Transforming Ghana&apos;s Cocoa Industry
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="text-muted-foreground max-w-2xl mx-auto"
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
          className="bg-white rounded-2xl shadow-md p-6 lg:p-8 mb-12"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-2xl lg:text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* About Links */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {aboutLinks.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <Link href={link.href} className="group block h-full">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all h-full border border-transparent hover:border-primary/20">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <link.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{link.description}</p>
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Learn More About Us
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
