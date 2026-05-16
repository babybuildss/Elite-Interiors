'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y, scale }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-main.png')" }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/50 to-[#0a0a0a]" />
        {/* Gold gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/60" />
      </motion.div>

      {/* Floating geometric elements */}
      <motion.div
        className="absolute top-1/4 left-[10%] w-32 h-32 border border-[#C9A96E]/10 rotate-45 z-[1]"
        animate={{
          x: mousePos.x * 0.5,
          y: mousePos.y * 0.5,
          rotate: [45, 90, 45],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-[10%] w-24 h-24 border border-[#C9A96E]/8 z-[1]"
        animate={{
          x: mousePos.x * -0.3,
          y: mousePos.y * -0.3,
          rotate: [0, 360],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute top-1/3 right-[20%] w-2 h-2 bg-[#C9A96E]/30 rounded-full z-[1]"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/3 left-[15%] w-1.5 h-1.5 bg-[#C9A96E]/20 rounded-full z-[1]"
        animate={{
          y: [0, 15, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Hero Content */}
      <motion.div
        className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center"
        style={{ opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Subtitle */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mb-6">
          <div className="w-12 h-[1px] bg-[#C9A96E]" />
          <span className="font-[family-name:var(--font-inter)] text-[#C9A96E] text-xs tracking-[0.5em] uppercase">
            Luxury Interior Design Studio
          </span>
          <div className="w-12 h-[1px] bg-[#C9A96E]" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          variants={itemVariants}
          className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl lg:text-[6.5rem] text-white leading-[0.95] mb-6"
        >
          Where Vision
          <br />
          Meets{' '}
          <span className="text-gradient-gold italic">Elegance</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="font-[family-name:var(--font-cormorant)] text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          We craft extraordinary living spaces that transcend the ordinary.
          Every detail curated, every surface perfected, every moment unforgettable.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="magnetic-btn px-10 py-4 bg-gradient-to-r from-[#C9A96E] to-[#A07D44] text-[#0a0a0a] text-xs tracking-[0.25em] uppercase font-semibold hover:shadow-[0_0_40px_rgba(201,169,110,0.3)] transition-all duration-500 cursor-hover"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Our Work
          </motion.a>
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="magnetic-btn px-10 py-4 border border-[#C9A96E]/30 text-[#C9A96E] text-xs tracking-[0.25em] uppercase hover:border-[#C9A96E] hover:bg-[#C9A96E]/5 transition-all duration-500 cursor-hover"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Consultation
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex items-center justify-center gap-8 md:gap-16"
        >
          {[
            { number: '150+', label: 'Projects Completed' },
            { number: '12+', label: 'Years Experience' },
            { number: '98%', label: 'Client Satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-gradient-gold">
                {stat.number}
              </div>
              <div className="font-[family-name:var(--font-inter)] text-[10px] text-white/30 tracking-[0.2em] uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="font-[family-name:var(--font-inter)] text-[10px] text-white/30 tracking-[0.3em] uppercase">
          Scroll
        </span>
        <motion.div
          className="w-[1px] h-12 bg-gradient-to-b from-[#C9A96E] to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Side decoration */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4 z-10">
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent to-[#C9A96E]/30" />
        <span className="font-[family-name:var(--font-inter)] text-[9px] text-[#C9A96E]/40 tracking-[0.3em] uppercase [writing-mode:vertical-lr]">
          Est. 2012
        </span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-[#C9A96E]/30 to-transparent" />
      </div>
    </section>
  );
}
