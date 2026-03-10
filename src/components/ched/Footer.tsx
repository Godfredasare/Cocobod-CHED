'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Management', href: '/management' },
  { name: 'Operations', href: '/operations' },
  { name: 'Services', href: '/#services' },
  { name: 'Partnership', href: '/partnership' },
];

const mediaLinks = [
  { name: 'News', href: '/news' },
  { name: 'Gallery', href: '/gallery' },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/20">
                <Image
                  src="/images/ched-logo.png"
                  alt="CHED Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-white">Cocoa Health</h3>
                <p className="text-xs text-white/70">Extension Division</p>
              </div>
            </Link>
            <p className="text-sm text-white/70 mb-4">
              A division of Ghana Cocoa Board dedicated to sustainable cocoa 
              production through extension services and disease control.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Facebook, href: 'https://facebook.com' },
                { icon: Twitter, href: 'https://twitter.com' },
                { icon: Linkedin, href: 'https://linkedin.com' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Media */}
          <div>
            <h4 className="font-semibold text-white mb-4">Media</h4>
            <ul className="space-y-2">
              {mediaLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm text-white/70">
                  Cocoa House, 42 Kwame Nkrumah Avenue, Accra, Ghana
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-accent flex-shrink-0" />
                <a href="tel:+233302666946" className="text-sm text-white/70 hover:text-accent transition-colors">
                  (0) 302 666 946
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent flex-shrink-0" />
                <a href="mailto:info@ched.com.gh" className="text-sm text-white/70 hover:text-accent transition-colors">
                  info@ched.com.gh
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/50 text-center md:text-left">
              © {new Date().getFullYear()} Cocoa Health and Extension Division. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/50">A division of</span>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full">
                <div className="relative w-5 h-5 rounded-full overflow-hidden">
                  <Image
                    src="/images/ched-logo.png"
                    alt="COCOBOD"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-sm font-medium">Ghana COCOBOD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
