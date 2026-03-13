'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Target, Eye, Heart, Shield, Leaf, Users, Lightbulb, CheckCircle } from 'lucide-react';
import Image from 'next/image';

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

export default function AboutSection() {
  return (
    <section id="about" className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[350px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/about-profile.png"
                alt="Cocoa farming in Ghana"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-primary/10 to-transparent" />
            </div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-6 -right-6 lg:right-6 bg-white rounded-xl shadow-xl p-5 sm:p-6 border border-border"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Heart className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-primary">800K+</p>
                  <p className="text-sm text-muted-foreground">Farmers Supported</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              Who We Are
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Empowering Cocoa Farmers Since 1945
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              The Cocoa Health and Extension Division (CHED) is a specialized division of Ghana Cocoa Board,
              established to ensure sustainable cocoa production through innovative extension services.
              We work directly with farming communities across all cocoa-growing regions of Ghana.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our team of dedicated extension officers provides hands-on support, training, and resources
              to help farmers improve their yields, manage pests and diseases, and adopt sustainable
              farming practices that protect both their livelihoods and the environment.
            </p>

            {/* Mission & Vision */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-muted/30 rounded-xl p-4 border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Our Mission</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  To provide quality extension services for sustainable cocoa production.
                </p>
              </div>
              <div className="bg-muted/30 rounded-xl p-4 border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Eye className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Our Vision</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  A thriving cocoa industry with empowered farming communities.
                </p>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Learn More About Us
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4">
              Our Values
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              What Drives Us Forward
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group bg-muted/30 rounded-xl p-6 border border-border hover:border-primary/20 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-primary via-primary to-primary/90 rounded-3xl overflow-hidden"
        >
          <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
            <div>
              <span className="inline-block px-3 py-1 bg-white/10 text-white text-sm font-medium rounded-full mb-4">
                What We Do
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Our Services & Programs
              </h2>
              <p className="text-white/80 mb-6">
                CHED provides comprehensive support to cocoa farmers through various programs
                designed to improve productivity and ensure sustainable farming practices.
              </p>
              <Link
                href="/operations"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent/90 transition-colors"
              >
                View All Operations
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {services.map((service, index) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3 backdrop-blur-sm"
                >
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-white text-sm font-medium">{service}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
