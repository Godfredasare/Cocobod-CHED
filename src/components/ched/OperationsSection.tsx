'use client';

import { motion } from 'framer-motion';
import { MapPin, Users, Leaf, Building } from 'lucide-react';

const regions = [
  { name: 'Ashanti Region', farmers: '120,000+', offices: 12 },
  { name: 'Eastern Region', farmers: '95,000+', offices: 10 },
  { name: 'Western Region', farmers: '110,000+', offices: 11 },
  { name: 'Central Region', farmers: '75,000+', offices: 8 },
  { name: 'Brong Ahafo Region', farmers: '85,000+', offices: 9 },
  { name: 'Volta Region', farmers: '45,000+', offices: 5 },
  { name: 'Western North', farmers: '65,000+', offices: 7 },
  { name: 'Ahafo Region', farmers: '35,000+', offices: 4 },
];

const programs = [
  {
    icon: Leaf,
    title: 'Cocoa Rehabilitation Programme',
    description: 'Nationwide initiative to rehabilitate diseased and aged cocoa farms, distributing hybrid seedlings and providing technical support.',
    stats: '45,000+ hectares rehabilitated',
  },
  {
    icon: Users,
    title: 'Extension Services Programme',
    description: 'Regular farm visits, training sessions, and community workshops to educate farmers on best practices.',
    stats: '10,000+ training sessions annually',
  },
  {
    icon: Building,
    title: 'Regional Operations',
    description: 'Coordinated operations across all cocoa-growing regions with dedicated extension officers and support staff.',
    stats: '66+ regional offices nationwide',
  },
];

export default function OperationsSection() {
  return (
    <section id="operations" className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4"
          >
            Our Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4"
          >
            Operations
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Our operations span across all cocoa-growing regions of Ghana, providing 
            comprehensive support services to farming communities.
          </motion.p>
        </div>

        {/* Programs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white p-6 lg:p-8 rounded-xl border border-border"
            >
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <program.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">
                {program.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {program.description}
              </p>
              <div className="pt-4 border-t border-border">
                <p className="text-sm font-medium text-primary">
                  {program.stats}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Regional Coverage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white rounded-xl border border-border overflow-hidden"
        >
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Regional Coverage</h3>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              CHED operates in all major cocoa-growing regions across Ghana
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {regions.map((region, index) => (
              <div
                key={region.name}
                className={`p-5 ${index !== regions.length - 1 ? 'border-r border-b sm:border-b-0' : ''} ${index < 4 ? 'lg:border-b' : ''} border-border`}
              >
                <h4 className="font-medium text-foreground">{region.name}</h4>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Farmers</span>
                    <span className="font-medium text-foreground">{region.farmers}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Offices</span>
                    <span className="font-medium text-foreground">{region.offices}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Key Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { label: 'Annual Farm Visits', value: '50,000+' },
            { label: 'Training Programs', value: '2,500+' },
            { label: 'Extension Officers', value: '800+' },
            { label: 'Farmer Groups', value: '3,500+' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-5 bg-white rounded-xl border border-border">
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
