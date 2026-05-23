'use client';

import { motion } from 'framer-motion';
import { 
  Leaf, 
  Bug, 
  GraduationCap, 
  Users, 
  Shield,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const services = [
  {
    icon: Leaf,
    title: 'Cocoa Rehabilitation',
    description: 'Restoring diseased and aged cocoa farms through systematic rehabilitation programs.',
    features: ['Farm renovation', 'Seedling distribution', 'Technical support'],
  },
  {
    icon: Bug,
    title: 'Pest & Disease Control',
    description: 'Expert management of cocoa pests including CSSVD, black pod, and mirids.',
    features: ['Early detection', 'Treatment protocols', 'Prevention strategies'],
  },
  {
    icon: GraduationCap,
    title: 'Farmer Education',
    description: 'Training programs to equip farmers with modern cocoa cultivation techniques.',
    features: ['Workshops', 'Field demonstrations', 'Best practices'],
  },
  {
    icon: Users,
    title: 'Extension Services',
    description: 'On-ground support from trained extension officers providing personalized guidance.',
    features: ['Farm visits', 'Advisory services', 'Community outreach'],
  },
  {
    icon: Shield,
    title: 'Quality Assurance',
    description: 'Ensuring Ghanaian cocoa meets international quality standards.',
    features: ['Quality testing', 'Certification', 'Export compliance'],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4"
          >
            Our Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4"
          >
            What We Offer
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Comprehensive support services for sustainable cocoa farming 
            and community development across Ghana.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group p-6 lg:p-8 bg-muted/30 rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-5">
                <service.icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-5">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Link */}
              <a
                href="#contact"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
              >
                Learn more
                <ArrowRight size={16} />
              </a>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="mt-12 lg:mt-16 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Request a Service
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
