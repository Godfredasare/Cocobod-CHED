'use client';

import { motion } from 'framer-motion';
import { Linkedin, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/ched/Header';
import Footer from '@/components/ched/Footer';
import managementData from '@/data/management.json';
import { useState } from 'react';

// Helper function to get initials from name
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

// Profile Image component with full container and initials fallback
function ProfileImage({ 
  name, 
  image 
}: { 
  name: string; 
  image?: string; 
}) {
  const [imgError, setImgError] = useState(false);
  const initials = getInitials(name);
  const hasImage = image && image.trim() !== '' && !imgError;

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-primary/30 via-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">
      {hasImage ? (
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-4xl font-bold text-primary">{initials}</span>
        </div>
      )}
    </div>
  );
}

export default function ManagementPageContent() {
  const { team, departments } = managementData;
  const executives = team.filter(m => m.isExecutive);
  const managers = team.filter(m => !m.isExecutive);

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
              Our Team
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Management Team
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the dedicated professionals leading CHED&apos;s mission to transform 
              Ghana&apos;s cocoa industry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Executive Leadership */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-foreground mb-8 text-center">Executive Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {executives.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
              >
                {/* Full Container Image */}
                <ProfileImage 
                  name={member.name} 
                  image={(member as { image?: string }).image} 
                />
                
                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-lg text-foreground">{member.name}</h3>
                  <p className="text-sm text-primary font-medium mt-1">{member.title}</p>
                  <p className="text-sm text-muted-foreground mt-3">{member.description}</p>
                  
                  {/* Social Links */}
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors"
                        title="LinkedIn"
                      >
                        <Linkedin size={16} />
                      </a>
                    )}
                    {(member.email || member.linkedin) && (
                      <a
                        href={member.email ? `mailto:${member.email}` : member.linkedin || '#'}
                        target={member.linkedin ? "_blank" : undefined}
                        rel={member.linkedin ? "noopener noreferrer" : undefined}
                        className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors"
                        title="Email"
                      >
                        <Mail size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Department Heads */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-foreground mb-8 text-center">Department Heads & Managers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {managers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                {/* Full Container Image */}
                <ProfileImage 
                  name={member.name} 
                  image={(member as { image?: string }).image} 
                />
                
                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-lg text-foreground">{member.name}</h3>
                  <p className="text-sm text-primary font-medium mt-1">{member.title}</p>
                  <p className="text-sm text-muted-foreground mt-3">{member.description}</p>
                  
                  {/* Social Links */}
                  {(member.linkedin || member.email) && (
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors"
                          title="LinkedIn"
                        >
                          <Linkedin size={16} />
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors"
                          title="Email"
                        >
                          <Mail size={16} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Organizational Structure */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Organizational Structure
            </h2>
            <p className="text-muted-foreground">Our departments and their leadership</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((dept, index) => (
              <motion.div
                key={dept.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="p-5 bg-muted/30 rounded-xl border border-border text-center"
              >
                <h4 className="font-medium text-foreground">{dept.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{dept.description}</p>
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-primary font-medium">{dept.head}</p>
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
            Learn About Our Operations
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Discover how CHED operates across Ghana to support cocoa farmers.
          </p>
          <Link
            href="/operations"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent/90 transition-colors"
          >
            View Operations
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
