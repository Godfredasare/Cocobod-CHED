'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Building2, ArrowRight } from 'lucide-react';
import Header from '@/components/ched/Header';
import Footer from '@/components/ched/Footer';
import regionsData from '@/data/regions.json';
import Link from 'next/link';

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
          <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/90" />

          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-5 py-2 bg-accent/20 text-accent text-sm font-semibold rounded-full mb-6 backdrop-blur-sm border border-accent/10">
                About CHED
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Regional Offices
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Find our offices across Ghana's cocoa-growing regions for accessible extension services and support.
              </p>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-border"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Coverage Area</h2>
                  <p className="text-muted-foreground text-lg">Serving all cocoa-growing regions across Ghana</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {coverageAreas.map((region) => (
                  <div
                    key={region}
                    className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 text-center border border-primary/10 hover:scale-[1.02] transition-transform"
                  >
                    <p className="text-sm font-semibold text-foreground">{region}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Regional Offices Grid */}
        <section className="py-20 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Our Regional Offices
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Contact any of our regional offices for extension services, farmer support, and cocoa health interventions.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {regions.map((region: Region) => (
                <div
                  key={region.name}
                  className={`relative bg-white rounded-2xl shadow-md overflow-hidden border border-border hover:scale-[1.02] transition-transform ${
                    region.isHeadquarters ? 'ring-2 ring-accent' : ''
                  }`}
                >
                  {/* Header */}
                  <div className={`p-6 ${region.isHeadquarters ? 'bg-gradient-to-r from-primary to-primary/90 text-white' : region.isCollege ? 'bg-gradient-to-r from-green-700 to-green-600 text-white' : 'bg-gradient-to-r from-primary/10 to-primary/5'}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        {region.isHeadquarters && (
                          <span className="inline-block px-3 py-1 bg-accent text-primary text-xs font-bold rounded-full mb-2">
                            HEADQUARTERS
                          </span>
                        )}
                        {region.isCollege && (
                          <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full mb-2 backdrop-blur-sm">
                            TRAINING INSTITUTE
                          </span>
                        )}
                        <h3 className="text-lg font-bold">{region.name}</h3>
                      </div>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        region.isHeadquarters || region.isCollege ? 'bg-white/20 backdrop-blur-sm' : 'bg-primary/10'
                      }`}>
                        <Building2 className={`w-6 h-6 ${region.isHeadquarters || region.isCollege ? 'text-white' : 'text-primary'}`} />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    {/* Location */}
                    <div className="flex items-start gap-3 hover:translate-x-0.5 transition-transform">
                      <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{region.location}</p>
                        <p className="text-xs text-muted-foreground">Digital Address: {region.digitalAddress}</p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-3 hover:translate-x-0.5 transition-transform">
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
                    <div className="flex items-center gap-3 hover:translate-x-0.5 transition-transform">
                      <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                      <a href={`mailto:${region.email}`} className="text-sm text-primary hover:underline font-medium">
                        {region.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary/95 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
                Need Assistance?
              </h2>
              <p className="text-white/90 text-lg mb-8 leading-relaxed">
                Our team across all regional offices is ready to support cocoa farmers with extension
                services, disease control, and productivity enhancement programs.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-primary font-semibold rounded-xl hover:bg-accent/90 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
              >
                Contact Us
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
