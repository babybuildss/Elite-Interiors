import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'

/* ─── shared 3D card with mouse-tracking tilt ─── */
function TiltCard({ children, className = '', glare = true }) {
  const ref = useRef(null)
  const handleMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotX = ((y - cy) / cy) * -8
    const rotY = ((x - cx) / cx) * 8
    el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(20px)`
    if (glare) {
      el.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(201,169,110,0.08), transparent 60%), rgba(20,20,20,0.6)`
    }
  }, [glare])
  const handleLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)'
      ref.current.style.background = 'rgba(20,20,20,0.6)'
    }
  }, [])
  return (
    <div className={`card-3d ${className}`} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <div ref={ref} className="card-3d-inner glass-card p-6 md:p-8 h-full">{children}</div>
    </div>
  )
}

/* ─── section reveal wrapper ─── */
function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── HERO CAROUSEL ─── */
const heroSlides = [
  { img: '/images/hero1.png', title: 'Crafting', subtitle: 'Timeless Luxury', desc: 'Where visionary design meets unparalleled craftsmanship' },
  { img: '/images/hero2.png', title: 'Designing', subtitle: 'Sacred Sanctuaries', desc: 'Spaces that inspire, comfort, and elevate everyday living' },
  { img: '/images/hero3.png', title: 'Creating', subtitle: 'Culinary Masterpieces', desc: 'Functional artistry in every detail, every surface, every moment' },
  { img: '/images/hero4.png', title: 'Sculpting', subtitle: 'Private Retreats', desc: 'Indulge in bespoke luxury tailored to your unique lifestyle' },
  { img: '/images/hero5.png', title: 'Building', subtitle: 'Executive Excellence', desc: 'Commanding spaces designed for power and prestige' },
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  /* auto-advance every 5 s */
  useEffect(() => {
    const id = setInterval(() => setCurrentSlide(i => (i + 1) % heroSlides.length), 5000)
    return () => clearInterval(id)
  }, [])

  const goTo = useCallback((i) => setCurrentSlide(i), [])
  const prev = useCallback(() => setCurrentSlide(i => (i - 1 + heroSlides.length) % heroSlides.length), [])
  const next = useCallback(() => setCurrentSlide(i => (i + 1) % heroSlides.length), [])

  return (
    <motion.main exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>

      {/* ════════════ HERO CAROUSEL ════════════ */}
      <section className="relative h-screen overflow-hidden">
        {/* Slides */}
        {heroSlides.map((slide, i) => (
          <div key={i} className={`hero-slide ${i === currentSlide ? 'active' : ''}`}>
            <img src={slide.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-rich-black/80 via-rich-black/50 to-rich-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-rich-black via-transparent to-rich-black/40" />
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              >
                <span className="inline-block font-inter text-xs tracking-[0.4em] uppercase text-gold/70 mb-4">Elite Interiors</span>
                <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white leading-[0.95] mb-2">
                  {heroSlides[currentSlide].title}
                </h1>
                <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl gold-gradient-text leading-[0.95] mb-6">
                  {heroSlides[currentSlide].subtitle}
                </h1>
                <p className="font-cormorant text-xl md:text-2xl text-white/60 max-w-xl mb-10">
                  {heroSlides[currentSlide].desc}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/portfolio" className="px-8 py-4 bg-gold text-rich-black font-inter text-sm tracking-[0.2em] uppercase hover:bg-gold-light transition-all duration-500" data-cursor>
                    View Portfolio
                  </Link>
                  <Link to="/contact" className="px-8 py-4 border border-gold text-gold font-inter text-sm tracking-[0.2em] uppercase hover:bg-gold hover:text-rich-black transition-all duration-500" data-cursor>
                    Free Consultation
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button onClick={prev} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-rich-black transition-all duration-300" data-cursor aria-label="Previous slide">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 4l-6 6 6 6"/></svg>
        </button>
        <button onClick={next} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-rich-black transition-all duration-300" data-cursor aria-label="Next slide">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 4l6 6-6 6"/></svg>
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-[2px] transition-all duration-700 ${i === currentSlide ? 'w-10 bg-gold' : 'w-5 bg-white/30 hover:bg-white/50'}`}
              data-cursor
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute bottom-8 right-4 md:right-8 z-20 font-inter text-xs tracking-[0.3em] text-gold/50">
          <span className="text-gold">{String(currentSlide + 1).padStart(2, '0')}</span> / {String(heroSlides.length).padStart(2, '0')}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-4 md:left-8 z-20 hidden md:flex flex-col items-center gap-2"
        >
          <span className="font-inter text-[10px] tracking-[0.3em] text-gold/50 uppercase" style={{ writingMode: 'vertical-lr' }}>Scroll</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-gold/50 to-transparent" />
        </motion.div>
      </section>

      {/* ════════════ WHY CHOOSE US ════════════ */}
      <section className="py-24 md:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="font-inter text-xs tracking-[0.4em] uppercase text-gold/60">Why Elite Interiors</span>
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mt-3 mb-4">The Art of <span className="gold-gradient-text">Extraordinary</span></h2>
            <div className="section-divider" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: '◆', title: 'Bespoke Design', desc: 'Every project is a unique masterpiece crafted exclusively for you. We never repeat ourselves — your space deserves a one-of-a-kind narrative that reflects your personality and aspirations.' },
              { icon: '◈', title: 'Premium Materials', desc: 'We source the finest materials from around the globe — Italian marble, Brazilian hardwoods, Swiss hardware — ensuring every surface, fixture, and finish exudes uncompromising quality.' },
              { icon: '◇', title: '3D Visualization', desc: 'Experience your dream space before a single wall is touched. Our photorealistic 3D renderings let you walk through your future home, making confident decisions at every step.' },
              { icon: '◉', title: 'Timely Delivery', desc: 'We respect your time as much as your space. Our military-precision project management ensures every milestone is met on schedule without ever compromising craftsmanship.' },
              { icon: '◎', title: 'Post-Project Care', desc: 'Our relationship does not end at handover. Enjoy a full year of complimentary styling adjustments, seasonal décor consultations, and priority access to our design team.' },
              { icon: '❖', title: 'Award-Winning', desc: 'Recognized by Architectural Digest, Elle Decor, and the International Design Awards. Our trophy shelf is proof that excellence is not an act but a habit at Elite Interiors.' },
            ].map((item, i) => (
              <TiltCard key={i}>
                <div className="text-gold text-3xl mb-4">{item.icon}</div>
                <h3 className="font-playfair text-xl text-white mb-3">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed font-inter">{item.desc}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ FEATURED SERVICES ════════════ */}
      <section className="py-24 md:py-32 px-4 bg-dark-lighter">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="font-inter text-xs tracking-[0.4em] uppercase text-gold/60">What We Offer</span>
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mt-3 mb-4">Signature <span className="gold-gradient-text">Services</span></h2>
            <div className="section-divider" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { img: '/images/service-residential.png', tag: 'Residential', title: 'Luxury Homes', desc: 'From penthouses to villas, we create living spaces that are both breathtaking and deeply personal. Every room becomes a sanctuary.' },
              { img: '/images/service-commercial.png', tag: 'Commercial', title: 'Business Spaces', desc: 'Offices, restaurants, and retail environments designed to impress clients and inspire teams — where productivity meets aesthetic perfection.' },
              { img: '/images/service-hospitality.png', tag: 'Hospitality', title: 'Hotels & Resorts', desc: 'Guest experiences that linger long after checkout. We design lobbies, suites, and common areas that set new hospitality benchmarks.' },
            ].map((s, i) => (
              <TiltCard key={i} className="overflow-hidden">
                <div className="relative h-56 md:h-64 -mx-6 md:-mx-8 -mt-6 md:-mt-8 mb-6 overflow-hidden">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-6 md:left-8 font-inter text-xs tracking-[0.3em] uppercase text-gold/80">{s.tag}</span>
                </div>
                <h3 className="font-playfair text-2xl text-white mb-3">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed font-inter mb-4">{s.desc}</p>
                <Link to="/services" className="inline-flex items-center gap-2 text-gold text-sm font-inter tracking-wider hover:gap-4 transition-all duration-300">
                  Learn More <span>→</span>
                </Link>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ FEATURED PROJECTS ════════════ */}
      <section className="py-24 md:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="font-inter text-xs tracking-[0.4em] uppercase text-gold/60">Our Work</span>
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mt-3 mb-4">Featured <span className="gold-gradient-text">Projects</span></h2>
            <div className="section-divider" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { img: '/images/project1.png', title: 'Skyline Penthouse', location: 'Mumbai', cat: 'Residential' },
              { img: '/images/project3.png', title: 'The Grand Kitchen', location: 'Delhi', cat: 'Kitchen' },
              { img: '/images/project7.png', title: 'Royal Lobby', location: 'Dubai', cat: 'Hospitality' },
            ].map((p, i) => (
              <TiltCard key={i} className="group">
                <div className="relative h-72 -mx-6 md:-mx-8 -mt-6 md:-mt-8 mb-6 overflow-hidden rounded-t-2xl">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent" />
                  <span className="absolute top-4 right-4 font-inter text-[10px] tracking-[0.3em] uppercase px-3 py-1 border border-gold/30 text-gold/70">{p.cat}</span>
                </div>
                <h3 className="font-playfair text-xl text-white mb-1">{p.title}</h3>
                <p className="text-white/40 text-sm font-inter">{p.location}</p>
              </TiltCard>
            ))}
          </div>

          <Reveal className="text-center mt-12">
            <Link to="/portfolio" className="inline-block px-10 py-4 border border-gold text-gold font-inter text-sm tracking-[0.2em] uppercase hover:bg-gold hover:text-rich-black transition-all duration-500" data-cursor>
              View All Projects
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ════════════ TESTIMONIALS ════════════ */}
      <section className="py-24 md:py-32 px-4" style={{ background: 'linear-gradient(180deg, var(--color-dark-lighter) 0%, var(--color-rich-black) 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="font-inter text-xs tracking-[0.4em] uppercase text-gold/60">Testimonials</span>
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mt-3 mb-4">Client <span className="gold-gradient-text">Voices</span></h2>
            <div className="section-divider" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { quote: 'Elite Interiors transformed our apartment into a work of art. The attention to detail is unparalleled — every texture, every shadow, every curve was meticulously considered.', name: 'Priya Sharma', role: 'CEO, Lumina Corp', rating: 5 },
              { quote: 'From concept to completion, the experience was seamless. The 3D visualizations were spot-on, and the final result exceeded our wildest expectations. A truly world-class team.', name: 'Arjun Mehta', role: 'Founder, NovaTech', rating: 5 },
              { quote: 'Our hotel lobby went from ordinary to iconic. Guest reviews mention the design before they mention the service — that says everything about the impact Elite Interiors creates.', name: 'Karan Patel', role: 'Director, Zenith Hotels', rating: 5 },
            ].map((t, i) => (
              <TiltCard key={i}>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="text-gold text-sm">★</span>
                  ))}
                </div>
                <p className="font-cormorant text-lg text-white/70 italic leading-relaxed mb-6">"{t.quote}"</p>
                <div className="border-t border-gold/10 pt-4">
                  <h4 className="font-playfair text-white">{t.name}</h4>
                  <p className="text-white/40 text-sm font-inter">{t.role}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ STATS BAR ════════════ */}
      <section className="py-16 px-4 border-y border-gold/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: '200+', label: 'Projects Completed' },
            { num: '15+', label: 'Years Experience' },
            { num: '50+', label: 'Design Awards' },
            { num: '98%', label: 'Client Satisfaction' },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <span className="font-playfair text-4xl md:text-5xl gold-gradient-text">{s.num}</span>
              <p className="font-inter text-xs tracking-[0.2em] uppercase text-white/40 mt-2">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════════ CTA BANNER ════════════ */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero1.png" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-rich-black via-rich-black/80 to-rich-black" />
        </div>
        <Reveal className="relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="font-playfair text-4xl md:text-6xl text-white mb-6">Your Dream Space Awaits</h2>
          <p className="font-cormorant text-xl text-white/60 mb-10">Take the first step towards a space that defines you. Complimentary consultation for distinguished homeowners.</p>
          <Link to="/contact" className="inline-block px-12 py-5 bg-gold text-rich-black font-inter text-sm tracking-[0.2em] uppercase hover:bg-gold-light transition-all duration-500" data-cursor>
            Book Free Consultation
          </Link>
        </Reveal>
      </section>
    </motion.main>
  )
}


