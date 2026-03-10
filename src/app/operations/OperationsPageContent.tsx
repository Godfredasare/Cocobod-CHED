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
      <section className="pt-24 pb-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              Our Work
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Operations
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our operations span across all cocoa-growing regions of Ghana, providing 
              comprehensive support services to farming communities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {keyStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="text-center p-5 bg-muted/30 rounded-xl"
              >
                <p className="text-2xl lg:text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Our Key Programs
            </h2>
          </div>
          
          <div className="space-y-8">
            {programs.map((program, index) => {
              const IconComponent = iconMap[program.icon as keyof typeof iconMap] || Leaf;
              
              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white p-6 lg:p-8 rounded-xl border border-border"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center">
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-2">{program.title}</h3>
                      <p className="text-muted-foreground">{program.description}</p>
                      <div className="grid grid-cols-3 gap-4 mt-6">
                        {program.stats.map((stat) => (
                          <div key={stat.label} className="text-center p-3 bg-muted/30 rounded-lg">
                            <p className="text-lg font-bold text-primary">{stat.value}</p>
                            <p className="text-xs text-muted-foreground">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Regional Coverage */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                Regional Coverage
              </h2>
            </div>
            <p className="text-muted-foreground">
              CHED operates in all major cocoa-growing regions across Ghana
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {regions.map((region, index) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="p-5 bg-muted/30 rounded-xl border border-border"
              >
                <h4 className="font-medium text-foreground mb-3">{region.name}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Farmers</span>
                    <span className="font-medium text-foreground">{region.farmers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Offices</span>
                    <span className="font-medium text-foreground">{region.offices}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Districts</span>
                    <span className="font-medium text-foreground">{region.districts}</span>
                  </div>
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
            Explore Our Services
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Learn more about the specific services we offer to cocoa farmers.
          </p>
          <Link
            href="/partnership"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent/90 transition-colors"
          >
            Our Partners
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
