'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import SiteLayout from '@/components/SiteLayout';

const services = [
  {
    id: 'residential',
    number: '01',
    title: 'Residential Design',
    subtitle: 'Luxury Living Spaces',
    description: 'Transform your home into a sanctuary of elegance. From penthouses and villas to premium apartments, we design residential spaces that reflect your personality while exceeding every expectation of luxury living. Our residential designs blend functionality with artistry, creating environments where every moment feels extraordinary.',
    features: ['Space Planning & Layout Design', 'Custom Furniture Design & Manufacturing', 'Lighting Design & Ambiance Engineering', 'Material Selection & Global Sourcing', 'Smart Home Integration', 'Art Curation & Styling'],
    image: '/images/portfolio-living.png',
    startingPrice: '8,00,000',
  },
  {
    id: 'commercial',
    number: '02',
    title: 'Commercial Design',
    subtitle: 'Premium Business Environments',
    description: 'Elevate your brand through exceptional spatial design. We create commercial environments that make powerful statements, from executive offices and luxury retail spaces to co-working hubs. Every commercial project is designed to impress clients, inspire employees, and embody the essence of your brand identity.',
    features: ['Brand Identity Integration', 'Reception & Lobby Design', 'Workspace Optimization & Ergonomics', 'Sustainable Design Solutions', 'Acoustic Engineering', 'Wayfinding & Signage Design'],
    image: '/images/portfolio-office.png',
    startingPrice: '12,00,000',
  },
  {
    id: 'hospitality',
    number: '03',
    title: 'Hospitality Design',
    subtitle: 'Memorable Guest Experiences',
    description: 'Design destinations that guests never forget. Our hospitality designs create immersive experiences for luxury hotels, boutique resorts, fine-dining restaurants, and upscale bars. We understand that in hospitality, design is the first impression and the lasting memory — and we craft spaces that tell compelling stories.',
    features: ['Hotel & Resort Interior Design', 'Restaurant & Bar Design', 'Spa & Wellness Center Design', 'Guest Experience Optimization', 'F&B Flow Engineering', 'Ambiance & Mood Engineering'],
    image: '/images/portfolio-dining.png',
    startingPrice: '15,00,000',
  },
  {
    id: 'renovation',
    number: '04',
    title: 'Luxury Renovation',
    subtitle: 'Reimagined Elegance',
    description: 'Breathe new life into existing spaces. Our renovation expertise transforms outdated interiors into contemporary masterpieces while respecting the character and heritage of the original architecture. We specialize in complete transformations that feel both fresh and timeless, delivering spaces that surprise and delight.',
    features: ['Complete Interior Overhaul', 'Heritage Restoration & Preservation', 'Smart Home Retrofitting', 'Structural Modification & Engineering', 'Kitchen & Bathroom Remodeling', 'Energy Efficiency Upgrades'],
    image: '/images/portfolio-bedroom.png',
    startingPrice: '5,00,000',
  },
];

const processSteps = [
  { step: '01', title: 'Discovery', desc: 'An in-depth consultation where we immerse ourselves in your vision, lifestyle, and aspirations. We study your space, understand your needs, and define the project scope with precision.', icon: '◇' },
  { step: '02', title: 'Concept', desc: 'We translate your vision into tangible design concepts through mood boards, 3D visualizations, material palettes, and spatial layouts. Every detail is explored before execution begins.', icon: '◆' },
  { step: '03', title: 'Creation', desc: 'Our master craftsmen, trusted artisans, and project managers bring the design to life with meticulous attention to detail. Weekly updates ensure complete transparency throughout.', icon: '○' },
  { step: '04', title: 'Reveal', desc: 'The breathtaking moment when your transformed space is unveiled in its full glory. A comprehensive handover with documentation, care guides, and our 10-year warranty.', icon: '□' },
];

const faqs = [
  { q: 'What is the typical timeline for a residential project?', a: 'A standard residential project typically takes 3-6 months from concept to completion, depending on the scope and complexity. We provide a detailed timeline during the Discovery phase and adhere to it with military precision.' },
  { q: 'Do you handle procurement and installation?', a: 'Absolutely. We manage the entire process end-to-end — from sourcing materials globally to manufacturing custom furniture and final installation. You never have to coordinate with multiple vendors.' },
  { q: 'Can I be involved in the design process?', a: 'We encourage it! Your vision is our foundation. We involve you at every key decision point while our experts handle the technical execution. The result is a space that is authentically yours.' },
  { q: 'What areas do you serve?', a: 'We operate across India with studios in Mumbai, Delhi, Bangalore, and Hyderabad. For premium projects, we also offer services internationally on a case-by-case basis.' },
  { q: 'What does your warranty cover?', a: 'Our comprehensive 10-year warranty covers all structural work, custom furniture, and installed fixtures. This reflects our absolute confidence in the quality of every element we deliver.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } }),
};

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-80px' });
  const serviceInView = useInView(serviceRef, { once: true, margin: '-80px' });
  const processInView = useInView(processRef, { once: true, margin: '-80px' });
  const pricingInView = useInView(pricingRef, { once: true, margin: '-80px' });
  const faqInView = useInView(faqRef, { once: true, margin: '-80px' });

  return (
    <SiteLayout>
      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/services-hero.png')" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]/40" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pb-16 pt-32 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-[#C9A96E]" />
              <span className="font-[family-name:var(--font-inter)] text-[#C9A96E] text-xs tracking-[0.4em] uppercase">Our Services</span>
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl lg:text-7xl text-white leading-tight">
              Crafting <span className="text-gradient-gold italic">Masterpieces</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ===== SERVICES DETAIL ===== */}
      <section ref={serviceRef} className="py-28 md:py-36 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div initial="hidden" animate={serviceInView ? 'visible' : 'hidden'} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            {/* Service tabs */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
              {/* Left: Tab navigation */}
              <motion.div variants={fadeUp} className="lg:w-1/3 flex flex-row lg:flex-col gap-2 overflow-x-auto horizontal-scroll pb-4 lg:pb-0">
                {services.map((svc, i) => (
                  <button
                    key={svc.id}
                    onClick={() => setActiveService(i)}
                    className={`flex-shrink-0 text-left px-6 py-5 border-l-2 transition-all duration-500 cursor-hover group min-w-[200px] lg:min-w-0 lg:w-full ${
                      activeService === i ? 'border-[#C9A96E] bg-[#C9A96E]/5' : 'border-white/10 hover:border-[#C9A96E]/40'
                    }`}
                  >
                    <span className="font-[family-name:var(--font-inter)] text-[10px] text-[#C9A96E]/50 tracking-[0.2em] uppercase block">{svc.number}</span>
                    <span className={`font-[family-name:var(--font-playfair)] text-lg transition-colors duration-300 block ${activeService === i ? 'text-[#C9A96E]' : 'text-white/60 group-hover:text-white'}`}>
                      {svc.title}
                    </span>
                    <span className="font-[family-name:var(--font-cormorant)] text-white/30 text-sm block mt-1">{svc.subtitle}</span>
                  </button>
                ))}
              </motion.div>

              {/* Right: Content */}
              <div className="lg:w-2/3 lg:pl-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <div className="relative overflow-hidden mb-8">
                      <div className="aspect-[16/9] overflow-hidden">
                        <img src={services[activeService].image} alt={services[activeService].title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
                      </div>
                      <div className="absolute top-6 right-6 font-[family-name:var(--font-playfair)] text-8xl text-[#C9A96E]/10">
                        {services[activeService].number}
                      </div>
                    </div>

                    <h3 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-white mb-4">{services[activeService].title}</h3>
                    <p className="font-[family-name:var(--font-cormorant)] text-white/50 text-lg leading-relaxed mb-8">{services[activeService].description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {services[activeService].features.map((f, i) => (
                        <motion.div key={f} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08, duration: 0.4 }} className="flex items-center gap-3 group cursor-hover">
                          <div className="w-1.5 h-1.5 bg-[#C9A96E] rotate-45 group-hover:rotate-[225deg] transition-transform duration-500" />
                          <span className="font-[family-name:var(--font-inter)] text-white/60 text-sm">{f}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                      <div className="glass-card px-6 py-4">
                        <span className="font-[family-name:var(--font-inter)] text-white/30 text-[10px] tracking-[0.2em] uppercase block">Starting from</span>
                        <span className="font-[family-name:var(--font-playfair)] text-[#C9A96E] text-2xl">&#8377;{services[activeService].startingPrice}</span>
                      </div>
                      <Link href="/contact" className="magnetic-btn inline-flex items-center gap-3 text-[#C9A96E] text-xs tracking-[0.2em] uppercase cursor-hover group">
                        Start Your Project <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section ref={processRef} className="py-28 md:py-36 relative overflow-hidden bg-[#080808]">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div initial="hidden" animate={processInView ? 'visible' : 'hidden'} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-8 h-[1px] bg-[#C9A96E]" />
                <span className="font-[family-name:var(--font-inter)] text-[#C9A96E] text-xs tracking-[0.4em] uppercase">How We Work</span>
                <div className="w-8 h-[1px] bg-[#C9A96E]" />
              </div>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-white">
                Our <span className="text-gradient-gold italic">Process</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {processSteps.map((step, i) => (
                <motion.div key={step.step} variants={fadeUp} custom={i * 0.1} className="relative group cursor-hover" whileHover={{ y: -5 }}>
                  <div className="glass-card p-8 h-full transition-all duration-500 hover:border-[rgba(201,169,110,0.3)]">
                    <span className="text-[#C9A96E] text-3xl block mb-4">{step.icon}</span>
                    <span className="font-[family-name:var(--font-playfair)] text-3xl text-[#C9A96E]/20 block mb-3 group-hover:text-[#C9A96E]/40 transition-colors duration-300">{step.step}</span>
                    <h4 className="font-[family-name:var(--font-playfair)] text-white text-xl mb-3">{step.title}</h4>
                    <p className="font-[family-name:var(--font-cormorant)] text-white/40 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                  {i < 3 && <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-[1px] bg-[#C9A96E]/20" />}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== PRICING TIERS ===== */}
      <section ref={pricingRef} className="py-28 md:py-36 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div initial="hidden" animate={pricingInView ? 'visible' : 'hidden'} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-8 h-[1px] bg-[#C9A96E]" />
                <span className="font-[family-name:var(--font-inter)] text-[#C9A96E] text-xs tracking-[0.4em] uppercase">Investment</span>
                <div className="w-8 h-[1px] bg-[#C9A96E]" />
              </div>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-white">
                Design <span className="text-gradient-gold italic">Packages</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Essential', price: '8,00,000', desc: 'Perfect for apartments and compact spaces', features: ['Space Planning', 'Concept & Mood Board', 'Material Selection', 'Basic Lighting Design', '2 Revision Rounds', '5-Year Warranty'] },
                { name: 'Premium', price: '18,00,000', desc: 'Ideal for villas and luxury residences', features: ['Everything in Essential', 'Custom Furniture Design', '3D Photorealistic Renders', 'Smart Home Integration', '5 Revision Rounds', '10-Year Warranty', 'Art Curation & Styling'] },
                { name: 'Bespoke', price: '35,00,000+', desc: 'For those who accept nothing but extraordinary', features: ['Everything in Premium', 'Dedicated Design Director', 'Global Material Sourcing', 'Bespoke Artisan Pieces', 'Unlimited Revisions', 'Lifetime Design Support', 'VIP Project Priority', 'Concierge Service'] },
              ].map((tier, i) => (
                <motion.div
                  key={tier.name}
                  variants={fadeUp}
                  custom={i * 0.1}
                  className={`glass-card p-8 relative overflow-hidden transition-all duration-500 cursor-hover ${i === 2 ? 'border-[#C9A96E]/30 ring-1 ring-[#C9A96E]/10' : ''}`}
                  whileHover={{ y: -6 }}
                >
                  {i === 2 && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C9A96E] to-[#E8D5A8]" />
                  )}
                  {i === 2 && (
                    <span className="absolute top-4 right-4 px-3 py-1 bg-[#C9A96E] text-[#0a0a0a] text-[9px] tracking-[0.2em] uppercase font-bold">Most Popular</span>
                  )}
                  <h3 className="font-[family-name:var(--font-inter)] text-white/40 text-xs tracking-[0.3em] uppercase mb-2">{tier.name}</h3>
                  <div className="font-[family-name:var(--font-playfair)] text-3xl text-gradient-gold mb-2">&#8377;{tier.price}</div>
                  <p className="font-[family-name:var(--font-cormorant)] text-white/30 text-base mb-8">{tier.desc}</p>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-[#C9A96E] rotate-45 flex-shrink-0" />
                        <span className="font-[family-name:var(--font-inter)] text-white/50 text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className={`block text-center py-3 text-xs tracking-[0.2em] uppercase transition-all duration-500 cursor-hover ${i === 2 ? 'bg-[#C9A96E] text-[#0a0a0a] hover:bg-[#E8D5A8]' : 'border border-[#C9A96E]/30 text-[#C9A96E] hover:bg-[#C9A96E]/5'}`}>
                    Get Started
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section ref={faqRef} className="py-28 md:py-36 relative overflow-hidden bg-[#080808]">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent" />
        <div className="max-w-[800px] mx-auto px-6 md:px-12">
          <motion.div initial="hidden" animate={faqInView ? 'visible' : 'hidden'} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-white">
                Frequently <span className="text-gradient-gold italic">Asked</span>
              </h2>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.div key={i} variants={fadeUp} custom={i * 0.05} className="glass-card overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between cursor-hover"
                  >
                    <span className="font-[family-name:var(--font-playfair)] text-white text-lg pr-4">{faq.q}</span>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      className="text-[#C9A96E] text-xl flex-shrink-0"
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="px-6 pb-5 font-[family-name:var(--font-cormorant)] text-white/50 text-base leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </SiteLayout>
  );
}
