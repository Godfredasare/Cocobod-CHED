'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ChevronDown, Home, Users, Briefcase, 
  Handshake, Newspaper, Images, Phone
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const aboutDropdown = [
  { name: 'Overview', href: '/about', icon: Users },
  { name: 'Company Profile', href: '/about/company-profile', icon: Briefcase },
  { name: 'Departments', href: '/about/departments', icon: Users },
  { name: 'Regions', href: '/about/regions', icon: Users },
];

const mediaDropdown = [
  { name: 'News', href: '/news', icon: Newspaper },
  { name: 'Gallery', href: '/gallery', icon: Images },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white shadow-md' 
            : 'bg-white/95'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo - Visible on all devices */}
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-12 lg:w-12 lg:h-14 overflow-hidden">
                <Image
                  src="/images/ched-logo.png"
                  alt="CHED Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-base lg:text-lg font-bold text-primary leading-tight">
                  Cocoa Health & Extension
                </h1>
                <p className="text-xs text-muted-foreground">Division (CHED)</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Home */}
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                <Home size={16} />
                Home
              </Link>

              {/* About Us Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setHoveredMenu('about')}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <div className="flex items-center gap-0.5 cursor-pointer">
                  <Link
                    href="/about"
                    className="flex items-center gap-2 px-2 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    <Users size={16} />
                    About Us
                  </Link>
                  <ChevronDown 
                    size={14} 
                    className={`text-foreground transition-transform duration-200 ${hoveredMenu === 'about' ? 'rotate-180' : ''}`} 
                  />
                </div>
                
                <AnimatePresence>
                  {hoveredMenu === 'about' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-border py-2 z-50"
                    >
                      {aboutDropdown.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:text-primary hover:bg-muted transition-colors ${
                            item.name === 'Overview' ? 'font-semibold border-b border-border mb-1' : ''
                          }`}
                        >
                          <item.icon size={14} />
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Management */}
              <Link
                href="/management"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                <Briefcase size={16} />
                Management
              </Link>

              {/* Operations */}
              <Link
                href="/operations"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                <Briefcase size={16} />
                Operations
              </Link>

              {/* Partnership */}
              <Link
                href="/partnership"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                <Handshake size={16} />
                Partnership
              </Link>

              {/* Media Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setHoveredMenu('media')}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <div className="flex items-center gap-0.5 cursor-pointer">
                  <Link
                    href="/news"
                    className="flex items-center gap-2 px-2 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    <Newspaper size={16} />
                    Media
                  </Link>
                  <ChevronDown 
                    size={14} 
                    className={`text-foreground transition-transform duration-200 ${hoveredMenu === 'media' ? 'rotate-180' : ''}`} 
                  />
                </div>
                
                <AnimatePresence>
                  {hoveredMenu === 'media' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-border py-2 z-50"
                    >
                      {mediaDropdown.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:text-primary hover:bg-muted transition-colors"
                        >
                          <item.icon size={14} />
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Get in Touch Button */}
              <Link
                href="/contact"
                className="ml-4 flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
              >
                <Phone size={16} />
                Get in Touch
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div 
              className="absolute inset-0 bg-black/50" 
              onClick={() => setIsMobileMenuOpen(false)} 
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-xl overflow-y-auto"
            >
              <div className="p-6 pt-20 space-y-1">
                {/* Logo in Mobile Menu */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                  <div className="relative w-12 h-14 overflow-hidden">
                    <Image
                      src="/images/ched-logo.png"
                      alt="CHED Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h1 className="text-base font-bold text-primary leading-tight">
                      Cocoa Health & Extension
                    </h1>
                    <p className="text-xs text-muted-foreground">Division (CHED)</p>
                  </div>
                </div>

                {/* Home */}
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                >
                  <Home size={18} />
                  Home
                </Link>

                {/* About Us */}
                <div>
                  <Link
                    href="/about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-base font-semibold text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                  >
                    <Users size={18} />
                    About Us
                  </Link>
                  <div className="pl-4 space-y-1">
                    {aboutDropdown.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                      >
                        <item.icon size={14} />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Management */}
                <Link
                  href="/management"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                >
                  <Briefcase size={18} />
                  Management
                </Link>

                {/* Operations */}
                <Link
                  href="/operations"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                >
                  <Briefcase size={18} />
                  Operations
                </Link>

                {/* Partnership */}
                <Link
                  href="/partnership"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                >
                  <Handshake size={18} />
                  Partnership
                </Link>

                {/* Media */}
                <div>
                  <Link
                    href="/news"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-base font-semibold text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                  >
                    <Newspaper size={18} />
                    Media
                  </Link>
                  <div className="pl-4 space-y-1">
                    {mediaDropdown.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                      >
                        <item.icon size={14} />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Get in Touch */}
                <div className="pt-4">
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary text-white text-center font-medium rounded-lg"
                  >
                    <Phone size={18} />
                    Get in Touch
                  </Link>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
