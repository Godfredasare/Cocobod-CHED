'use client';

import { motion } from 'framer-motion';
import { Linkedin, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/ched/Header';
import Footer from '@/components/ched/Footer';
import managementData from '@/data/management.json';
import { useState } from 'react';

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

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
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center"
        >
          <span className="text-4xl font-bold text-primary">{initials}</span>
        </motion.div>
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
      <section className="relative pt-28 pb-16 bg-gradient-to-br from-primary via-primary to-primary/95 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-5 py-2 bg-accent/20 text-accent text-sm font-semibold rounded-full mb-6 backdrop-blur-sm border border-accent/10">
              Our Team
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Management Team
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Meet the dedicated professionals leading CHED&apos;s mission to transform
              Ghana&apos;s cocoa industry.
            </p>
          </div>
        </div>
      </section>

      {/* Executive Leadership */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-bold text-foreground mb-10 text-center"
          >
            Executive Leadership
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 max-w-5xl mx-auto">
            {executives.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm group hover:scale-[1.02] transition-transform"
              >
                {/* Full Container Image */}
                <ProfileImage
                  name={member.name}
                  image={(member as { image?: string }).image}
                />

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-semibold text-xl text-foreground">{member.name}</h3>
                  <p className="text-sm text-primary font-semibold mt-1">{member.title}</p>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{member.description}</p>

                  {/* Social Links */}
                  <div className="flex items-center gap-2 mt-5 pt-5 border-t border-border">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white hover:scale-[1.02] active:scale-95 transition"
                        title="LinkedIn"
                      >
                        <Linkedin size={18} />
                      </a>
                    )}
                    {(member.email || member.linkedin) && (
                      <a
                        href={member.email ? `mailto:${member.email}` : member.linkedin || '#'}
                        target={member.linkedin ? '_blank' : undefined}
                        rel={member.linkedin ? 'noopener noreferrer' : undefined}
                        className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white hover:scale-[1.02] active:scale-95 transition"
                        title="Email"
                      >
                        <Mail size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Department Heads */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-bold text-foreground mb-10 text-center"
          >
            Department Heads & Managers
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {managers.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:scale-[1.02] transition-transform"
              >
                {/* Full Container Image */}
                <ProfileImage
                  name={member.name}
                  image={(member as { image?: string }).image}
                />

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-semibold text-xl text-foreground">{member.name}</h3>
                  <p className="text-sm text-primary font-semibold mt-1">{member.title}</p>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{member.description}</p>

                  {/* Social Links */}
                  {(member.linkedin || member.email) && (
                    <div className="flex items-center gap-2 mt-5 pt-5 border-t border-border">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white hover:scale-[1.02] active:scale-95 transition"
                          title="LinkedIn"
                        >
                          <Linkedin size={18} />
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white hover:scale-[1.02] active:scale-95 transition"
                          title="Email"
                        >
                          <Mail size={18} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organizational Structure */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Organizational Structure
            </h2>
            <p className="text-muted-foreground text-lg">Our departments and their leadership</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {departments.map((dept) => (
              <div
                key={dept.title}
                className="p-6 bg-gradient-to-br from-muted/40 to-muted/20 rounded-2xl border border-border text-center group hover:border-primary/20 transition-colors hover:scale-[1.02] transition-transform"
              >
                <h4 className="font-semibold text-lg text-foreground">{dept.title}</h4>
                <p className="text-sm text-muted-foreground mt-2">{dept.description}</p>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-primary font-semibold">{dept.head}</p>
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
            Learn About Our Operations
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-white/80 text-lg mb-8 max-w-xl mx-auto"
          >
            Discover how CHED operates across Ghana to support cocoa farmers.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Link
              href="/operations"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-primary font-semibold rounded-xl hover:bg-accent/90 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
            >
              View Operations
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
