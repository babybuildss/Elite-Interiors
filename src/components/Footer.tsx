'use client';

import { motion } from 'framer-motion';

const footerLinks = {
  services: [
    { label: 'Residential Design', href: '#services' },
    { label: 'Commercial Design', href: '#services' },
    { label: 'Hospitality Design', href: '#services' },
    { label: 'Luxury Renovation', href: '#services' },
  ],
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Our Process', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ],
};

export default function Footer() {
  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-[#C9A96E]/10 bg-[#0a0a0a]">
      {/* Main footer */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 border border-[#C9A96E] rotate-45 flex items-center justify-center">
                <span className="text-[#C9A96E] font-[family-name:var(--font-playfair)] text-sm -rotate-45 font-bold">
                  E
                </span>
              </div>
              <div>
                <span className="font-[family-name:var(--font-playfair)] text-white text-xl tracking-[0.15em]">
                  ELITE
                </span>
                <span className="font-[family-name:var(--font-cormorant)] text-[#C9A96E] text-sm tracking-[0.2em] ml-2">
                  INTERIORS
                </span>
              </div>
            </div>
            <p className="font-[family-name:var(--font-cormorant)] text-white/40 text-lg leading-relaxed max-w-md mb-8">
              Where vision meets elegance. Crafting extraordinary living spaces that
              redefine luxury and transcend the ordinary.
            </p>

            {/* Newsletter */}
            <div className="flex gap-0 max-w-sm">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent border border-[#C9A96E]/20 px-4 py-3 text-white font-[family-name:var(--font-cormorant)] text-sm focus:border-[#C9A96E] focus:outline-none transition-colors duration-300 placeholder:text-white/20"
              />
              <button className="px-6 py-3 bg-[#C9A96E] text-[#0a0a0a] text-xs tracking-[0.15em] uppercase font-semibold hover:bg-[#E8D5A8] transition-colors duration-300 cursor-hover">
                Subscribe
              </button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-[family-name:var(--font-inter)] text-white/60 text-xs tracking-[0.3em] uppercase mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="font-[family-name:var(--font-cormorant)] text-white/30 text-base hover:text-[#C9A96E] transition-colors duration-300 smooth-underline cursor-hover"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-[family-name:var(--font-inter)] text-white/60 text-xs tracking-[0.3em] uppercase mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="font-[family-name:var(--font-cormorant)] text-white/30 text-base hover:text-[#C9A96E] transition-colors duration-300 smooth-underline cursor-hover"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-[family-name:var(--font-inter)] text-white/20 text-xs tracking-[0.15em]">
            &copy; 2024 Elite Interiors. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {['Instagram', 'Pinterest', 'LinkedIn', 'Houzz'].map((social) => (
              <a
                key={social}
                href="#"
                className="font-[family-name:var(--font-inter)] text-white/20 text-[10px] tracking-[0.15em] uppercase hover:text-[#C9A96E] transition-colors duration-300 cursor-hover"
              >
                {social}
              </a>
            ))}
          </div>

          {/* Back to top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-[#C9A96E]/40 hover:text-[#C9A96E] transition-colors duration-300 cursor-hover"
            whileHover={{ y: -3 }}
          >
            <span className="font-[family-name:var(--font-inter)] text-[10px] tracking-[0.2em] uppercase">
              Back to Top
            </span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 15l7-7 7 7" />
            </svg>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
