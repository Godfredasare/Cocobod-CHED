'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Building, Users, MapPin } from 'lucide-react';
import Header from '@/components/ched/Header';
import Footer from '@/components/ched/Footer';

const aboutCards = [
  {
    title: 'Company Profile',
    description: 'Learn about our rich history, vision, mission, and core values that guide our commitment to Ghana\'s cocoa industry.',
    href: '/about/company-profile',
    icon: Building,
    image: '/images/about-profile.png',
  },
  {
    title: 'Departments',
    description: 'Explore our organizational structure and the various departments working together to support cocoa farmers.',
    href: '/about/departments',
    icon: Users,
    image: '/images/about-dept.png',
  },
  {
    title: 'Regional Offices',
    description: 'Find our regional and district offices across Ghana\'s cocoa-growing regions for accessible extension services.',
    href: '/about/regions',
    icon: MapPin,
    image: '/images/about-regions.png',
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-primary" />
          <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center opacity-20" />
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
                Cocoa Health and Extension Division
              </h1>
              <p className="text-lg text-white/80 leading-relaxed">
                A subsidiary of Ghana Cocoa Board, dedicated to ensuring sustainable cocoa production 
                through innovative extension services and farmer education since 1945.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="relative -mt-10 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-6 lg:p-8"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {[
                  { value: '1945', label: 'Established' },
                  { value: '800K+', label: 'Farmers Supported' },
                  { value: '14', label: 'Regions Covered' },
                  { value: '9', label: 'Regional Offices' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Cards */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Explore Our Organization
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover more about who we are, how we operate, and where we serve across Ghana.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {aboutCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                >
                  <Link href={card.href} className="group block">
                    <div className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full">
                      {/* Image */}
                      <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <card.icon className="w-20 h-20 text-primary/20" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {card.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                          {card.description}
                        </p>
                        <div className="flex items-center text-primary font-medium text-sm">
                          Learn More
                          <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Brief History */}
        <section className="py-16 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                  Our History
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The Cocoa Health and Extension Division (CHED) of Ghana Cocoa Board, formerly CSSVD 
                  and Cocoa Services Division, has had a remarkable journey since its establishment in 1945.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The Cocoa Swollen Shoot Virus Disease (CSSVD) was first reported in the 1930s in the 
                  Eastern Region and has since spread throughout the cocoa growing regions in the country. 
                  The government set up the Cocoa Division as a Unit under the then Department of Agriculture 
                  to control the CSSVD and cocoa pests.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  In April 2014, the CSSVD-CU was upgraded to a Division and renamed the Cocoa Health 
                  and Extension Division with expanded mandates to serve Ghana's cocoa farmers better.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-6">
                    Key Milestones
                  </h3>
                  <div className="space-y-4">
                    {[
                      { year: '1945', event: 'Cocoa Division established under Department of Agriculture' },
                      { year: '1964', event: 'Cocoa Division reconstituted after brief dissolution' },
                      { year: '1972', event: 'Renamed Cocoa Production Division under Ministry of Cocoa Affairs' },
                      { year: '1985', event: 'Renamed Cocoa Services Division (CSD) with three core functions' },
                      { year: '2001', event: 'CSSVD Control Unit and Seed Production Unit created' },
                      { year: '2010', event: 'Public Private Partnership in Cocoa Extension launched' },
                      { year: '2014', event: 'Upgraded to Cocoa Health and Extension Division (CHED)' },
                    ].map((milestone) => (
                      <div key={milestone.year} className="flex gap-4">
                        <div className="flex-shrink-0 w-16">
                          <span className="text-sm font-bold text-accent">{milestone.year}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{milestone.event}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
