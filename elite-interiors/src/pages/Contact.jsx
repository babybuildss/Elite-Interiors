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

const offices = [
  {
    city: 'Mumbai',
    address: '42, Altamount Road, Tardeo, Mumbai 400026',
    phone: '+91 22 6789 0123',
    email: 'mumbai@eliteinteriors.in',
    hours: 'Mon — Sat: 10:00 AM — 7:00 PM',
    img: '/images/hero1.png',
  },
  {
    city: 'Delhi',
    address: '18, Aurangzeb Road, New Delhi 110011',
    phone: '+91 11 2345 6789',
    email: 'delhi@eliteinteriors.in',
    hours: 'Mon — Sat: 10:00 AM — 7:00 PM',
    img: '/images/hero3.png',
  },
]

const processSteps = [
  { num: '01', title: 'Book Consultation', desc: 'Fill out the form or call us. We will schedule a complimentary 45-minute session at your convenience.' },
  { num: '02', title: 'Design Discovery', desc: 'Our lead designer visits your space (or reviews plans), understands your vision, and discusses possibilities.' },
  { num: '03', title: 'Receive Proposal', desc: 'Within 5 business days, receive a detailed design proposal with scope, timeline, and transparent pricing.' },
  { num: '04', title: 'Begin Transformation', desc: 'Upon approval, your dedicated project team mobilizes. Welcome to the Elite Interiors experience.' },
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', projectType: 'Residential', budget: '₹10L — ₹25L', timeline: '3-6 Months', message: '',
  })
  const [activeOffice, setActiveOffice] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <motion.main exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      {/* ═══ HERO ═══ */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero4.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-rich-black/90 via-rich-black/70 to-rich-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-rich-black via-transparent to-rich-black/50" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="font-inter text-xs tracking-[0.4em] uppercase text-gold/60 mb-4 block">Get In Touch</span>
            <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white mb-4">Let's <span className="gold-gradient-text">Connect</span></h1>
            <p className="font-cormorant text-xl md:text-2xl text-white/60 max-w-xl">Begin your journey to an extraordinary space</p>
          </motion.div>
        </div>
      </section>

      {/* ═══ CONSULTATION FORM ═══ */}
      <section className="py-24 md:py-32 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            <Reveal>
              <span className="font-inter text-xs tracking-[0.4em] uppercase text-gold/60 mb-4 block">Free Consultation</span>
              <h2 className="font-playfair text-3xl md:text-5xl text-white mb-8">Book Your <span className="gold-gradient-text">Session</span></h2>

              {submitted && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 border border-gold/30 bg-gold/5">
                  <p className="text-gold font-inter text-sm">Thank you! We will contact you within 24 hours to schedule your consultation.</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-inter text-xs tracking-[0.2em] uppercase text-white/40 mb-2">Full Name *</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-dark-lighter border border-gold/10 px-4 py-3 text-white font-inter text-sm focus:outline-none focus:border-gold/40 transition-colors placeholder-white/20" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block font-inter text-xs tracking-[0.2em] uppercase text-white/40 mb-2">Email *</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-dark-lighter border border-gold/10 px-4 py-3 text-white font-inter text-sm focus:outline-none focus:border-gold/40 transition-colors placeholder-white/20" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-inter text-xs tracking-[0.2em] uppercase text-white/40 mb-2">Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-dark-lighter border border-gold/10 px-4 py-3 text-white font-inter text-sm focus:outline-none focus:border-gold/40 transition-colors placeholder-white/20" placeholder="+91 98765 43210" />
                  </div>
                  <div>
                    <label className="block font-inter text-xs tracking-[0.2em] uppercase text-white/40 mb-2">Project Type</label>
                    <select name="projectType" value={formData.projectType} onChange={handleChange} className="w-full bg-dark-lighter border border-gold/10 px-4 py-3 text-white font-inter text-sm focus:outline-none focus:border-gold/40 transition-colors">
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Hospitality</option>
                      <option>Retail</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-inter text-xs tracking-[0.2em] uppercase text-white/40 mb-2">Budget Range</label>
                    <select name="budget" value={formData.budget} onChange={handleChange} className="w-full bg-dark-lighter border border-gold/10 px-4 py-3 text-white font-inter text-sm focus:outline-none focus:border-gold/40 transition-colors">
                      <option>Under ₹10L</option>
                      <option>₹10L — ₹25L</option>
                      <option>₹25L — ₹50L</option>
                      <option>₹50L — ₹1Cr</option>
                      <option>Above ₹1Cr</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-inter text-xs tracking-[0.2em] uppercase text-white/40 mb-2">Timeline</label>
                    <select name="timeline" value={formData.timeline} onChange={handleChange} className="w-full bg-dark-lighter border border-gold/10 px-4 py-3 text-white font-inter text-sm focus:outline-none focus:border-gold/40 transition-colors">
                      <option>Under 2 Months</option>
                      <option>2-3 Months</option>
                      <option>3-6 Months</option>
                      <option>6-12 Months</option>
                      <option>Flexible</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block font-inter text-xs tracking-[0.2em] uppercase text-white/40 mb-2">Tell Us About Your Vision</label>
                  <textarea name="message" rows="5" value={formData.message} onChange={handleChange} className="w-full bg-dark-lighter border border-gold/10 px-4 py-3 text-white font-inter text-sm focus:outline-none focus:border-gold/40 transition-colors placeholder-white/20 resize-none" placeholder="Describe your dream space, style preferences, and any specific requirements..." />
                </div>
                <button type="submit" className="w-full md:w-auto px-12 py-4 bg-gold text-rich-black font-inter text-sm tracking-[0.2em] uppercase hover:bg-gold-light transition-all duration-500" data-cursor>
                  Book Free Consultation
                </button>
              </form>
            </Reveal>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-2 space-y-6">
            <Reveal delay={0.2}>
              <TiltCard>
                <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold/60 mb-4 block">Direct Contact</span>
                <div className="space-y-4">
                  {[
                    { label: 'Email', value: 'hello@eliteinteriors.in' },
                    { label: 'Phone', value: '+91 22 6789 0123' },
                    { label: 'WhatsApp', value: '+91 98765 43210' },
                  ].map((c, i) => (
                    <div key={i}>
                      <span className="font-inter text-[10px] tracking-[0.2em] uppercase text-gold/50">{c.label}</span>
                      <p className="text-white font-inter text-sm mt-1">{c.value}</p>
                    </div>
                  ))}
                </div>
              </TiltCard>
            </Reveal>
            <Reveal delay={0.3}>
              <TiltCard>
                <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold/60 mb-4 block">Office Hours</span>
                <p className="text-white font-inter text-sm">Monday — Saturday</p>
                <p className="text-white/50 font-inter text-sm">10:00 AM — 7:00 PM IST</p>
                <p className="text-white/30 font-inter text-xs mt-2">Sunday: By appointment only</p>
              </TiltCard>
            </Reveal>
            <Reveal delay={0.4}>
              <TiltCard>
                <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold/60 mb-4 block">Response Time</span>
                <p className="text-white font-inter text-sm">We respond to all inquiries within <span className="text-gold">24 hours</span>.</p>
                <p className="text-white/30 font-inter text-xs mt-2">For urgent requests, please call directly.</p>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ OFFICES ═══ */}
      <section className="py-24 md:py-32 px-4 bg-dark-lighter">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-12">
            <span className="font-inter text-xs tracking-[0.4em] uppercase text-gold/60">Visit Us</span>
            <h2 className="font-playfair text-4xl md:text-5xl text-white mt-3 mb-4">Our <span className="gold-gradient-text">Studios</span></h2>
            <div className="section-divider" />
          </Reveal>

          <div className="flex justify-center gap-4 mb-8">
            {offices.map((o, i) => (
              <button
                key={i}
                onClick={() => setActiveOffice(i)}
                className={`px-6 py-3 font-inter text-sm tracking-[0.15em] uppercase border transition-all duration-500 ${
                  activeOffice === i ? 'border-gold bg-gold text-rich-black' : 'border-gold/30 text-gold/70 hover:border-gold hover:text-gold'
                }`}
                data-cursor
              >
                {o.city}
              </button>
            ))}
          </div>

          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="aspect-video overflow-hidden">
                <img src={offices[activeOffice].img} alt={offices[activeOffice].city} className="w-full h-full object-cover" />
              </div>
              <div className="glass-card p-6 md:p-8 flex flex-col justify-center">
                <h3 className="font-playfair text-3xl text-white mb-4">Elite Interiors {offices[activeOffice].city}</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Address', value: offices[activeOffice].address },
                    { label: 'Phone', value: offices[activeOffice].phone },
                    { label: 'Email', value: offices[activeOffice].email },
                    { label: 'Hours', value: offices[activeOffice].hours },
                  ].map((item, i) => (
                    <div key={i}>
                      <span className="font-inter text-[10px] tracking-[0.2em] uppercase text-gold/50">{item.label}</span>
                      <p className="text-white font-inter text-sm mt-1">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ CONSULTATION PROCESS ═══ */}
      <section className="py-24 md:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="font-inter text-xs tracking-[0.4em] uppercase text-gold/60">How It Works</span>
            <h2 className="font-playfair text-4xl md:text-5xl text-white mt-3 mb-4">The <span className="gold-gradient-text">Process</span></h2>
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
    </motion.main>
  )
}
