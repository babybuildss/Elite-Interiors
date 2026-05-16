'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import SiteLayout from '@/components/SiteLayout';
import HeroCarousel from '@/components/HeroCarousel';
import TiltCard from '@/components/TiltCard';
import DepthSection from '@/components/DepthSection';

const heroSlides = [
  { src: '/images/hero-main.png', alt: 'Luxury Living Room' },
  { src: '/images/hero-2.png', alt: 'Grand Double Height Interior' },
  { src: '/images/hero-3.png', alt: 'Grand Entrance Foyer' },
  { src: '/images/hero-4.png', alt: 'Master Bedroom Suite' },
  { src: '/images/hero-5.png', alt: 'Luxury Spa Bathroom' },
];

const heroStats = [
  { number: '150+', label: 'Projects Completed' },
  { number: '12+', label: 'Years Experience' },
  { number: '98%', label: 'Client Satisfaction' },
];

const whyChooseUs = [
  { icon: '◆', title: 'Bespoke Design', desc: 'Every project is a unique masterpiece tailored to your personality, lifestyle, and aspirations. No templates, no repetitions — only original artistry that speaks your language.' },
  { icon: '◇', title: 'Premium Materials', desc: 'We source the finest materials from across the globe — Italian marble, Swiss hardware, German fittings, and handcrafted Indian artisan pieces that elevate every surface.' },
  { icon: '○', title: 'On-Time Delivery', desc: 'Our military-grade project management ensures your space is delivered on schedule, every single time. No excuses, no delays, only results that exceed expectations.' },
  { icon: '□', title: 'Award-Winning Team', desc: 'Our designers have been recognized by India\'s top design institutions and international bodies. Your project is in the best hands in the industry, guaranteed.' },
  { icon: '△', title: '10-Year Warranty', desc: 'We stand behind every detail with a comprehensive 10-year warranty. Our commitment to quality extends far beyond the handover day — it\'s a lifetime promise.' },
  { icon: '☆', title: 'Smart Integration', desc: 'Seamlessly blend luxury with technology. Smart lighting, automated climate control, and voice-activated systems integrated invisibly into your living experience.' },
];

const featuredServices = [
  { title: 'Residential', desc: 'Penthouses, villas, and apartments transformed into personal sanctuaries of luxury and comfort.', image: '/images/portfolio-living.png' },
  { title: 'Commercial', desc: 'Offices, showrooms, and retail spaces designed to inspire productivity and impress every visitor.', image: '/images/portfolio-office.png' },
  { title: 'Hospitality', desc: 'Hotels, restaurants, and resorts crafted to create unforgettable guest experiences.', image: '/images/portfolio-dining.png' },
];

const featuredProjects = [
  { title: 'The Sapphire Penthouse', location: 'Mumbai', category: 'Residential', image: '/images/portfolio-living.png' },
  { title: 'Café Lumière', location: 'Delhi', category: 'Hospitality', image: '/images/portfolio-dining.png' },
  { title: 'The Onyx Kitchen', location: 'Goa', category: 'Residential', image: '/images/portfolio-kitchen.png' },
];

const testimonials = [
  { quote: 'Elite Interiors didn\'t just design our home — they translated our dreams into reality. Every corner whispers luxury, every room tells our story. It\'s not a house anymore, it\'s a masterpiece we live in.', name: 'Rajesh Sharma', title: 'CEO, Meridian Group', initials: 'RS' },
  { quote: 'Working with Elite was a transformative experience. They understood our brand essence and translated it into a workspace that inspires our entire team daily. The attention to detail is simply unmatched.', name: 'Priya Kapoor', title: 'Founder, KapLux Brands', initials: 'PK' },
  { quote: 'From concept to completion, the Elite team exceeded every expectation. Our restaurant has become the most photographed dining space in the city, and we owe it all to their vision and execution.', name: 'Vikram Mehta', title: 'Owner, The Amber Room', initials: 'VM' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.9, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } }),
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (d = 0) => ({ opacity: 1, scale: 1, transition: { duration: 0.8, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } }),
};

export default function HomePage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const whyRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const testRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const whyInView = useInView(whyRef, { once: true, margin: '-60px' });
  const servicesInView = useInView(servicesRef, { once: true, margin: '-60px' });
  const projectsInView = useInView(projectsRef, { once: true, margin: '-60px' });
  const testInView = useInView(testRef, { once: true, margin: '-60px' });
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: (e.clientX / window.innerWidth - 0.5) * 30, y: (e.clientY / window.innerHeight - 0.5) * 30 });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <SiteLayout>
      {/* ===== 3D HERO WITH CAROUSEL ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ perspective: '1200px' }}>
        <HeroCarousel images={heroSlides} autoPlayInterval={5000}>
          <div className="min-h-screen flex items-center justify-center">
            {/* Floating 3D geometry */}
            <motion.div
              className="absolute top-1/4 left-[10%] w-32 h-32 border border-[#C9A96E]/10 rotate-45 z-[1]"
              style={{ transform: `translate3d(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px, 50px)` }}
              animate={{ rotate: [45, 90, 45] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute bottom-1/4 right-[10%] w-24 h-24 border border-[#C9A96E]/8 z-[1]"
              style={{ transform: `translate3d(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px, 30px)` }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute top-1/3 right-[20%] w-2 h-2 bg-[#C9A96E]/30 rounded-full z-[1]"
              style={{ transform: `translate3d(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px, 20px)` }}
              animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Hero content with 3D depth */}
            <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center" style={{ transform: 'translateZ(0)' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex items-center justify-center gap-4 mb-6"
              >
                <div className="w-12 h-[1px] bg-[#C9A96E]" />
                <span className="font-[family-name:var(--font-inter)] text-[#C9A96E] text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] uppercase">Luxury Interior Design Studio</span>
                <div className="w-12 h-[1px] bg-[#C9A96E]" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 50, rotateX: 10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.5, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-7xl lg:text-[6.5rem] text-white leading-[0.95] mb-6"
                style={{ transformStyle: 'preserve-3d' }}
              >
                Where Vision<br />Meets <span className="text-gradient-gold italic" style={{ transform: 'translateZ(40px)' }}>Elegance</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="font-[family-name:var(--font-cormorant)] text-white/50 text-base md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
              >
                We craft extraordinary living spaces that transcend the ordinary.
                Every detail curated, every surface perfected, every moment unforgettable.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link href="/portfolio" className="magnetic-btn px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-[#C9A96E] to-[#A07D44] text-[#0a0a0a] text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.25em] uppercase font-semibold hover:shadow-[0_0_40px_rgba(201,169,110,0.3)] transition-all duration-500 cursor-hover">
                  Explore Our Work
                </Link>
                <Link href="/contact" className="magnetic-btn px-8 md:px-10 py-3 md:py-4 border border-[#C9A96E]/30 text-[#C9A96E] text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.25em] uppercase hover:border-[#C9A96E] hover:bg-[#C9A96E]/5 transition-all duration-500 cursor-hover">
                  Book Consultation
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.8 }}
                className="mt-12 md:mt-16 flex items-center justify-center gap-6 md:gap-16"
              >
                {heroStats.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="font-[family-name:var(--font-playfair)] text-xl md:text-3xl text-gradient-gold">{s.number}</div>
                    <div className="font-[family-name:var(--font-inter)] text-[8px] md:text-[10px] text-white/30 tracking-[0.15em] md:tracking-[0.2em] uppercase mt-1">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </HeroCarousel>

        {/* Side decoration */}
        <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4 z-[6]">
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-[#C9A96E]/30" />
          <span className="font-[family-name:var(--font-inter)] text-[8px] text-[#C9A96E]/40 tracking-[0.3em] uppercase [writing-mode:vertical-lr]">Est. 2012</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-[#C9A96E]/30 to-transparent" />
        </div>
      </section>

      {/* ===== WHY CHOOSE US — 3D Cards ===== */}
      <section ref={whyRef} className="py-20 md:py-36 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent" />
        {/* 3D ambient glow */}
        <motion.div className="absolute -left-40 top-1/3 w-80 h-80 rounded-full bg-[#C9A96E]/[0.02] blur-[100px]" animate={{ scale: [1, 1.3, 1], opacity: [0.02, 0.05, 0.02] }} transition={{ duration: 10, repeat: Infinity }} />
        <div className="max-w-[1400px] mx-auto px-5 md:px-12">
          <motion.div initial="hidden" animate={whyInView ? 'visible' : 'hidden'} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}>
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-4">
              <div className="w-6 md:w-8 h-[1px] bg-[#C9A96E]" />
              <span className="font-[family-name:var(--font-inter)] text-[#C9A96E] text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase">Why Elite Interiors</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
              The Elite <span className="text-gradient-gold italic">Difference</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="font-[family-name:var(--font-cormorant)] text-white/40 text-base md:text-lg max-w-2xl mb-10 md:mb-16">
              What sets us apart isn&apos;t just what we design — it&apos;s how we think, how we craft,
              and how we obsess over every detail that others would overlook.
            </motion.p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" style={{ perspective: '1200px' }}>
              {whyChooseUs.map((item, i) => (
                <motion.div key={item.title} variants={scaleUp} custom={i * 0.08}>
                  <TiltCard tiltAmount={8} className="glass-card p-6 md:p-8 cursor-hover group transition-all duration-500 hover:border-[rgba(201,169,110,0.3)]" glareEnabled>
                    <span className="text-[#C9A96E] text-xl md:text-2xl block mb-3 md:mb-4 group-hover:scale-125 transition-transform duration-500">{item.icon}</span>
                    <h3 className="font-[family-name:var(--font-playfair)] text-white text-lg md:text-xl mb-2 md:mb-3">{item.title}</h3>
                    <p className="font-[family-name:var(--font-cormorant)] text-white/40 text-sm md:text-base leading-relaxed">{item.desc}</p>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURED SERVICES — 3D Image Cards ===== */}
      <section ref={servicesRef} className="py-20 md:py-36 relative overflow-hidden bg-[#080808]">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-5 md:px-12">
          <motion.div initial="hidden" animate={servicesInView ? 'visible' : 'hidden'} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-4">
              <div className="w-6 md:w-8 h-[1px] bg-[#C9A96E]" />
              <span className="font-[family-name:var(--font-inter)] text-[#C9A96E] text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase">What We Do</span>
            </motion.div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10 md:mb-16">
              <motion.h2 variants={fadeUp} className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl lg:text-6xl text-white leading-tight">
                Our <span className="text-gradient-gold italic">Expertise</span>
              </motion.h2>
              <motion.div variants={fadeUp}>
                <Link href="/services" className="inline-flex items-center gap-3 text-[#C9A96E] text-xs tracking-[0.2em] uppercase cursor-hover group mt-4 lg:mt-0">
                  View All Services <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </Link>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 md:gap-6" style={{ perspective: '1200px' }}>
              {featuredServices.map((svc, i) => (
                <motion.div key={svc.title} variants={scaleUp} custom={i * 0.1}>
                  <TiltCard tiltAmount={6} className="cursor-pointer">
                    <Link href="/services" className="block group cursor-hover">
                      <div className="relative overflow-hidden aspect-[4/3] mb-0">
                        <img src={svc.image} alt={svc.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-[#0a0a0a]/20 to-transparent group-hover:from-[#0a0a0a]/60 transition-all duration-500" />
                        <div className="absolute bottom-6 left-6 right-6">
                          <h3 className="font-[family-name:var(--font-playfair)] text-white text-xl md:text-2xl mb-2 group-hover:text-[#C9A96E] transition-colors duration-300">{svc.title}</h3>
                          <p className="font-[family-name:var(--font-cormorant)] text-white/50 text-sm md:text-base">{svc.desc}</p>
                        </div>
                        <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#C9A96E]/0 group-hover:border-[#C9A96E]/40 transition-all duration-500" />
                      </div>
                    </Link>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURED PROJECTS — 3D Hover Cards ===== */}
      <DepthSection ref={projectsRef} className="py-20 md:py-36">
        <div className="max-w-[1400px] mx-auto px-5 md:px-12">
          <motion.div initial="hidden" animate={projectsInView ? 'visible' : 'hidden'} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-4">
              <div className="w-6 md:w-8 h-[1px] bg-[#C9A96E]" />
              <span className="font-[family-name:var(--font-inter)] text-[#C9A96E] text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase">Featured Work</span>
            </motion.div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10 md:mb-16">
              <motion.h2 variants={fadeUp} className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl lg:text-6xl text-white leading-tight">
                Recent <span className="text-gradient-gold italic">Projects</span>
              </motion.h2>
              <motion.div variants={fadeUp}>
                <Link href="/portfolio" className="inline-flex items-center gap-3 text-[#C9A96E] text-xs tracking-[0.2em] uppercase cursor-hover group mt-4 lg:mt-0">
                  View All Projects <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </Link>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 md:gap-6" style={{ perspective: '1200px' }}>
              {featuredProjects.map((proj, i) => (
                <motion.div key={proj.title} variants={scaleUp} custom={i * 0.1}>
                  <TiltCard tiltAmount={8} className="cursor-pointer">
                    <Link href="/portfolio" className="block group cursor-hover">
                      <div className="relative overflow-hidden aspect-[3/4]">
                        <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                        <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
                          <span className="px-3 py-1 bg-[#C9A96E]/20 backdrop-blur-sm border border-[#C9A96E]/30 text-[#C9A96E] text-[9px] md:text-[10px] tracking-[0.2em] uppercase w-fit mb-2 md:mb-3">
                            {proj.category}
                          </span>
                          <h3 className="font-[family-name:var(--font-playfair)] text-white text-lg md:text-xl group-hover:text-[#C9A96E] transition-colors duration-300">{proj.title}</h3>
                          <p className="font-[family-name:var(--font-inter)] text-white/30 text-[10px] md:text-xs mt-1">{proj.location}</p>
                        </div>
                      </div>
                    </Link>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </DepthSection>

      {/* ===== TESTIMONIALS — 3D Floating Cards ===== */}
      <section ref={testRef} className="py-20 md:py-36 relative overflow-hidden bg-[#080808]">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-5 md:px-12">
          <motion.div initial="hidden" animate={testInView ? 'visible' : 'hidden'} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="text-center mb-10 md:mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-6 md:w-8 h-[1px] bg-[#C9A96E]" />
                <span className="font-[family-name:var(--font-inter)] text-[#C9A96E] text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase">Testimonials</span>
                <div className="w-6 md:w-8 h-[1px] bg-[#C9A96E]" />
              </div>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl text-white">
                What Our <span className="text-gradient-gold italic">Clients</span> Say
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-4 md:gap-6" style={{ perspective: '1200px' }}>
              {testimonials.map((t, i) => (
                <motion.div key={t.name} variants={scaleUp} custom={i * 0.1}>
                  <TiltCard tiltAmount={6} className="glass-card p-6 md:p-8 relative">
                    <div className="absolute top-4 right-6 font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-[#C9A96E]/10">&ldquo;</div>
                    <div className="flex items-center gap-1 mb-4 md:mb-6">
                      {[...Array(5)].map((_, j) => (
                        <span key={j} className="text-[#C9A96E] text-xs md:text-sm">★</span>
                      ))}
                    </div>
                    <p className="font-[family-name:var(--font-cormorant)] text-white/60 text-base md:text-lg leading-relaxed mb-6 md:mb-8 italic">{t.quote}</p>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#C9A96E]/20 flex items-center justify-center">
                        <span className="font-[family-name:var(--font-playfair)] text-[#C9A96E] text-xs md:text-sm">{t.initials}</span>
                      </div>
                      <div>
                        <p className="font-[family-name:var(--font-inter)] text-white/80 text-xs md:text-sm">{t.name}</p>
                        <p className="font-[family-name:var(--font-inter)] text-white/30 text-[10px] md:text-xs">{t.title}</p>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA — 3D Depth Section ===== */}
      <DepthSection ref={ctaRef} bgImage="/images/contact-hero.png" className="py-20 md:py-36">
        <motion.div initial="hidden" animate={ctaInView ? 'visible' : 'hidden'} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }} className="relative max-w-[900px] mx-auto px-5 md:px-12 text-center">
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 md:w-12 h-[1px] bg-[#C9A96E]" />
            <span className="font-[family-name:var(--font-inter)] text-[#C9A96E] text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] uppercase">Start Your Journey</span>
            <div className="w-8 md:w-12 h-[1px] bg-[#C9A96E]" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
            Your Dream Space<br />Awaits <span className="text-gradient-gold italic">You</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="font-[family-name:var(--font-cormorant)] text-white/50 text-base md:text-lg max-w-xl mx-auto mb-8 md:mb-10 leading-relaxed">
            Take the first step towards transforming your space. Book a complimentary consultation and discover the Elite experience.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="magnetic-btn px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-[#C9A96E] to-[#A07D44] text-[#0a0a0a] text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.25em] uppercase font-semibold hover:shadow-[0_0_40px_rgba(201,169,110,0.3)] transition-all duration-500 cursor-hover">
              Book Free Consultation
            </Link>
            <a href="tel:+919876543210" className="magnetic-btn px-8 md:px-10 py-3 md:py-4 border border-[#C9A96E]/30 text-[#C9A96E] text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.25em] uppercase hover:border-[#C9A96E] hover:bg-[#C9A96E]/5 transition-all duration-500 cursor-hover">
              Call +91 98765 43210
            </a>
          </motion.div>
        </motion.div>
      </DepthSection>
    </SiteLayout>
  );
}
