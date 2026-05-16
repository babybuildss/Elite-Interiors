'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import SiteLayout from '@/components/SiteLayout';

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */
const heroStats = [
  { number: '150+', label: 'Projects Completed' },
  { number: '12+', label: 'Years Experience' },
  { number: '98%', label: 'Client Satisfaction' },
];

const whyChooseUs = [
  {
    icon: '◆',
    title: 'Bespoke Design',
    desc: 'Every project is a unique masterpiece tailored to your personality, lifestyle, and aspirations. No templates, no repetitions — only original artistry.',
  },
  {
    icon: '◇',
    title: 'Premium Materials',
    desc: 'We source the finest materials from across the globe — Italian marble, Swiss hardware, German fittings, and handcrafted Indian artisan pieces.',
  },
  {
    icon: '○',
    title: 'On-Time Delivery',
    desc: 'Our military-grade project management ensures your space is delivered on schedule, every single time. No excuses, no delays, only results.',
  },
  {
    icon: '□',
    title: 'Award-Winning Team',
    desc: 'Our designers have been recognized by India\'s top design institutions and international bodies. Your project is in the best hands in the industry.',
  },
  {
    icon: '△',
    title: '10-Year Warranty',
    desc: 'We stand behind every detail with a comprehensive 10-year warranty. Our commitment to quality extends far beyond the handover day.',
  },
  {
    icon: '☆',
    title: 'Smart Integration',
    desc: 'Seamlessly blend luxury with technology. Smart lighting, automated climate control, and voice-activated systems integrated invisibly into your space.',
  },
];

const featuredServices = [
  {
    title: 'Residential',
    desc: 'Penthouses, villas, and apartments transformed into personal sanctuaries of luxury and comfort.',
    image: '/images/portfolio-living.png',
    href: '/services',
  },
  {
    title: 'Commercial',
    desc: 'Offices, showrooms, and retail spaces designed to inspire productivity and impress every visitor.',
    image: '/images/portfolio-office.png',
    href: '/services',
  },
  {
    title: 'Hospitality',
    desc: 'Hotels, restaurants, and resorts crafted to create unforgettable guest experiences.',
    image: '/images/portfolio-dining.png',
    href: '/services',
  },
];

const featuredProjects = [
  {
    title: 'The Sapphire Penthouse',
    location: 'Mumbai',
    category: 'Residential',
    image: '/images/portfolio-living.png',
  },
  {
    title: 'Café Lumière',
    location: 'Delhi',
    category: 'Hospitality',
    image: '/images/portfolio-dining.png',
  },
  {
    title: 'The Onyx Kitchen',
    location: 'Goa',
    category: 'Residential',
    image: '/images/portfolio-kitchen.png',
  },
];

const testimonials = [
  {
    quote: 'Elite Interiors didn\'t just design our home — they translated our dreams into reality. Every corner whispers luxury, every room tells our story.',
    name: 'Rajesh Sharma',
    title: 'CEO, Meridian Group',
    initials: 'RS',
  },
  {
    quote: 'Working with Elite was a transformative experience. They understood our brand essence and translated it into a workspace that inspires our entire team daily.',
    name: 'Priya Kapoor',
    title: 'Founder, KapLux Brands',
    initials: 'PK',
  },
  {
    quote: 'From concept to completion, the Elite team exceeded every expectation. Our restaurant has become the most photographed dining space in the city.',
    name: 'Vikram Mehta',
    title: 'Owner, The Amber Room',
    initials: 'VM',
  },
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */
export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: (e.clientX / window.innerWidth - 0.5) * 20, y: (e.clientY / window.innerHeight - 0.5) * 20 });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  // InView refs
  const whyRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const testRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const whyInView = useInView(whyRef, { once: true, margin: '-80px' });
  const servicesInView = useInView(servicesRef, { once: true, margin: '-80px' });
  const projectsInView = useInView(projectsRef, { once: true, margin: '-80px' });
  const testInView = useInView(testRef, { once: true, margin: '-80px' });
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' });

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } }),
  };

  return (
    <SiteLayout>
      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY, scale: heroScale }}>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-main.png')" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/40 to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/50 via-transparent to-[#0a0a0a]/50" />
        </motion.div>

        {/* Floating geometry */}
        <motion.div className="absolute top-1/4 left-[10%] w-32 h-32 border border-[#C9A96E]/10 rotate-45 z-[1]" animate={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5, rotate: [45, 90, 45] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} />
        <motion.div className="absolute bottom-1/4 right-[10%] w-24 h-24 border border-[#C9A96E]/8 z-[1]" animate={{ x: mousePos.x * -0.3, y: mousePos.y * -0.3, rotate: [0, 360] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} />
        <motion.div className="absolute top-1/3 right-[20%] w-2 h-2 bg-[#C9A96E]/30 rounded-full z-[1]" animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />

        <motion.div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center" style={{ opacity: heroOpacity }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-[#C9A96E]" />
            <span className="font-[family-name:var(--font-inter)] text-[#C9A96E] text-xs tracking-[0.5em] uppercase">Luxury Interior Design Studio</span>
            <div className="w-12 h-[1px] bg-[#C9A96E]" />
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }} className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl lg:text-[6.5rem] text-white leading-[0.95] mb-6">
            Where Vision<br />Meets <span className="text-gradient-gold italic">Elegance</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }} className="font-[family-name:var(--font-cormorant)] text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            We craft extraordinary living spaces that transcend the ordinary.
            Every detail curated, every surface perfected, every moment unforgettable.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/portfolio" className="magnetic-btn px-10 py-4 bg-gradient-to-r from-[#C9A96E] to-[#A07D44] text-[#0a0a0a] text-xs tracking-[0.25em] uppercase font-semibold hover:shadow-[0_0_40px_rgba(201,169,110,0.3)] transition-all duration-500 cursor-hover">
              Explore Our Work
            </Link>
            <Link href="/contact" className="magnetic-btn px-10 py-4 border border-[#C9A96E]/30 text-[#C9A96E] text-xs tracking-[0.25em] uppercase hover:border-[#C9A96E] hover:bg-[#C9A96E]/5 transition-all duration-500 cursor-hover">
              Book Consultation
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.8 }} className="mt-16 flex items-center justify-center gap-8 md:gap-16">
            {heroStats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-gradient-gold">{s.number}</div>
                <div className="font-[family-name:var(--font-inter)] text-[10px] text-white/30 tracking-[0.2em] uppercase mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}>
          <span className="font-[family-name:var(--font-inter)] text-[10px] text-white/30 tracking-[0.3em] uppercase">Scroll</span>
          <motion.div className="w-[1px] h-12 bg-gradient-to-b from-[#C9A96E] to-transparent" animate={{ scaleY: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
        </motion.div>

        <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4 z-10">
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent to-[#C9A96E]/30" />
          <span className="font-[family-name:var(--font-inter)] text-[9px] text-[#C9A96E]/40 tracking-[0.3em] uppercase [writing-mode:vertical-lr]">Est. 2012</span>
          <div className="w-[1px] h-20 bg-gradient-to-b from-[#C9A96E]/30 to-transparent" />
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section ref={whyRef} className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div initial="hidden" animate={whyInView ? 'visible' : 'hidden'} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-[#C9A96E]" />
              <span className="font-[family-name:var(--font-inter)] text-[#C9A96E] text-xs tracking-[0.4em] uppercase">Why Elite Interiors</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
              The Elite <span className="text-gradient-gold italic">Difference</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="font-[family-name:var(--font-cormorant)] text-white/40 text-lg max-w-2xl mb-16">
              What sets us apart isn&apos;t just what we design — it&apos;s how we think, how we craft,
              and how we obsess over every detail that others would overlook.
            </motion.p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChooseUs.map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  custom={i * 0.1}
                  className="glass-card p-8 group cursor-hover transition-all duration-500 hover:border-[rgba(201,169,110,0.3)]"
                  whileHover={{ y: -6 }}
                >
                  <span className="text-[#C9A96E] text-2xl block mb-4 group-hover:scale-125 transition-transform duration-500">{item.icon}</span>
                  <h3 className="font-[family-name:var(--font-playfair)] text-white text-xl mb-3">{item.title}</h3>
                  <p className="font-[family-name:var(--font-cormorant)] text-white/40 text-base leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURED SERVICES ===== */}
      <section ref={servicesRef} className="py-28 md:py-36 relative overflow-hidden bg-[#080808]">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div initial="hidden" animate={servicesInView ? 'visible' : 'hidden'} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-[#C9A96E]" />
              <span className="font-[family-name:var(--font-inter)] text-[#C9A96E] text-xs tracking-[0.4em] uppercase">What We Do</span>
            </motion.div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
              <motion.h2 variants={fadeUp} className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
                Our <span className="text-gradient-gold italic">Expertise</span>
              </motion.h2>
              <motion.div variants={fadeUp}>
                <Link href="/services" className="inline-flex items-center gap-3 text-[#C9A96E] text-xs tracking-[0.2em] uppercase cursor-hover group">
                  View All Services <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </Link>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {featuredServices.map((svc, i) => (
                <motion.div key={svc.title} variants={fadeUp} custom={i * 0.1}>
                  <Link href={svc.href} className="block group cursor-hover">
                    <div className="relative overflow-hidden aspect-[4/3] mb-6">
                      <img src={svc.image} alt={svc.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-[#0a0a0a]/20 to-transparent group-hover:from-[#0a0a0a]/60 transition-all duration-500" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="font-[family-name:var(--font-playfair)] text-white text-2xl mb-2 group-hover:text-[#C9A96E] transition-colors duration-300">{svc.title}</h3>
                        <p className="font-[family-name:var(--font-cormorant)] text-white/50 text-base">{svc.desc}</p>
                      </div>
                      <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#C9A96E]/0 group-hover:border-[#C9A96E]/40 transition-all duration-500" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURED PROJECTS ===== */}
      <section ref={projectsRef} className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div initial="hidden" animate={projectsInView ? 'visible' : 'hidden'} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-[#C9A96E]" />
              <span className="font-[family-name:var(--font-inter)] text-[#C9A96E] text-xs tracking-[0.4em] uppercase">Featured Work</span>
            </motion.div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
              <motion.h2 variants={fadeUp} className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
                Recent <span className="text-gradient-gold italic">Projects</span>
              </motion.h2>
              <motion.div variants={fadeUp}>
                <Link href="/portfolio" className="inline-flex items-center gap-3 text-[#C9A96E] text-xs tracking-[0.2em] uppercase cursor-hover group">
                  View All Projects <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </Link>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {featuredProjects.map((proj, i) => (
                <motion.div key={proj.title} variants={fadeUp} custom={i * 0.1} className="group cursor-hover">
                  <Link href="/portfolio">
                    <div className="relative overflow-hidden aspect-[3/4]">
                      <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                      <div className="absolute inset-0 p-6 flex flex-col justify-end">
                        <span className="px-3 py-1 bg-[#C9A96E]/20 backdrop-blur-sm border border-[#C9A96E]/30 text-[#C9A96E] text-[10px] tracking-[0.2em] uppercase w-fit mb-3">
                          {proj.category}
                        </span>
                        <h3 className="font-[family-name:var(--font-playfair)] text-white text-xl group-hover:text-[#C9A96E] transition-colors duration-300">{proj.title}</h3>
                        <p className="font-[family-name:var(--font-inter)] text-white/30 text-xs mt-1">{proj.location}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section ref={testRef} className="py-28 md:py-36 relative overflow-hidden bg-[#080808]">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div initial="hidden" animate={testInView ? 'visible' : 'hidden'} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-8 h-[1px] bg-[#C9A96E]" />
                <span className="font-[family-name:var(--font-inter)] text-[#C9A96E] text-xs tracking-[0.4em] uppercase">Testimonials</span>
                <div className="w-8 h-[1px] bg-[#C9A96E]" />
              </div>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-white">
                What Our <span className="text-gradient-gold italic">Clients</span> Say
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div key={t.name} variants={fadeUp} custom={i * 0.1} className="glass-card p-8 relative">
                  <div className="absolute top-4 right-6 font-[family-name:var(--font-playfair)] text-5xl text-[#C9A96E]/10">&ldquo;</div>
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className="text-[#C9A96E] text-sm">★</span>
                    ))}
                  </div>
                  <p className="font-[family-name:var(--font-cormorant)] text-white/60 text-lg leading-relaxed mb-8 italic">{t.quote}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#C9A96E]/20 flex items-center justify-center">
                      <span className="font-[family-name:var(--font-playfair)] text-[#C9A96E] text-sm">{t.initials}</span>
                    </div>
                    <div>
                      <p className="font-[family-name:var(--font-inter)] text-white/80 text-sm">{t.name}</p>
                      <p className="font-[family-name:var(--font-inter)] text-white/30 text-xs">{t.title}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section ref={ctaRef} className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/contact-hero.png')" }} />
        <div className="absolute inset-0 bg-[#0a0a0a]/85" />
        <motion.div initial="hidden" animate={ctaInView ? 'visible' : 'hidden'} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }} className="relative max-w-[900px] mx-auto px-6 md:px-12 text-center">
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-[#C9A96E]" />
            <span className="font-[family-name:var(--font-inter)] text-[#C9A96E] text-xs tracking-[0.5em] uppercase">Start Your Journey</span>
            <div className="w-12 h-[1px] bg-[#C9A96E]" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
            Your Dream Space<br />Awaits <span className="text-gradient-gold italic">You</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="font-[family-name:var(--font-cormorant)] text-white/50 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Take the first step towards transforming your space. Book a complimentary consultation with our design experts and discover the Elite experience.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="magnetic-btn px-10 py-4 bg-gradient-to-r from-[#C9A96E] to-[#A07D44] text-[#0a0a0a] text-xs tracking-[0.25em] uppercase font-semibold hover:shadow-[0_0_40px_rgba(201,169,110,0.3)] transition-all duration-500 cursor-hover">
              Book Free Consultation
            </Link>
            <a href="tel:+919876543210" className="magnetic-btn px-10 py-4 border border-[#C9A96E]/30 text-[#C9A96E] text-xs tracking-[0.25em] uppercase hover:border-[#C9A96E] hover:bg-[#C9A96E]/5 transition-all duration-500 cursor-hover">
              Call +91 98765 43210
            </a>
          </motion.div>
        </motion.div>
      </section>
    </SiteLayout>
  );
}
