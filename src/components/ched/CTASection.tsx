'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Phone, FileText, Users, HelpCircle } from 'lucide-react';

const quickLinks = [
  {
    icon: Phone,
    title: 'Report an Issue',
    description: 'Contact your regional office for farm-related issues',
    href: '#contact',
    color: 'bg-blue-500',
  },
  {
    icon: FileText,
    title: 'Request Service',
    description: 'Submit a request for extension services',
    href: '#contact',
    color: 'bg-green-500',
  },
  {
    icon: Users,
    title: 'Partner with Us',
    description: 'Explore collaboration opportunities',
    href: '#partnership',
    color: 'bg-amber-500',
  },
  {
    icon: HelpCircle,
    title: 'Get Support',
    description: 'Find answers to common questions',
    href: '#contact',
    color: 'bg-purple-500',
  },
];

export default function CTASection() {
  return (
    <section className="py-16 lg:py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Whether you&apos;re a cocoa farmer seeking assistance or an organization 
            looking to partner with us, we&apos;re here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent/90 transition-colors"
            >
              Contact Us Today
              <ArrowRight size={18} />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              View Our Services
            </a>
          </div>
        </motion.div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link, index) => (
            <motion.a
              key={link.title}
              href={link.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group flex items-start gap-4 p-5 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
            >
              <div className={`w-10 h-10 ${link.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <link.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white group-hover:text-accent transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-white/70 mt-1">
                  {link.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
