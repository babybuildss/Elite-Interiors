'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const services = [
  {
    id: 'residential',
    number: '01',
    title: 'Residential Design',
    subtitle: 'Luxury Living Spaces',
    description: 'Transform your home into a sanctuary of elegance. From penthouses to villas, we design residential spaces that reflect your personality while exceeding every expectation of luxury living. Our residential designs blend functionality with artistry, creating environments where every moment feels extraordinary.',
    features: ['Space Planning & Layout', 'Custom Furniture Design', 'Lighting Design', 'Material Selection & Sourcing'],
    image: '/images/portfolio-living.png',
  },
  {
    id: 'commercial',
    number: '02',
    title: 'Commercial Design',
    subtitle: 'Premium Business Environments',
    description: 'Elevate your brand through exceptional spatial design. We create commercial environments that make powerful statements, from executive offices to luxury retail spaces. Every commercial project is designed to impress clients, inspire employees, and embody the essence of your brand.',
    features: ['Brand Integration', 'Reception & Lobby Design', 'Workspace Optimization', 'Sustainable Design Solutions'],
    image: '/images/portfolio-office.png',
  },
  {
    id: 'hospitality',
    number: '03',
    title: 'Hospitality Design',
    subtitle: 'Memorable Guest Experiences',
    description: 'Design destinations that guests never forget. Our hospitality designs create immersive experiences for hotels, resorts, and restaurants. We understand that in hospitality, design is the first impression and the lasting memory, and we craft spaces that tell compelling stories.',
    features: ['Hotel & Resort Interiors', 'Restaurant & Bar Design', 'Spa & Wellness Centers', 'Guest Experience Optimization'],
    image: '/images/portfolio-dining.png',
  },
  {
    id: 'renovation',
    number: '04',
    title: 'Luxury Renovation',
    subtitle: 'Reimagined Elegance',
    description: 'Breathe new life into existing spaces. Our renovation expertise transforms outdated interiors into contemporary masterpieces while respecting the character and heritage of the original architecture. We specialize in complete transformations that feel both fresh and timeless.',
    features: ['Complete Interior Overhaul', 'Heritage Restoration', 'Smart Home Integration', 'Structural Modification'],
    image: '/images/portfolio-bedroom.png',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeService, setActiveService] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section id="services" ref={sectionRef} className="relative py-32 md:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]" />

      {/* Decorative elements */}
      <motion.div
        className="absolute -left-20 top-1/3 w-60 h-60 rounded-full bg-[#C9A96E]/2 blur-[80px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.02, 0.05, 0.02] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-[#C9A96E]" />
            <span className="font-[family-name:var(--font-inter)] text-[#C9A96E] text-xs tracking-[0.4em] uppercase">
              Our Services
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
            <motion.h2
              variants={itemVariants}
              className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-white leading-tight"
            >
              Crafting
              <br />
              <span className="text-gradient-gold italic">Masterpieces</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="font-[family-name:var(--font-cormorant)] text-white/40 text-lg max-w-md mt-4 lg:mt-0"
            >
              Every service we offer is a gateway to transforming your vision into an
              experience that transcends the ordinary.
            </motion.p>
          </div>

          {/* Service tabs */}
          <motion.div variants={itemVariants} className="flex flex-col lg:flex-row gap-8 lg:gap-0">
            {/* Left tabs */}
            <div className="lg:w-1/3 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible horizontal-scroll pb-4 lg:pb-0">
              {services.map((service, i) => (
                <motion.button
                  key={service.id}
                  onClick={() => setActiveService(i)}
                  className={`flex-shrink-0 text-left px-6 py-5 border-l-2 transition-all duration-500 cursor-hover group min-w-[200px] lg:min-w-0 lg:w-full ${
                    activeService === i
                      ? 'border-[#C9A96E] bg-[#C9A96E]/5'
                      : 'border-white/10 hover:border-[#C9A96E]/40 hover:bg-white/[0.02]'
                  }`}
                  whileHover={{ x: 5 }}
                >
                  <span className="font-[family-name:var(--font-inter)] text-[10px] text-[#C9A96E]/50 tracking-[0.2em] uppercase block">
                    {service.number}
                  </span>
                  <span
                    className={`font-[family-name:var(--font-playfair)] text-lg transition-colors duration-300 block ${
                      activeService === i ? 'text-[#C9A96E]' : 'text-white/60 group-hover:text-white'
                    }`}
                  >
                    {service.title}
                  </span>
                  <span className="font-[family-name:var(--font-cormorant)] text-white/30 text-sm block mt-1">
                    {service.subtitle}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Right content */}
            <div className="lg:w-2/3 lg:pl-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden mb-8">
                    <motion.div
                      className="aspect-[16/9] overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.6 }}
                    >
                      <img
                        src={services[activeService].image}
                        alt={services[activeService].title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-[#0a0a0a]/20 to-transparent" />
                    </motion.div>

                    {/* Service number overlay */}
                    <div className="absolute top-6 right-6 font-[family-name:var(--font-playfair)] text-8xl text-[#C9A96E]/10">
                      {services[activeService].number}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-white mb-4">
                    {services[activeService].title}
                  </h3>
                  <p className="font-[family-name:var(--font-cormorant)] text-white/50 text-lg leading-relaxed mb-8">
                    {services[activeService].description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-4">
                    {services[activeService].features.map((feature, i) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        className="flex items-center gap-3 group cursor-hover"
                      >
                        <div className="w-1.5 h-1.5 bg-[#C9A96E] rotate-45 group-hover:rotate-[225deg] transition-transform duration-500" />
                        <span className="font-[family-name:var(--font-inter)] text-white/60 text-sm">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-3 mt-8 text-[#C9A96E] text-xs tracking-[0.2em] uppercase cursor-hover group"
                    whileHover={{ x: 5 }}
                  >
                    Start Your Project
                    <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </motion.a>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Process section */}
          <motion.div variants={itemVariants} className="mt-32">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-8 h-[1px] bg-[#C9A96E]" />
              <span className="font-[family-name:var(--font-inter)] text-[#C9A96E] text-xs tracking-[0.4em] uppercase">
                Our Process
              </span>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Discovery', desc: 'Deep-dive consultation to understand your vision, lifestyle, and aspirations for the space.' },
                { step: '02', title: 'Concept', desc: 'Mood boards, 3D visualizations, and material palettes that bring your vision to life.' },
                { step: '03', title: 'Creation', desc: 'Meticulous execution by our network of master craftsmen and trusted artisans.' },
                { step: '04', title: 'Reveal', desc: 'The breathtaking moment when your transformed space is unveiled in its full glory.' },
              ].map((process, i) => (
                <motion.div
                  key={process.step}
                  className="relative group cursor-hover"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1 + i * 0.15, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="glass-card p-6 h-full transition-all duration-500">
                    <span className="font-[family-name:var(--font-playfair)] text-3xl text-[#C9A96E]/20 block mb-3 group-hover:text-[#C9A96E]/40 transition-colors duration-300">
                      {process.step}
                    </span>
                    <h4 className="font-[family-name:var(--font-playfair)] text-white text-lg mb-2">
                      {process.title}
                    </h4>
                    <p className="font-[family-name:var(--font-cormorant)] text-white/40 text-sm leading-relaxed">
                      {process.desc}
                    </p>
                  </div>

                  {/* Connector line */}
                  {i < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-[1px] bg-[#C9A96E]/20" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
