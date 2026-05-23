'use client';

import { motion } from 'framer-motion';
import { Handshake, Building2, Globe, Users } from 'lucide-react';

const partners = [
  {
    name: 'Ghana Cocoa Board',
    type: 'Parent Organization',
    description: 'CHED operates as a specialized division under Ghana Cocoa Board.',
  },
  {
    name: 'Ministry of Food and Agriculture',
    type: 'Government Partner',
    description: 'Collaboration on agricultural policy and farmer support initiatives.',
  },
  {
    name: 'World Cocoa Foundation',
    type: 'International Partner',
    description: 'Partnership for sustainable cocoa production and farmer livelihoods.',
  },
  {
    name: 'Cocoa Research Institute of Ghana',
    type: 'Research Partner',
    description: 'Joint research on disease control and improved cocoa varieties.',
  },
  {
    name: 'International Cocoa Organization',
    type: 'International Body',
    description: 'Global cooperation on cocoa industry standards and practices.',
  },
  {
    name: 'Kwame Nkrumah University of Science & Technology',
    type: 'Academic Partner',
    description: 'Training programs and agricultural research collaboration.',
  },
];

const partnershipBenefits = [
  {
    icon: Handshake,
    title: 'Technical Assistance',
    description: 'Access to expertise and resources for program implementation.',
  },
  {
    icon: Building2,
    title: 'Infrastructure Development',
    description: 'Joint investment in facilities and operational capacity.',
  },
  {
    icon: Globe,
    title: 'International Standards',
    description: 'Alignment with global best practices in cocoa production.',
  },
  {
    icon: Users,
    title: 'Community Impact',
    description: 'Expanded reach and effectiveness of farmer support programs.',
  },
];

export default function PartnershipSection() {
  return (
    <section id="partnership" className="py-16 lg:py-24 bg-white">
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
            Collaboration
          </motion.span>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4"
          >
            Partnerships
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            We collaborate with local and international organizations to strengthen 
            Ghana&apos;s cocoa industry and improve farmer livelihoods.
          </motion.p>
        </div>

        {/* Partnership Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {partnershipBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="text-center p-6 bg-muted/30 rounded-xl"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Partners List */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="bg-muted/30 rounded-xl border border-border overflow-hidden"
        >
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">Our Partners</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Organizations we work with to achieve our mission
            </p>
          </div>
          
          <div className="divide-y divide-border">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="p-5 hover:bg-white transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-medium text-foreground">{partner.name}</h4>
                    <p className="text-xs text-primary">{partner.type}</p>
                  </div>
                  <p className="text-sm text-muted-foreground sm:text-right sm:max-w-xs">
                    {partner.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Become a Partner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="mt-12 bg-primary rounded-xl p-8 text-center text-white"
        >
          <h3 className="text-xl font-semibold mb-2">Become a Partner</h3>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Interested in partnering with CHED? We welcome collaborations that align 
            with our mission to support Ghana&apos;s cocoa farmers.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary font-medium rounded-lg hover:bg-white/90 transition-colors"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
