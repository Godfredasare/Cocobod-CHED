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
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <div className="relative w-9 h-11 sm:w-10 sm:h-12 lg:w-12 lg:h-14 overflow-hidden">
                <Image
                  src="/images/ched-logo.png"
                  alt="CHED Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-sm sm:text-base lg:text-lg font-bold text-primary leading-tight">
                  Cocoa Health & Extension
                </h1>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Division (CHED)</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 flex-shrink-0">
              {/* Home */}
              <Link
                href="/"
                className="flex items-center gap-2 px-3 xl:px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                <Home size={16} className="flex-shrink-0" />
                <span>Home</span>
              </Link>

              {/* About Us Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setHoveredMenu('about')}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <button className="flex items-center gap-1 px-3 xl:px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                  <Users size={16} className="flex-shrink-0" />
                  <span>About Us</span>
                  <ChevronDown 
                    size={14} 
                    className={`flex-shrink-0 transition-transform duration-200 ${hoveredMenu === 'about' ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                <AnimatePresence>
                  {hoveredMenu === 'about' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-border py-2 z-50 overflow-hidden"
                    >
                      {aboutDropdown.map((item, i) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03 }}
                        >
                          <Link
                            href={item.href}
                            className={`flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:text-primary hover:bg-muted/50 transition-colors ${
                              item.name === 'Overview' ? 'font-semibold border-b border-border mb-1' : ''
                            }`}
                          >
                            <item.icon size={14} className="flex-shrink-0" />
                            <span>{item.name}</span>
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Management */}
              <Link
                href="/management"
                className="flex items-center gap-2 px-3 xl:px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                <Briefcase size={16} className="flex-shrink-0" />
                <span>Management</span>
              </Link>

              {/* Operations */}
              <Link
                href="/operations"
                className="flex items-center gap-2 px-3 xl:px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                <Briefcase size={16} className="flex-shrink-0" />
                <span>Operations</span>
              </Link>

              {/* Partnership */}
              <Link
                href="/partnership"
                className="flex items-center gap-2 px-3 xl:px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                <Handshake size={16} className="flex-shrink-0" />
                <span>Partnership</span>
              </Link>

              {/* Media Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setHoveredMenu('media')}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <button className="flex items-center gap-1 px-3 xl:px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                  <Newspaper size={16} className="flex-shrink-0" />
                  <span>Media</span>
                  <ChevronDown 
                    size={14} 
                    className={`flex-shrink-0 transition-transform duration-200 ${hoveredMenu === 'media' ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                <AnimatePresence>
                  {hoveredMenu === 'media' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="absolute top-full left-0 mt-1 w-40 bg-white rounded-xl shadow-xl border border-border py-2 z-50 overflow-hidden"
                    >
                      {mediaDropdown.map((item, i) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03 }}
                        >
                          <Link
                            href={item.href}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                          >
                            <item.icon size={14} className="flex-shrink-0" />
                            <span>{item.name}</span>
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Get in Touch Button */}
              <Link
                href="/contact"
                className="ml-2 xl:ml-4 flex items-center gap-2 px-4 xl:px-5 py-2 xl:py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm flex-shrink-0"
              >
                <Phone size={16} className="flex-shrink-0" />
                <span>Get in Touch</span>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground hover:text-primary transition-colors flex-shrink-0"
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
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl overflow-y-auto"
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
                  <Home size={18} className="flex-shrink-0" />
                  <span>Home</span>
                </Link>

                {/* About Us */}
                <div>
                  <Link
                    href="/about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-base font-semibold text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                  >
                    <Users size={18} className="flex-shrink-0" />
                    <span>About Us</span>
                  </Link>
                  <div className="pl-4 space-y-1">
                    {aboutDropdown.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                      >
                        <item.icon size={14} className="flex-shrink-0" />
                        <span>{item.name}</span>
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
                  <Briefcase size={18} className="flex-shrink-0" />
                  <span>Management</span>
                </Link>

                {/* Operations */}
                <Link
                  href="/operations"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                >
                  <Briefcase size={18} className="flex-shrink-0" />
                  <span>Operations</span>
                </Link>

                {/* Partnership */}
                <Link
                  href="/partnership"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                >
                  <Handshake size={18} className="flex-shrink-0" />
                  <span>Partnership</span>
                </Link>

                {/* Media */}
                <div>
                  <Link
                    href="/news"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-base font-semibold text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                  >
                    <Newspaper size={18} className="flex-shrink-0" />
                    <span>Media</span>
                  </Link>
                  <div className="pl-4 space-y-1">
                    {mediaDropdown.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                      >
                        <item.icon size={14} className="flex-shrink-0" />
                        <span>{item.name}</span>
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
                    <Phone size={18} className="flex-shrink-0" />
                    <span>Get in Touch</span>
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
