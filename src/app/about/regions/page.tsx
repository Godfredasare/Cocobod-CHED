'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Building2 } from 'lucide-react';
import Header from '@/components/ched/Header';
import Footer from '@/components/ched/Footer';
import regionsData from '@/data/regions.json';

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
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent text-sm font-medium rounded-full mb-6">
                About CHED
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Regional Offices
              </h1>
              <p className="text-lg text-white/80">
                Find our offices across Ghana's cocoa-growing regions for accessible extension services and support.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-6 lg:p-8 shadow-md"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Coverage Area</h2>
                  <p className="text-muted-foreground text-sm">Serving all cocoa-growing regions across Ghana</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {coverageAreas.map((region) => (
                  <div
                    key={region}
                    className="bg-primary/5 rounded-lg p-3 text-center"
                  >
                    <p className="text-sm font-medium text-foreground">{region}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Regional Offices Grid */}
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Our Regional Offices
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Contact any of our regional offices for extension services, farmer support, and cocoa health interventions.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {regions.map((region: Region, index: number) => (
                <motion.div
                  key={region.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 * index }}
                  className={`relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
                    region.isHeadquarters ? 'ring-2 ring-accent' : ''
                  }`}
                >
                  {/* Header */}
                  <div className={`p-6 ${region.isHeadquarters ? 'bg-primary text-white' : region.isCollege ? 'bg-green-700 text-white' : 'bg-primary/5'}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        {region.isHeadquarters && (
                          <span className="inline-block px-2 py-1 bg-accent text-primary text-xs font-bold rounded mb-2">
                            HEADQUARTERS
                          </span>
                        )}
                        {region.isCollege && (
                          <span className="inline-block px-2 py-1 bg-white/20 text-white text-xs font-bold rounded mb-2">
                            TRAINING INSTITUTE
                          </span>
                        )}
                        <h3 className="text-lg font-bold">{region.name}</h3>
                      </div>
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        region.isHeadquarters || region.isCollege ? 'bg-white/20' : 'bg-primary/10'
                      }`}>
                        <Building2 className={`w-5 h-5 ${region.isHeadquarters || region.isCollege ? 'text-white' : 'text-primary'}`} />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    {/* Location */}
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{region.location}</p>
                        <p className="text-xs text-muted-foreground">Digital Address: {region.digitalAddress}</p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-3">
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
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                      <a href={`mailto:${region.email}`} className="text-sm text-primary hover:underline">
                        {region.email}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Need Assistance?
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8">
                Our team across all regional offices is ready to support cocoa farmers with extension 
                services, disease control, and productivity enhancement programs.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary font-semibold rounded-lg hover:bg-accent/90 transition-colors"
              >
                Contact Us
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
