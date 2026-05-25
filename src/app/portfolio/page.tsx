'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
const projects = [
  { id: 1, title: 'The Sapphire Penthouse', category: 'Residential', location: 'Mumbai', year: '2024', area: '5,000 sq ft', image: '/images/portfolio-living.png', description: 'A penthouse reimagined with bespoke Italian marble, custom millwork, and panoramic views of the Arabian Sea. Every room tells a story of opulence and refined taste.' },
  { id: 2, title: 'Caf├⌐ Lumi├¿re', category: 'Hospitality', location: 'Delhi', year: '2024', area: '3,200 sq ft', image: '/images/portfolio-dining.png', description: 'An immersive dining experience where Art Deco elegance meets contemporary Indian artistry. The space features hand-painted murals and custom brass lighting fixtures.' },
  { id: 3, title: 'The Ivory Suite', category: 'Residential', location: 'Bangalore', year: '2023', area: '2,800 sq ft', image: '/images/portfolio-bedroom.png', description: 'A master suite transformation featuring hand-painted silk wallpapers, Venetian plaster, and smart home integration that anticipates your every need.' },
  { id: 4, title: 'Meridian Tower Office', category: 'Commercial', location: 'Hyderabad', year: '2023', area: '12,000 sq ft', image: '/images/portfolio-office.png', description: 'A corporate headquarters designed to inspire innovation with biophilic design principles, living walls, and a dramatic double-height atrium.' },
  { id: 5, title: 'The Onyx Kitchen', category: 'Residential', location: 'Goa', year: '2023', area: '1,200 sq ft', image: '/images/portfolio-kitchen.png', description: 'A culinary masterpiece featuring black onyx countertops, brass fixtures, and a wine cellar hidden behind a moving wall. Where cooking becomes ceremony.' },
  { id: 6, title: 'Serenity Spa & Wellness', category: 'Hospitality', location: 'Jaipur', year: '2024', area: '8,000 sq ft', image: '/images/portfolio-bathroom.png', description: 'A wellness sanctuary blending Rajasthani heritage motifs with modern luxury spa design. Features indoor water bodies and aromatic gardens.' },
  { id: 7, title: 'The Emerald Villa', category: 'Residential', location: 'Pune', year: '2024', area: '7,500 sq ft', image: '/images/portfolio-villa.png', description: 'A contemporary villa that harmonizes with nature through floor-to-ceiling glass walls, open courtyards, and a seamless indoor-outdoor living experience.' },
  { id: 8, title: 'The Grand Meridian Hotel', category: 'Hospitality', location: 'Udaipur', year: '2022', area: '25,000 sq ft', image: '/images/portfolio-hotel.png', description: 'A luxury heritage hotel that seamlessly blends Rajasthani grandeur with contemporary sophistication. Features a grand lobby with crystal chandeliers and hand-painted ceilings.' },
];

const categories = ['All', 'Residential', 'Commercial', 'Hospitality'];

const portfolioStats = [
  { number: '150+', label: 'Projects Delivered' },
  { number: '15+', label: 'Cities Served' },
  { number: '2M+', label: 'Sq Ft Designed' },
  { number: '98%', label: 'Client Satisfaction' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } }),
};

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-80px' });
  const galleryInView = useInView(galleryRef, { once: true, margin: '-80px' });
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' });
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' });

  const filteredProjects = activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/portfolio-villa.png')" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]/40" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pb-16 pt-32 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-[#C9A96E]" />
              <span className="font-[family-name:var(--font-inter)] text-[#C9A96E] text-xs tracking-[0.4em] uppercase">Our Work</span>
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl lg:text-7xl text-white leading-tight">
              Selected <span className="text-gradient-gold italic">Works</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section ref={galleryRef} className="py-28 md:py-36 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div initial="hidden" animate={galleryInView ? 'visible' : 'hidden'} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            {/* Filters */}
            <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
              <p className="font-[family-name:var(--font-cormorant)] text-white/40 text-lg">Showing {filteredProjects.length} projects</p>
              <div className="flex gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 text-xs tracking-[0.2em] uppercase transition-all duration-300 cursor-hover ${
                      activeCategory === cat ? 'bg-[#C9A96E] text-[#0a0a0a]' : 'border border-white/10 text-white/50 hover:border-[#C9A96E]/40 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Grid */}
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="group cursor-hover"
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <div className="relative overflow-hidden aspect-[3/4]">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                      <div className="absolute inset-0 p-6 flex flex-col justify-end">
                        <span className="px-3 py-1 bg-[#C9A96E]/20 backdrop-blur-sm border border-[#C9A96E]/30 text-[#C9A96E] text-[10px] tracking-[0.2em] uppercase w-fit mb-3">
                          {project.category}
                        </span>
                        <h3 className="font-[family-name:var(--font-playfair)] text-white text-xl group-hover:text-[#C9A96E] transition-colors duration-300">{project.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-white/30 text-xs">{project.location}</span>
                          <span className="text-white/20">ΓÇó</span>
                          <span className="text-white/40 text-xs">{project.year}</span>
                          <span className="text-white/20">ΓÇó</span>
                          <span className="text-white/40 text-xs">{project.area}</span>
                        </div>
                        <p className="font-[family-name:var(--font-cormorant)] text-white/40 text-sm mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">{project.description}</p>
                      </div>
                      <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#C9A96E]/0 group-hover:border-[#C9A96E]/40 transition-all duration-500" />
                      <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-[#C9A96E]/0 group-hover:border-[#C9A96E]/40 transition-all duration-500" />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== PROJECT MODAL ===== */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#0a0a0a]/95 backdrop-blur-2xl flex items-center justify-center p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-[#0f0f0f] border border-[#C9A96E]/20"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const project = projects.find((p) => p.id === selectedProject);
                if (!project) return null;
                return (
                  <>
                    <div className="relative aspect-video overflow-hidden">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] to-transparent" />
                      <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 w-10 h-10 bg-[#0a0a0a]/80 backdrop-blur flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-hover">
                        Γ£ò
                      </button>
                    </div>
                    <div className="p-8 md:p-10">
                      <span className="px-3 py-1 bg-[#C9A96E]/10 border border-[#C9A96E]/20 text-[#C9A96E] text-[10px] tracking-[0.2em] uppercase">{project.category}</span>
                      <h3 className="font-[family-name:var(--font-playfair)] text-white text-3xl mt-4 mb-2">{project.title}</h3>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="font-[family-name:var(--font-inter)] text-white/40 text-xs">{project.location}</span>
                        <span className="text-white/20">|</span>
                        <span className="font-[family-name:var(--font-inter)] text-white/40 text-xs">{project.year}</span>
                        <span className="text-white/20">|</span>
                        <span className="font-[family-name:var(--font-inter)] text-white/40 text-xs">{project.area}</span>
                      </div>
                      <p className="font-[family-name:var(--font-cormorant)] text-white/50 text-lg leading-relaxed mb-8">{project.description}</p>
                      <Link href="/contact" className="magnetic-btn inline-flex px-8 py-3 bg-[#C9A96E] text-[#0a0a0a] text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#E8D5A8] transition-colors duration-300 cursor-hover">
                        Discuss a Similar Project
                      </Link>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== STATS ===== */}
      <section ref={statsRef} className="py-20 border-y border-[#C9A96E]/10 bg-[#080808]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {portfolioStats.map((s, i) => (
              <motion.div key={s.label} className="text-center" initial={{ opacity: 0, y: 30 }} animate={statsInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1, duration: 0.6 }}>
                <div className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-gradient-gold mb-2">{s.number}</div>
                <div className="font-[family-name:var(--font-inter)] text-white/50 text-xs tracking-[0.15em] uppercase">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section ref={ctaRef} className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/portfolio-bedroom.png')" }} />
        <div className="absolute inset-0 bg-[#0a0a0a]/85" />
        <motion.div initial="hidden" animate={ctaInView ? 'visible' : 'hidden'} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }} className="relative max-w-[900px] mx-auto px-6 md:px-12 text-center">
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-[#C9A96E]" />
            <span className="font-[family-name:var(--font-inter)] text-[#C9A96E] text-xs tracking-[0.5em] uppercase">Your Project Next</span>
            <div className="w-12 h-[1px] bg-[#C9A96E]" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
            Ready to Be Our Next <span className="text-gradient-gold italic">Masterpiece</span>?
          </motion.h2>
          <motion.p variants={fadeUp} className="font-[family-name:var(--font-cormorant)] text-white/50 text-lg max-w-xl mx-auto mb-10">
            Every project in our portfolio began with a single conversation. Let&apos;s start yours.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link href="/contact" className="magnetic-btn inline-flex px-10 py-4 bg-gradient-to-r from-[#C9A96E] to-[#A07D44] text-[#0a0a0a] text-xs tracking-[0.25em] uppercase font-semibold hover:shadow-[0_0_40px_rgba(201,169,110,0.3)] transition-all duration-500 cursor-hover">
              Start Your Project
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
