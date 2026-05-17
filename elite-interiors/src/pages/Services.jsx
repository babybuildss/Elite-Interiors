import { useState, useRef, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

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

const services = [
  { img: '/images/service-residential.png', tag: '01', title: 'Residential Design', desc: 'Your home should be a reflection of your soul. We design bespoke living spaces — from intimate studios to sprawling estates — where every room tells your story. Our residential process begins with deep conversations about your lifestyle, aspirations, and aesthetic preferences, culminating in spaces that feel both grand and intimately yours.', features: ['Space Planning & Layout', 'Custom Furniture Design', 'Lighting Design', 'Art Curation', 'Smart Home Integration'] },
  { img: '/images/service-commercial.png', tag: '02', title: 'Commercial Spaces', desc: 'First impressions are permanent. We design offices, restaurants, and retail environments that command attention, inspire teams, and drive business results. Our commercial designs balance functionality with visual impact, ensuring your brand identity resonates in every square foot.', features: ['Brand-Driven Design', 'Workplace Strategy', 'Acoustic Engineering', 'Sustainable Materials', 'Regulatory Compliance'] },
  { img: '/images/service-hospitality.png', tag: '03', title: 'Hospitality Design', desc: 'In the hospitality industry, design IS the experience. We create hotel lobbies that take breath away, suites that feel like home, and restaurants that become destinations. Every texture, scent, and shadow is orchestrated to create unforgettable guest journeys.', features: ['Guest Experience Mapping', 'F&B Space Design', 'Spa & Wellness', 'Lobby & Common Areas', 'Theme Development'] },
  { img: '/images/service-retail.png', tag: '04', title: 'Luxury Retail', desc: 'Luxury retail demands an environment as exclusive as the products it showcases. We design boutiques and showrooms where every display is a gallery piece, every aisle a curated journey, and every touchpoint reinforces the brand promise of uncompromising quality.', features: ['Visual Merchandising', 'Display Engineering', 'Customer Flow Design', 'Lighting Artistry', 'Seasonal Adaptability'] },
]

const processSteps = [
  { num: '01', title: 'Discovery', desc: 'We immerse ourselves in your world — understanding your lifestyle, preferences, and the emotional resonance you seek from your space. This deep listening phase is the foundation of everything.' },
  { num: '02', title: 'Conceptualization', desc: 'Armed with insights, our designers craft multiple concept directions. Using mood boards, sketches, and 3D renderings, we paint a vivid picture of possibilities until the perfect vision emerges.' },
  { num: '03', title: 'Development', desc: 'The chosen concept is refined into detailed technical drawings, material specifications, and photorealistic visualizations. Every decision is documented, every detail is deliberate.' },
  { num: '04', title: 'Execution', desc: 'Our project managers orchestrate a symphony of craftsmen, vendors, and artisans. With military precision and weekly progress updates, we bring the vision to life — on time, every time.' },
]

const faqs = [
  { q: 'What is the typical timeline for a luxury interior project?', a: 'Timelines vary based on scope and complexity. A single room refresh takes 4-6 weeks, while a full home renovation typically spans 3-6 months. Large commercial projects may take 8-12 months. We provide a detailed timeline during the discovery phase and guarantee on-time delivery.' },
  { q: 'Do you work with clients outside India?', a: 'Absolutely. We have completed projects in Dubai, Singapore, London, and New York. Our remote design process includes virtual consultations, 3D walkthroughs, and regular video updates. For international projects, we deploy a dedicated on-site team during the execution phase.' },
  { q: 'What is your design fee structure?', a: 'Our fees are transparent and tailored to each project. We offer three engagement models: Design Only (concept + drawings), Design + Execution (turnkey), and Consultation (hourly advisory). During your free consultation, we will recommend the model that best fits your needs and budget.' },
  { q: 'Can I be involved in the design process?', a: 'We encourage it! Your involvement is not just welcome — it is essential. We schedule regular design review sessions, provide 3D walk-throughs for every major decision, and use collaborative mood boards so you can add inspiration at any time. This is YOUR space, and your voice matters.' },
  { q: 'Do you offer post-project support?', a: 'Yes — every Elite Interiors project comes with a complimentary one-year care package. This includes seasonal styling adjustments, minor touch-ups, and priority access to our design team for any new needs. Many of our clients also opt into our annual retainer for ongoing styling refreshes.' },
]

export default function Services() {
  const [activeTab, setActiveTab] = useState(0)
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <motion.main exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      {/* ═══ HERO ═══ */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/service-hospitality.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-rich-black/90 via-rich-black/70 to-rich-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-rich-black via-transparent to-rich-black/50" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="font-inter text-xs tracking-[0.4em] uppercase text-gold/60 mb-4 block">What We Do</span>
            <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white mb-4">Our <span className="gold-gradient-text">Services</span></h1>
            <p className="font-cormorant text-xl md:text-2xl text-white/60 max-w-xl">Comprehensive design solutions for every space and vision</p>
          </motion.div>
        </div>
      </section>

      {/* ═══ SERVICE TABS ═══ */}
      <section className="py-24 md:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-12">
            <span className="font-inter text-xs tracking-[0.4em] uppercase text-gold/60">Explore</span>
            <h2 className="font-playfair text-4xl md:text-5xl text-white mt-3 mb-4">Service <span className="gold-gradient-text">Categories</span></h2>
            <div className="section-divider" />
          </Reveal>

          {/* Tab Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {services.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`px-6 py-3 font-inter text-sm tracking-[0.15em] uppercase border transition-all duration-500 ${
                  activeTab === i
                    ? 'border-gold bg-gold text-rich-black'
                    : 'border-gold/30 text-gold/70 hover:border-gold hover:text-gold'
                }`}
                data-cursor
              >
                {s.title}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={services[activeTab].img} alt={services[activeTab].title} className="w-full h-full object-cover" style={{ transform: 'perspective(800px) rotateY(-3deg)', transition: 'transform 0.6s ease' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-rich-black/60 to-transparent" />
                <span className="absolute top-6 left-6 font-playfair text-6xl gold-gradient-text opacity-30">{services[activeTab].tag}</span>
              </div>
              <div>
                <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold/60 mb-2 block">Service {services[activeTab].tag}</span>
                <h3 className="font-playfair text-3xl md:text-4xl text-white mb-4">{services[activeTab].title}</h3>
                <p className="text-white/60 font-inter text-sm leading-relaxed mb-6">{services[activeTab].desc}</p>
                <ul className="space-y-3 mb-8">
                  {services[activeTab].features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-white/50 font-inter text-sm">
                      <span className="w-1.5 h-1.5 bg-gold rotate-45 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="py-24 md:py-32 px-4 bg-dark-lighter">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="font-inter text-xs tracking-[0.4em] uppercase text-gold/60">How We Work</span>
            <h2 className="font-playfair text-4xl md:text-5xl text-white mt-3 mb-4">Our <span className="gold-gradient-text">Process</span></h2>
            <div className="section-divider" />
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <TiltCard key={i}>
                <span className="font-playfair text-5xl gold-gradient-text opacity-30">{step.num}</span>
                <h3 className="font-playfair text-xl text-white mt-2 mb-3">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed font-inter">{step.desc}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING TIERS ═══ */}
      <section className="py-24 md:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="font-inter text-xs tracking-[0.4em] uppercase text-gold/60">Investment</span>
            <h2 className="font-playfair text-4xl md:text-5xl text-white mt-3 mb-4">Pricing <span className="gold-gradient-text">Tiers</span></h2>
            <div className="section-divider" />
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { tier: 'Essentials', price: '₹8L', period: 'Starting from', features: ['Single Room Design', '2D Layout Plans', 'Material Selection', 'Color Consultation', '2 Revision Rounds', '8-Week Delivery'], highlight: false },
              { tier: 'Premium', price: '₹18L', period: 'Starting from', features: ['Full Home Design', '3D Visualization', 'Custom Furniture', 'Smart Home Setup', '5 Revision Rounds', '12-Week Delivery', '1-Year Care Package'], highlight: true },
              { tier: 'Bespoke', price: '₹35L+', period: 'Starting from', features: ['Everything in Premium', 'VR Walkthrough', 'Art Curation', 'International Sourcing', 'Unlimited Revisions', '16-Week Delivery', 'Lifetime Advisory', 'Dedicated Project Manager'], highlight: false },
            ].map((plan, i) => (
              <TiltCard key={i} className={plan.highlight ? 'ring-1 ring-gold/50' : ''}>
                {plan.highlight && <span className="inline-block font-inter text-[10px] tracking-[0.3em] uppercase bg-gold text-rich-black px-3 py-1 mb-4">Most Popular</span>}
                <h3 className="font-playfair text-2xl text-white mb-1">{plan.tier}</h3>
                <div className="mb-6">
                  <span className="font-playfair text-4xl gold-gradient-text">{plan.price}</span>
                  <span className="text-white/40 text-sm font-inter ml-2">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-white/60 font-inter text-sm">
                      <span className="text-gold text-xs">◆</span> {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 font-inter text-sm tracking-[0.15em] uppercase border transition-all duration-500 ${
                  plan.highlight ? 'border-gold bg-gold text-rich-black hover:bg-gold-light' : 'border-gold/30 text-gold hover:bg-gold hover:text-rich-black'
                }`} data-cursor>
                  Get Started
                </button>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-24 md:py-32 px-4 bg-dark-lighter">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="font-inter text-xs tracking-[0.4em] uppercase text-gold/60">Questions</span>
            <h2 className="font-playfair text-4xl md:text-5xl text-white mt-3 mb-4">Frequently <span className="gold-gradient-text">Asked</span></h2>
            <div className="section-divider" />
          </Reveal>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="border border-gold/10 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gold/5 transition-colors"
                    data-cursor
                  >
                    <span className="font-inter text-sm text-white pr-4">{faq.q}</span>
                    <span className={`text-gold transition-transform duration-300 shrink-0 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="px-6 pb-6 text-white/50 font-inter text-sm leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </motion.main>
  )
}
