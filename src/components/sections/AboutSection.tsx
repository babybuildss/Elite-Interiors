'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const stats = [
  { number: '150+', label: 'Luxury Projects Delivered', description: 'Across residential and commercial spaces' },
  { number: '12+', label: 'Years of Excellence', description: 'Crafting extraordinary interiors since 2012' },
  { number: '25+', label: 'Design Awards', description: 'Recognized by global design institutions' },
  { number: '98%', label: 'Client Retention', description: 'Our clients return for their next vision' },
];

const values = [
  {
    icon: '◆',
    title: 'Timeless Design',
    description: 'We believe in creating spaces that transcend trends. Every design decision is rooted in principles that endure, ensuring your space remains as breathtaking decades from now as the day it was revealed.',
  },
  {
    icon: '◇',
    title: 'Obsessive Craft',
    description: 'From the stitch of a cushion to the angle of ambient light, no detail is too small. Our obsessive commitment to craftsmanship transforms spaces from beautiful to extraordinary.',
  },
  {
    icon: '○',
    title: 'Client Vision',
    description: 'Your dream is our blueprint. We listen deeply, understand intimately, and translate your vision into reality with precision and artistry that exceeds imagination.',
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section id="about" ref={sectionRef} className="relative py-32 md:py-40 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent" />
      
      <motion.div
        className="absolute -right-20 top-1/4 w-80 h-80 rounded-full bg-[#C9A96E]/3 blur-[100px]"
        style={{ y: parallaxY }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-[#C9A96E]" />
            <span className="font-[family-name:var(--font-inter)] text-[#C9A96E] text-xs tracking-[0.4em] uppercase">
              About Us
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6 max-w-3xl"
          >
            Designing Beyond
            <br />
            <span className="text-gradient-gold italic">Imagination</span>
          </motion.h2>

          {/* Main content grid */}
          <div className="grid lg:grid-cols-2 gap-16 mt-16">
            {/* Left: Image */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative overflow-hidden group">
                <motion.div
                  className="relative aspect-[4/3] overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.6 }}
                >
                  <img
                    src="/images/about-studio.png"
                    alt="Elite Interiors Design Studio"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
                </motion.div>

                {/* Floating badge */}
                <motion.div
                  className="absolute -bottom-6 -right-6 md:right-8 bg-[#0a0a0a] border border-[#C9A96E]/20 p-6 backdrop-blur-xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <div className="font-[family-name:var(--font-playfair)] text-4xl text-gradient-gold">12+</div>
                  <div className="font-[family-name:var(--font-inter)] text-[10px] text-white/40 tracking-[0.2em] uppercase mt-1">
                    Years of Excellence
                  </div>
                </motion.div>
              </div>

              {/* Decorative line */}
              <div className="absolute top-8 -left-4 w-[1px] h-24 bg-gradient-to-b from-[#C9A96E]/40 to-transparent" />
            </motion.div>

            {/* Right: Content */}
            <motion.div variants={itemVariants} className="flex flex-col justify-center">
              <p className="font-[family-name:var(--font-cormorant)] text-white/70 text-lg md:text-xl leading-relaxed mb-6">
                Founded in 2012, Elite Interiors has grown from a passionate design studio into one of the most
                sought-after luxury interior design firms in the country. Our philosophy is simple yet profound:
                every space tells a story, and we are the authors who bring that narrative to life.
              </p>
              <p className="font-[family-name:var(--font-cormorant)] text-white/50 text-lg leading-relaxed mb-8">
                Our team of award-winning designers, architects, and artisans work in harmony to transform
                raw spaces into living masterpieces. We blend contemporary aesthetics with timeless elegance,
                ensuring each project stands as a testament to refined taste and uncompromising quality.
              </p>

              {/* Signature line */}
              <div className="flex items-center gap-4 mb-10">
                <div className="w-16 h-[1px] bg-[#C9A96E]/40" />
                <div>
                  <p className="font-[family-name:var(--font-playfair)] text-white/80 text-sm italic">
                    Arjun Malhotra
                  </p>
                  <p className="font-[family-name:var(--font-inter)] text-[10px] text-[#C9A96E]/50 tracking-[0.2em] uppercase">
                    Founder & Principal Designer
                  </p>
                </div>
              </div>

              {/* Image 2 */}
              <div className="relative overflow-hidden">
                <motion.div
                  className="relative aspect-[16/7] overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.6 }}
                >
                  <img
                    src="/images/about-team.png"
                    alt="Elite Interiors Design Team"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/40 to-transparent" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-16 border-t border-[#C9A96E]/10"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center group cursor-hover"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-gradient-gold mb-2">
                  {stat.number}
                </div>
                <div className="font-[family-name:var(--font-inter)] text-white/70 text-xs tracking-[0.15em] uppercase mb-1">
                  {stat.label}
                </div>
                <div className="font-[family-name:var(--font-cormorant)] text-white/30 text-sm">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Values */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8 mt-24"
          >
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className="glass-card p-8 group cursor-hover transition-all duration-500"
                whileHover={{ y: -8, borderColor: 'rgba(201, 169, 110, 0.3)' }}
              >
                <span className="text-[#C9A96E] text-2xl block mb-4 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </span>
                <h3 className="font-[family-name:var(--font-playfair)] text-white text-xl mb-3">
                  {value.title}
                </h3>
                <p className="font-[family-name:var(--font-cormorant)] text-white/40 text-base leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
