'use client';

import { motion } from 'framer-motion';
import { MapPin, Users, Leaf, Building, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/ched/Header';
import Footer from '@/components/ched/Footer';
import operationsData from '@/data/operations.json';

const iconMap = {
  Leaf: Leaf,
  Users: Users,
  Building: Building,
};

export default function OperationsPageContent() {
  const { keyStats, programs, regions } = operationsData;

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Banner */}
      <section className="relative pt-28 pb-16 bg-gradient-to-br from-primary via-primary to-primary/95 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-5 py-2 bg-accent/20 text-accent text-sm font-semibold rounded-full mb-6 backdrop-blur-sm border border-accent/10">
              Our Work
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Operations
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Our operations span across all cocoa-growing regions of Ghana, providing
              comprehensive support services to farming communities.
            </p>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="relative -mt-10 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-border"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {keyStats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 bg-gradient-to-br from-muted/40 to-muted/20 rounded-2xl group cursor-default hover:scale-[1.02] transition-transform"
                >
                  <p className="text-3xl lg:text-4xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2 group-hover:text-foreground transition-colors">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true, margin: '-50px' }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Key Programs
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive initiatives designed to support cocoa farmers across Ghana
            </p>
          </motion.div>

          <div className="space-y-6">
            {programs.map((program) => {
              const IconComponent = iconMap[program.icon as keyof typeof iconMap] || Leaf;

              return (
                <div
                  key={program.id}
                  className="bg-white p-6 lg:p-8 rounded-2xl border border-border shadow-sm hover:scale-[1.02] transition-transform"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-3">{program.title}</h3>
                      <p className="text-muted-foreground text-lg leading-relaxed">{program.description}</p>
                      <div className="grid grid-cols-3 gap-4 mt-6">
                        {program.stats.map((stat) => (
                          <div
                            key={stat.label}
                            className="text-center p-4 bg-gradient-to-br from-muted/40 to-muted/20 rounded-xl hover:scale-[1.02] transition-transform"
                          >
                            <p className="text-xl font-bold text-primary">{stat.value}</p>
                            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Regional Coverage */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true, margin: '-50px' }}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <MapPin className="w-8 h-8 text-primary" />
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Regional Coverage
              </h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              CHED operates in all major cocoa-growing regions across Ghana
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {regions.map((region) => (
              <div
                key={region.name}
                className="p-6 bg-gradient-to-br from-muted/40 to-muted/20 rounded-2xl border border-border hover:scale-[1.02] transition-transform"
              >
                <h4 className="font-semibold text-lg text-foreground mb-4">{region.name}</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Farmers</span>
                    <span className="font-semibold text-foreground">{region.farmers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Offices</span>
                    <span className="font-semibold text-foreground">{region.offices}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Districts</span>
                    <span className="font-semibold text-foreground">{region.districts}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary/95 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-5"
          >
            Explore Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-white/80 text-lg mb-8 max-w-xl mx-auto"
          >
            Learn more about the specific services we offer to cocoa farmers.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Link
              href="/partnership"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-primary font-semibold rounded-xl hover:bg-accent/90 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
            >
              Our Partners
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
