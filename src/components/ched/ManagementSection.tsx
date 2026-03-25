'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Linkedin, Mail } from 'lucide-react';

const managementTeam = [
  {
    name: 'Dr. Ernest Opoku',
    title: 'Executive Director',
    description: 'Leads the strategic direction and overall management of CHED operations across Ghana.',
    image: null,
  },
  {
    name: 'Mrs. Grace Amponsah',
    title: 'Deputy Executive Director',
    description: 'Oversees day-to-day operations and coordinates extension services across all regions.',
    image: null,
  },
  {
    name: 'Mr. Samuel Asante',
    title: 'Head of Extension Services',
    description: 'Manages farmer education programs and extension officer training initiatives.',
    image: null,
  },
  {
    name: 'Dr. Abena Mensah',
    title: 'Head of Research',
    description: 'Leads research initiatives for disease control and sustainable farming practices.',
    image: null,
  },
  {
    name: 'Mr. Kofi Boateng',
    title: 'Head of Operations',
    description: 'Coordinates field operations and regional office activities nationwide.',
    image: null,
  },
  {
    name: 'Mrs. Efua Darko',
    title: 'Head of Finance & Administration',
    description: 'Manages financial operations and administrative functions of the division.',
    image: null,
  },
];

export default function ManagementSection() {
  return (
    <section id="management" className="py-16 lg:py-24 bg-white">
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
            Our Team
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4"
          >
            Management Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Meet the dedicated professionals leading CHED&apos;s mission to transform 
            Ghana&apos;s cocoa industry through innovation and service excellence.
          </motion.p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {managementTeam.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group bg-muted/30 rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all overflow-hidden"
            >
              {/* Image Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-foreground text-lg">
                  {member.name}
                </h3>
                <p className="text-sm text-primary font-medium mt-1">
                  {member.title}
                </p>
                <p className="text-sm text-muted-foreground mt-3">
                  {member.description}
                </p>
                
                {/* Social Links */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                  <button className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors">
                    <Mail size={16} />
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors">
                    <Linkedin size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Organizational Structure */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="mt-16 bg-muted/30 rounded-xl border border-border p-6 lg:p-10"
        >
          <h3 className="text-xl font-semibold text-foreground mb-6">
            Organizational Structure
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Executive Directorate', desc: 'Strategic leadership and policy direction' },
              { title: 'Extension Services', desc: 'Farmer education and field support' },
              { title: 'Technical Services', desc: 'Research and disease control' },
              { title: 'Finance & Admin', desc: 'Administrative support services' },
            ].map((dept) => (
              <div key={dept.title} className="text-center p-4 bg-white rounded-lg">
                <h4 className="font-medium text-foreground">{dept.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{dept.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
