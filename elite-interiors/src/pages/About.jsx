import { useState, useRef, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'

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

const timeline = [
  { year: '2010', title: 'Foundation', desc: 'Elite Interiors was born from a singular vision — to redefine luxury design in India. Starting from a small studio in Mumbai, we set out to challenge convention.' },
  { year: '2013', title: 'First Major Project', desc: 'Our breakthrough came with the Skyline Penthouse project, a 10,000 sq ft masterpiece that won the Indian Design Award and put us on the national map.' },
  { year: '2016', title: 'International Expansion', desc: 'We expanded our footprint to Dubai and Singapore, bringing our signature blend of Indian artistry and international sophistication to a global clientele.' },
  { year: '2018', title: 'AD100 Recognition', desc: 'Architectural Digest named us among the AD100 — the most influential design firms in the world. A milestone that validated our relentless pursuit of excellence.' },
  { year: '2021', title: 'Sustainability Pledge', desc: 'We committed to using 80% sustainable materials by 2025, proving that luxury and environmental responsibility can coexist beautifully.' },
  { year: '2023', title: 'Digital Innovation', desc: 'Launched our proprietary 3D visualization platform, allowing clients to walk through their spaces in virtual reality before construction begins.' },
  { year: '2025', title: 'The Future', desc: 'With 200+ completed projects across 3 continents, we continue to push boundaries, blending AI-driven design with human artistry to create tomorrow\'s classics.' },
]

export default function About() {
  const [activeTeam, setActiveTeam] = useState(0)

  return (
    <motion.main exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      {/* ═══ HERO ═══ */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/about-studio.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-rich-black/90 via-rich-black/70 to-rich-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-rich-black via-transparent to-rich-black/50" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="font-inter text-xs tracking-[0.4em] uppercase text-gold/60 mb-4 block">About Us</span>
            <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white mb-4">Our <span className="gold-gradient-text">Story</span></h1>
            <p className="font-cormorant text-xl md:text-2xl text-white/60 max-w-xl">A decade of transforming spaces into breathtaking experiences</p>
          </motion.div>
        </div>
      </section>

      {/* ═══ OUR STORY ═══ */}
      <section className="py-24 md:py-32 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <Reveal>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img src="/images/service-residential.png" alt="Our studio" className="w-full h-full object-cover" />
              </div>
              {/* 3D floating accent */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-gold/30 rotate-45 hidden md:block float-3d" style={{ animationDelay: '0.5s' }} />
              <div className="absolute -top-6 -left-6 w-20 h-20 border border-gold/20 rotate-45 hidden md:block float-3d" />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <span className="font-inter text-xs tracking-[0.4em] uppercase text-gold/60">Since 2010</span>
            <h2 className="font-playfair text-3xl md:text-5xl text-white mt-3 mb-6">Where Vision Meets <span className="gold-gradient-text">Craft</span></h2>
            <div className="space-y-4 text-white/60 font-inter text-sm leading-relaxed">
              <p>Elite Interiors was founded with a singular, unwavering mission: to create spaces that do more than impress — spaces that inspire, comfort, and transform the way people live and work. From our humble beginnings in a 200 sq ft studio in South Mumbai, we have grown into one of the most sought-after luxury interior design firms in the world.</p>
              <p>Our design philosophy is rooted in the belief that every space has a soul waiting to be revealed. We do not impose a style — we listen, observe, and uncover the unique narrative that each client and each space demands. This approach has earned us the trust of CEOs, celebrities, and discerning homeowners across three continents.</p>
              <p>What sets us apart is not just our aesthetic sensibility — it is our obsessive commitment to craftsmanship. Every material is hand-selected, every joint is precision-engineered, and every shadow is intentionally designed. We believe God is in the details, and we worship at that altar every single day.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="py-16 px-4 border-y border-gold/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: '200+', label: 'Projects Delivered' },
            { num: '15+', label: 'Years of Excellence' },
            { num: '50+', label: 'Design Awards' },
            { num: '3', label: 'Continents' },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <span className="font-playfair text-4xl md:text-5xl gold-gradient-text">{s.num}</span>
              <p className="font-inter text-xs tracking-[0.2em] uppercase text-white/40 mt-2">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ MISSION & VISION ═══ */}
      <section className="py-24 md:py-32 px-4 bg-dark-lighter">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <TiltCard>
            <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold/60 mb-4 block">Our Mission</span>
            <h3 className="font-playfair text-3xl text-white mb-4">To Elevate the Human Experience Through Design</h3>
            <p className="text-white/50 text-sm leading-relaxed font-inter">We exist to prove that exceptional design is not a luxury — it is a necessity. Every project we undertake is driven by the conviction that thoughtful, beautiful spaces have the power to improve mental health, boost productivity, and deepen human connections. Our mission is to make that power accessible to those who value it.</p>
          </TiltCard>
          <TiltCard>
            <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold/60 mb-4 block">Our Vision</span>
            <h3 className="font-playfair text-3xl text-white mb-4">To Be the World's Most Trusted Luxury Design Partner</h3>
            <p className="text-white/50 text-sm leading-relaxed font-inter">By 2030, we envision Elite Interiors as the definitive name in luxury interior design globally — not just for our portfolio, but for the transformative experience we provide. We see a future where every interaction with our brand, from first consultation to final walkthrough, is as exquisite as the spaces we create.</p>
          </TiltCard>
        </div>
      </section>

      {/* ═══ TEAM ═══ */}
      <section className="py-24 md:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="font-inter text-xs tracking-[0.4em] uppercase text-gold/60">The Visionaries</span>
            <h2 className="font-playfair text-4xl md:text-5xl text-white mt-3 mb-4">Meet Our <span className="gold-gradient-text">Team</span></h2>
            <div className="section-divider" />
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { img: '/images/team1.png', name: 'Ananya Kapoor', role: 'Founder & Creative Director', bio: 'With 18 years of design excellence, Ananya has led over 150 luxury projects worldwide. Her philosophy: design must evoke emotion.' },
              { img: '/images/team2.png', name: 'Vikram Singh', role: 'Principal Architect', bio: 'A TED speaker and award-winning architect, Vikram brings structural poetry to every project. His designs breathe.' },
              { img: '/images/team3.png', name: 'Meera Joshi', role: 'Head of Interior Styling', bio: 'Meera\'s eye for detail is legendary. She has styled homes for Bollywood elites and Fortune 500 executives alike.' },
              { img: '/images/team4.png', name: 'Rahul Desai', role: 'Project Director', bio: 'A former army engineer turned project maestro. Rahul ensures every project is delivered with military precision and zero compromise.' },
            ].map((m, i) => (
              <TiltCard key={i}>
                <div className="relative h-64 -mx-6 md:-mx-8 -mt-6 md:-mt-8 mb-6 overflow-hidden rounded-t-2xl">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent" />
                </div>
                <h3 className="font-playfair text-xl text-white mb-1">{m.name}</h3>
                <p className="text-gold text-sm font-inter tracking-wider mb-3">{m.role}</p>
                <p className="text-white/40 text-xs leading-relaxed font-inter">{m.bio}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ AWARDS ═══ */}
      <section className="py-24 md:py-32 px-4 bg-dark-lighter">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="font-inter text-xs tracking-[0.4em] uppercase text-gold/60">Recognition</span>
            <h2 className="font-playfair text-4xl md:text-5xl text-white mt-3 mb-4">Awards & <span className="gold-gradient-text">Honors</span></h2>
            <div className="section-divider" />
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              'AD100 — Architectural Digest', 'Elle Decor A-List 2024', 'International Design Awards — Gold', 'Indian Design Award x3', 'Best of Houzz — Design', 'Dezeen Awards — Residential', 
            ].map((a, i) => (
              <TiltCard key={i}>
                <div className="text-center">
                  <div className="text-gold text-4xl mb-3">◆</div>
                  <p className="font-inter text-sm text-white/70 tracking-wider">{a}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ JOURNEY TIMELINE ═══ */}
      <section className="py-24 md:py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="font-inter text-xs tracking-[0.4em] uppercase text-gold/60">Our Journey</span>
            <h2 className="font-playfair text-4xl md:text-5xl text-white mt-3 mb-4">The <span className="gold-gradient-text">Timeline</span></h2>
            <div className="section-divider" />
          </Reveal>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gold/20 md:-translate-x-[0.5px]" />
            {timeline.map((item, i) => (
              <Reveal key={i} delay={i * 0.08} className={`relative flex gap-6 md:gap-0 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-gold -translate-x-1.5 mt-2 z-10" style={{ transform: 'rotate(45deg)' }} />
                <div className={`flex-1 pl-10 md:pl-0 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <span className="font-playfair text-2xl gold-gradient-text">{item.year}</span>
                  <h3 className="font-playfair text-xl text-white mt-1 mb-2">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed font-inter">{item.desc}</p>
                </div>
                <div className="hidden md:block flex-1" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </motion.main>
  )
}
