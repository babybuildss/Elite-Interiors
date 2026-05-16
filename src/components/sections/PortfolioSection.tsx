'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'The Sapphire Penthouse',
    category: 'Residential',
    location: 'Mumbai',
    year: '2024',
    image: '/images/portfolio-living.png',
    description: 'A 5,000 sq ft penthouse reimagined with bespoke Italian marble, custom millwork, and panoramic views of the Arabian Sea.',
  },
  {
    id: 2,
    title: 'Café Lumière',
    category: 'Hospitality',
    location: 'Delhi',
    year: '2024',
    image: '/images/portfolio-dining.png',
    description: 'An immersive dining experience where Art Deco elegance meets contemporary Indian artistry across 3,200 sq ft.',
  },
  {
    id: 3,
    title: 'The Ivory Suite',
    category: 'Residential',
    location: 'Bangalore',
    year: '2023',
    image: '/images/portfolio-bedroom.png',
    description: 'A master suite transformation featuring hand-painted silk wallpapers, Venetian plaster, and smart home integration.',
  },
  {
    id: 4,
    title: 'Meridian Tower Office',
    category: 'Commercial',
    location: 'Hyderabad',
    year: '2023',
    image: '/images/portfolio-office.png',
    description: 'A 12,000 sq ft corporate headquarters designed to inspire innovation with biophilic design principles.',
  },
  {
    id: 5,
    title: 'The Onyx Kitchen',
    category: 'Residential',
    location: 'Goa',
    year: '2023',
    image: '/images/portfolio-kitchen.png',
    description: 'A culinary masterpiece featuring black onyx countertops, brass fixtures, and a wine cellar hidden behind a moving wall.',
  },
  {
    id: 6,
    title: 'Serenity Spa & Wellness',
    category: 'Hospitality',
    location: 'Jaipur',
    year: '2024',
    image: '/images/portfolio-bathroom.png',
    description: 'A 8,000 sq ft wellness sanctuary blending Rajasthani heritage motifs with modern luxury spa design.',
  },
];

const categories = ['All', 'Residential', 'Commercial', 'Hospitality'];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

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
    <section id="portfolio" ref={sectionRef} className="relative py-32 md:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent" />

      <motion.div
        className="absolute right-0 top-1/4 w-96 h-96 rounded-full bg-[#C9A96E]/2 blur-[120px]"
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
              Portfolio
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
            <motion.h2
              variants={itemVariants}
              className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-white leading-tight"
            >
              Selected
              <br />
              <span className="text-gradient-gold italic">Works</span>
            </motion.h2>

            {/* Category filters */}
            <motion.div variants={itemVariants} className="flex gap-3 mt-6 lg:mt-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 text-xs tracking-[0.2em] uppercase transition-all duration-300 cursor-hover ${
                    activeCategory === cat
                      ? 'bg-[#C9A96E] text-[#0a0a0a]'
                      : 'border border-white/10 text-white/50 hover:border-[#C9A96E]/40 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Portfolio Grid */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative cursor-hover"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="relative overflow-hidden aspect-[3/4]">
                    {/* Image */}
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                    {/* Content on hover */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {/* Category tag */}
                      <motion.div
                        className="absolute top-6 left-6"
                        initial={{ opacity: 0, y: -10 }}
                        animate={hoveredProject === project.id ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="px-3 py-1 bg-[#C9A96E]/20 backdrop-blur-sm border border-[#C9A96E]/30 text-[#C9A96E] text-[10px] tracking-[0.2em] uppercase">
                          {project.category}
                        </span>
                      </motion.div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[#C9A96E]/60 text-xs">{project.location}</span>
                          <span className="text-white/20">•</span>
                          <span className="text-white/40 text-xs">{project.year}</span>
                        </div>
                        <h3 className="font-[family-name:var(--font-playfair)] text-white text-xl md:text-2xl mb-2 group-hover:text-[#C9A96E] transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="font-[family-name:var(--font-cormorant)] text-white/50 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          {project.description}
                        </p>
                      </div>

                      {/* View button */}
                      <motion.div
                        className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      >
                        <span className="text-[#C9A96E] text-xs tracking-[0.2em] uppercase">View Project</span>
                        <span className="text-[#C9A96E] group-hover:translate-x-2 transition-transform duration-300">→</span>
                      </motion.div>
                    </div>

                    {/* Corner decoration */}
                    <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#C9A96E]/0 group-hover:border-[#C9A96E]/40 transition-all duration-500" />
                    <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-[#C9A96E]/0 group-hover:border-[#C9A96E]/40 transition-all duration-500" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* View all CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="magnetic-btn inline-flex items-center gap-4 px-10 py-4 border border-[#C9A96E]/30 text-[#C9A96E] text-xs tracking-[0.25em] uppercase hover:bg-[#C9A96E]/5 hover:border-[#C9A96E] transition-all duration-500 cursor-hover"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </motion.a>
          </motion.div>

          {/* Testimonial */}
          <motion.div
            variants={itemVariants}
            className="mt-32 glass-card p-10 md:p-16 text-center relative"
          >
            <div className="absolute top-6 left-8 font-[family-name:var(--font-playfair)] text-6xl text-[#C9A96E]/10">
              &ldquo;
            </div>
            <p className="font-[family-name:var(--font-cormorant)] text-white/70 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto mb-8 italic">
              Elite Interiors didn&apos;t just design our home — they translated our dreams into reality.
              Every corner whispers luxury, every room tells our story. It&apos;s not a house anymore,
              it&apos;s a masterpiece we live in.
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C9A96E]/20 flex items-center justify-center">
                <span className="font-[family-name:var(--font-playfair)] text-[#C9A96E] text-sm">RS</span>
              </div>
              <div className="text-left">
                <p className="font-[family-name:var(--font-inter)] text-white/80 text-sm">Rajesh Sharma</p>
                <p className="font-[family-name:var(--font-inter)] text-white/30 text-xs">CEO, Meridian Group</p>
              </div>
            </div>
            <div className="absolute bottom-6 right-8 font-[family-name:var(--font-playfair)] text-6xl text-[#C9A96E]/10 rotate-180">
              &ldquo;
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
