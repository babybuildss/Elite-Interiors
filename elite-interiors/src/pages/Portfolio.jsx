import { useState, useRef, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 60 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay, ease: [0.4, 0, 0.2, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

function TiltCard({ children, className = '' }) {
  const ref = useRef(null)
  const handleMove = useCallback((e) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    const rotX = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -6
    const rotY = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 6
    el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(15px)`
  }, [])
  const handleLeave = useCallback(() => { if (ref.current) ref.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)' }, [])
  return (
    <div className={`card-3d ${className}`} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <div ref={ref} className="card-3d-inner glass-card p-6 md:p-8 h-full">{children}</div>
    </div>
  )
}

const projects = [
  { img: '/images/project1.png', title: 'Skyline Penthouse', location: 'Mumbai, India', cat: 'Residential', area: '4,500 sq ft', year: '2024', desc: 'A breathtaking penthouse with panoramic sea views, featuring bespoke Italian marble, custom millwork, and a curated art collection that transforms every room into a gallery.' },
  { img: '/images/project2.png', title: 'The Midnight Suite', location: 'Delhi, India', cat: 'Residential', area: '3,200 sq ft', year: '2024', desc: 'Dark, moody, and unapologetically luxurious. This master bedroom suite features silk drapes, a canopy bed, and ambient lighting that shifts with the time of day.' },
  { img: '/images/project3.png', title: 'The Grand Kitchen', location: 'Delhi, India', cat: 'Kitchen', area: '1,800 sq ft', year: '2023', desc: 'A culinary masterpiece featuring Calacatta marble, brass fixtures, a wine cellar, and a hidden pantry. Where gourmet cooking meets gallery-worthy design.' },
  { img: '/images/project4.png', title: 'Serene Spa Bath', location: 'Goa, India', cat: 'Bathroom', area: '800 sq ft', year: '2023', desc: 'Inspired by Balinese spas, this bathroom retreat features a freestanding stone tub, rain shower with mood lighting, and hand-laid mosaic tiles in 24k gold accents.' },
  { img: '/images/project5.png', title: 'The Cinema Room', location: 'Mumbai, India', cat: 'Entertainment', area: '600 sq ft', year: '2023', desc: 'A private cinema with acoustic-engineered walls, reclining velvet seats, a 4K laser projector, and a concession bar — all wrapped in midnight blue velvet.' },
  { img: '/images/project6.png', title: 'Noir Restaurant', location: 'Dubai, UAE', cat: 'Commercial', area: '5,000 sq ft', year: '2022', desc: 'A fine-dining experience wrapped in shadow and candlelight. Black marble, smoked glass, and crystal chandeliers create an atmosphere of mysterious indulgence.' },
  { img: '/images/project7.png', title: 'Royal Lobby', location: 'Dubai, UAE', cat: 'Hospitality', area: '12,000 sq ft', year: '2022', desc: 'A hotel lobby that rivals the grandeur of European palaces — double staircase, crystal chandeliers, and book-matched marble floors that reflect infinite opulence.' },
  { img: '/images/project8.png', title: 'Luxe Boutique', location: 'Singapore', cat: 'Retail', area: '2,800 sq ft', year: '2022', desc: 'A high-fashion retail space where every display is a gallery piece. Mirror walls, gold lighting, and floating shelving create an immersive brand experience.' },
]

const categories = ['All', 'Residential', 'Commercial', 'Hospitality', 'Kitchen', 'Bathroom', 'Entertainment', 'Retail']

export default function Portfolio() {
  const [filter, setFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const filtered = filter === 'All' ? projects : projects.filter(p => p.cat === filter)

  return (
    <motion.main exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      {/* ═══ HERO ═══ */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/project1.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-rich-black/90 via-rich-black/70 to-rich-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-rich-black via-transparent to-rich-black/50" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="font-inter text-xs tracking-[0.4em] uppercase text-gold/60 mb-4 block">Our Work</span>
            <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white mb-4">The <span className="gold-gradient-text">Portfolio</span></h1>
            <p className="font-cormorant text-xl md:text-2xl text-white/60 max-w-xl">A curated collection of our most extraordinary transformations</p>
          </motion.div>
        </div>
      </section>

      {/* ═══ FILTERABLE GALLERY ═══ */}
      <section className="py-24 md:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 font-inter text-xs tracking-[0.15em] uppercase border transition-all duration-500 ${
                  filter === cat
                    ? 'border-gold bg-gold text-rich-black'
                    : 'border-gold/20 text-white/50 hover:border-gold/50 hover:text-gold'
                }`}
                data-cursor
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filtered.map((p, i) => (
                <motion.div
                  key={p.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <TiltCard>
                    <div
                      className="relative h-56 -mx-6 md:-mx-8 -mt-6 md:-mt-8 mb-4 overflow-hidden rounded-t-2xl cursor-pointer group"
                      onClick={() => setSelectedProject(p)}
                    >
                      <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent" />
                      <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors duration-300 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-inter text-xs tracking-[0.2em] uppercase text-white border border-white/50 px-4 py-2">View Details</span>
                      </div>
                    </div>
                    <h3 className="font-playfair text-lg text-white mb-1">{p.title}</h3>
                    <p className="text-white/40 text-xs font-inter">{p.location} · {p.year}</p>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ═══ PROJECT MODAL ═══ */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9990] bg-rich-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <img src={selectedProject.img} alt={selectedProject.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent" />
                <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 w-10 h-10 bg-rich-black/60 backdrop-blur flex items-center justify-center text-white hover:bg-gold hover:text-rich-black transition-all duration-300" data-cursor>
                  ✕
                </button>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="font-inter text-[10px] tracking-[0.3em] uppercase px-3 py-1 border border-gold/30 text-gold/70">{selectedProject.cat}</span>
                  <span className="font-inter text-[10px] tracking-[0.3em] uppercase px-3 py-1 border border-gold/30 text-gold/70">{selectedProject.area}</span>
                  <span className="font-inter text-[10px] tracking-[0.3em] uppercase px-3 py-1 border border-gold/30 text-gold/70">{selectedProject.year}</span>
                </div>
                <h2 className="font-playfair text-3xl text-white mb-2">{selectedProject.title}</h2>
                <p className="text-white/40 text-sm font-inter mb-4">{selectedProject.location}</p>
                <p className="text-white/60 font-inter text-sm leading-relaxed mb-6">{selectedProject.desc}</p>
                <Link to="/contact" className="inline-block px-8 py-3 border border-gold text-gold font-inter text-sm tracking-[0.15em] uppercase hover:bg-gold hover:text-rich-black transition-all duration-500" data-cursor>
                  Start Similar Project
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ STATS ═══ */}
      <section className="py-16 px-4 border-y border-gold/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: '200+', label: 'Projects Completed' },
            { num: '5M+', label: 'Sq Ft Designed' },
            { num: '3', label: 'Continents' },
            { num: '98%', label: 'Client Satisfaction' },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <span className="font-playfair text-4xl md:text-5xl gold-gradient-text">{s.num}</span>
              <p className="font-inter text-xs tracking-[0.2em] uppercase text-white/40 mt-2">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-24 md:py-32 px-4 text-center" style={{ background: 'linear-gradient(135deg, rgba(201,169,110,0.08) 0%, transparent 50%, rgba(201,169,110,0.08) 100%)' }}>
        <Reveal>
          <h2 className="font-playfair text-4xl md:text-5xl text-white mb-4">Ready to Start Your Project?</h2>
          <p className="font-cormorant text-xl text-white/50 mb-8">Let us transform your vision into a masterpiece</p>
          <Link to="/contact" className="inline-block px-10 py-4 bg-gold text-rich-black font-inter text-sm tracking-[0.2em] uppercase hover:bg-gold-light transition-all duration-500" data-cursor>
            Begin Your Journey
          </Link>
        </Reveal>
      </section>
    </motion.main>
  )
}
