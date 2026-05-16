'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { id: 'home', label: 'Home', number: '01' },
  { id: 'about', label: 'About', number: '02' },
  { id: 'services', label: 'Services', number: '03' },
  { id: 'portfolio', label: 'Portfolio', number: '04' },
  { id: 'contact', label: 'Contact', number: '05' },
];

interface NavigationProps {
  activeSection: string;
}

export default function Navigation({ activeSection }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Main Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
          scrolled
            ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-[#C9A96E]/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            className="flex items-center gap-3 cursor-hover"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 border border-[#C9A96E] rotate-45 flex items-center justify-center">
              <span className="text-[#C9A96E] font-[family-name:var(--font-playfair)] text-xs -rotate-45 font-bold">
                E
              </span>
            </div>
            <div>
              <span className="font-[family-name:var(--font-playfair)] text-white text-lg tracking-[0.15em]">
                ELITE
              </span>
              <span className="font-[family-name:var(--font-cormorant)] text-[#C9A96E] text-sm tracking-[0.2em] ml-2">
                INTERIORS
              </span>
            </div>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className={`relative group flex items-center gap-2 text-sm tracking-[0.15em] uppercase transition-colors duration-300 cursor-hover ${
                  activeSection === item.id
                    ? 'text-[#C9A96E]'
                    : 'text-white/60 hover:text-white'
                }`}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <span className="font-[family-name:var(--font-inter)] text-[10px] text-[#C9A96E]/50">
                  {item.number}
                </span>
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[#C9A96E]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
            className="hidden lg:block magnetic-btn px-6 py-2.5 border border-[#C9A96E]/40 text-[#C9A96E] text-xs tracking-[0.2em] uppercase hover:bg-[#C9A96E] hover:text-[#0a0a0a] transition-all duration-500 cursor-hover"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Consultation
          </motion.a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2 cursor-hover"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 8 : 0,
              }}
              className="block w-7 h-[1.5px] bg-[#C9A96E]"
            />
            <motion.span
              animate={{ opacity: isOpen ? 0 : 1 }}
              className="block w-5 h-[1.5px] bg-[#C9A96E]"
            />
            <motion.span
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? -8 : 0,
              }}
              className="block w-7 h-[1.5px] bg-[#C9A96E]"
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
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group flex items-center gap-4 cursor-hover"
                >
                  <span className="font-[family-name:var(--font-inter)] text-xs text-[#C9A96E]/40">
                    {item.number}
                  </span>
                  <span
                    className={`font-[family-name:var(--font-playfair)] text-3xl tracking-[0.15em] transition-colors duration-300 ${
                      activeSection === item.id ? 'text-[#C9A96E]' : 'text-white/80 group-hover:text-[#C9A96E]'
                    }`}
                  >
                    {item.label}
                  </span>
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-8 magnetic-btn px-8 py-3 border border-[#C9A96E]/40 text-[#C9A96E] text-xs tracking-[0.2em] uppercase hover:bg-[#C9A96E] hover:text-[#0a0a0a] transition-all duration-500 cursor-hover"
              >
                Book Consultation
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
