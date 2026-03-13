'use client';

import { motion } from 'framer-motion';
import { Handshake, Building2, Globe, Users, ArrowRight, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/ched/Header';
import Footer from '@/components/ched/Footer';
import partnershipData from '@/data/partnership.json';

const iconMap = {
  Handshake: Handshake,
  Building2: Building2,
  Globe: Globe,
  Users: Users,
};

export default function PartnershipPageContent() {
  const { partners, benefits } = partnershipData;

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
              Collaboration
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Partnerships
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We collaborate with local and international organizations to strengthen 
              Ghana&apos;s cocoa industry and improve farmer livelihoods.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Benefits of Partnership
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = iconMap[benefit.icon as keyof typeof iconMap] || LinkIcon;
              
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="text-center p-6 bg-muted/30 rounded-xl"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partners List */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Our Partners
            </h2>
            <p className="text-muted-foreground">
              Organizations we work with to achieve our mission
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="p-5 bg-white rounded-xl border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <h4 className="font-medium text-foreground">{partner.name}</h4>
                    <p className="text-xs text-primary mt-1">{partner.type}</p>
                  </div>
                  <p className="text-sm text-muted-foreground sm:text-right sm:max-w-xs">
                    {partner.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Partner */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Become a Partner
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Interested in partnering with CHED? We welcome collaborations that align 
            with our mission to support Ghana&apos;s cocoa farmers.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent/90 transition-colors"
          >
            Contact Us
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
