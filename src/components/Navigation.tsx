'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { href: '/', label: 'Home', number: '01' },
  { href: '/about', label: 'About', number: '02' },
  { href: '/services', label: 'Services', number: '03' },
  { href: '/portfolio', label: 'Portfolio', number: '04' },
  { href: '/contact', label: 'Contact', number: '05' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change via event listener pattern
  useEffect(() => {
    const handleRouteChange = () => setIsOpen(false);
    window.addEventListener('routeChangeComplete', handleRouteChange);
    return () => window.removeEventListener('routeChangeComplete', handleRouteChange);
  }, []);

  const isActive = useCallback(
    (href: string) => {
      if (href === '/') return pathname === '/';
      return pathname.startsWith(href);
    },
    [pathname]
  );

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
          scrolled
            ? 'bg-[#0a0a0a]/90 backdrop-blur-2xl border-b border-[#C9A96E]/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 cursor-hover group">
            <motion.div
              className="w-9 h-9 border border-[#C9A96E] rotate-45 flex items-center justify-center group-hover:border-[#E8D5A8] transition-colors duration-500"
              whileHover={{ scale: 1.1, rotate: 45 }}
            >
              <span className="text-[#C9A96E] font-[family-name:var(--font-playfair)] text-sm -rotate-45 font-bold group-hover:text-[#E8D5A8] transition-colors">
                E
              </span>
            </motion.div>
            <div>
              <span className="font-[family-name:var(--font-playfair)] text-white text-lg tracking-[0.15em]">
                ELITE
              </span>
              <span className="font-[family-name:var(--font-cormorant)] text-[#C9A96E] text-sm tracking-[0.2em] ml-2 hidden sm:inline">
                INTERIORS
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative group flex items-center gap-2 text-sm tracking-[0.15em] uppercase transition-colors duration-300 cursor-hover ${
                  isActive(item.href) ? 'text-[#C9A96E]' : 'text-white/60 hover:text-white'
                }`}
              >
                <span className="font-[family-name:var(--font-inter)] text-[10px] text-[#C9A96E]/50">
                  {item.number}
                </span>
                {item.label}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[#C9A96E]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="hidden lg:flex magnetic-btn items-center px-6 py-2.5 border border-[#C9A96E]/40 text-[#C9A96E] text-xs tracking-[0.2em] uppercase hover:bg-[#C9A96E] hover:text-[#0a0a0a] transition-all duration-500 cursor-hover"
          >
            Book Consultation
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2 cursor-hover relative z-[110]"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
              className="block w-7 h-[1.5px] bg-[#C9A96E] origin-center"
            />
            <motion.span
              animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }}
              className="block w-5 h-[1.5px] bg-[#C9A96E]"
            />
            <motion.span
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
              className="block w-7 h-[1.5px] bg-[#C9A96E] origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[99] bg-[#0a0a0a]/98 backdrop-blur-2xl lg:hidden flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center gap-4 cursor-hover"
                  >
                    <span className="font-[family-name:var(--font-inter)] text-xs text-[#C9A96E]/40">
                      {item.number}
                    </span>
                    <span
                      className={`font-[family-name:var(--font-playfair)] text-3xl tracking-[0.15em] transition-colors duration-300 ${
                        isActive(item.href)
                          ? 'text-[#C9A96E]'
                          : 'text-white/80 group-hover:text-[#C9A96E]'
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="mt-8 magnetic-btn inline-flex px-8 py-3 border border-[#C9A96E]/40 text-[#C9A96E] text-xs tracking-[0.2em] uppercase hover:bg-[#C9A96E] hover:text-[#0a0a0a] transition-all duration-500 cursor-hover"
                >
                  Book Consultation
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
