'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SiteLayout from '@/components/SiteLayout';

const offices = [
  {
    city: 'Mumbai',
    address: '42, Elite Towers, MG Road,\nMumbai, Maharashtra 400001',
    phone: '+91 22 4000 1234',
    email: 'mumbai@eliteinteriors.in',
    image: '/images/office-mumbai.png',
    hours: 'Mon - Sat: 10:00 AM - 7:00 PM',
  },
  {
    city: 'Delhi',
    address: '18, Design Hub, Connaught Place,\nNew Delhi 110001',
    phone: '+91 11 5000 5678',
    email: 'delhi@eliteinteriors.in',
    image: '/images/office-delhi.png',
    hours: 'Mon - Sat: 10:00 AM - 7:00 PM',
  },
];

const contactInfo = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: 'Call Us',
    value: '+91 98765 43210',
    sub: 'Available Mon-Sat, 10am-7pm',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Email Us',
    value: 'hello@eliteinteriors.in',
    sub: 'We respond within 24 hours',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Visit Us',
    value: 'Mumbai & Delhi',
    sub: 'By appointment only',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } }),
};

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', projectType: '', budget: '', timeline: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [activeOffice, setActiveOffice] = useState(0);

  const formRef = useRef<HTMLDivElement>(null);
  const officesRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const formInView = useInView(formRef, { once: true, margin: '-80px' });
  const officesInView = useInView(officesRef, { once: true, margin: '-80px' });
  const bookingInView = useInView(bookingRef, { once: true, margin: '-80px' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <SiteLayout>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/contact-hero.png')" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]/40" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pb-16 pt-32 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-[#C9A96E]" />
              <span className="font-[family-name:var(--font-inter)] text-[#C9A96E] text-xs tracking-[0.4em] uppercase">Contact</span>
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl lg:text-7xl text-white leading-tight">
              Let&apos;s Create <span className="text-gradient-gold italic">Together</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ===== CONTACT FORM + INFO ===== */}
      <section ref={formRef} className="py-28 md:py-36 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div initial="hidden" animate={formInView ? 'visible' : 'hidden'} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Left: Info */}
              <motion.div variants={fadeUp} className="lg:col-span-2 space-y-6">
                <div className="mb-8">
                  <h2 className="font-[family-name:var(--font-playfair)] text-3xl text-white mb-4">
                    Start Your <span className="text-gradient-gold italic">Journey</span>
                  </h2>
                  <p className="font-[family-name:var(--font-cormorant)] text-white/40 text-lg leading-relaxed">
                    Ready to transform your space? Share your vision with us, and our team of expert designers will bring it to life with unparalleled craftsmanship and dedication.
                  </p>
                </div>

                {contactInfo.map((info, i) => (
                  <motion.div
                    key={info.label}
                    className="glass-card p-6 group cursor-hover transition-all duration-500 hover:border-[rgba(201,169,110,0.3)]"
                    whileHover={{ y: -3 }}
                    initial={{ opacity: 0, x: -30 }}
                    animate={formInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-[#C9A96E] group-hover:scale-110 transition-transform duration-300 mt-1">{info.icon}</div>
                      <div>
                        <h4 className="font-[family-name:var(--font-inter)] text-white/70 text-xs tracking-[0.2em] uppercase mb-1">{info.label}</h4>
                        <p className="font-[family-name:var(--font-cormorant)] text-white text-lg">{info.value}</p>
                        <p className="font-[family-name:var(--font-inter)] text-white/30 text-xs mt-1">{info.sub}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Social */}
                <div className="pt-6">
                  <p className="font-[family-name:var(--font-inter)] text-white/30 text-xs tracking-[0.2em] uppercase mb-4">Follow Us</p>
                  <div className="flex gap-3">
                    {['Instagram', 'Pinterest', 'LinkedIn', 'Houzz'].map((social) => (
                      <a key={social} href="#" className="px-4 py-2 border border-white/10 text-white/40 text-xs tracking-[0.1em] uppercase hover:border-[#C9A96E]/40 hover:text-[#C9A96E] transition-all duration-300 cursor-hover">
                        {social}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Right: Form */}
              <motion.div variants={fadeUp} className="lg:col-span-3">
                <form onSubmit={handleSubmit} className="glass-card p-8 md:p-10">
                  <h3 className="font-[family-name:var(--font-playfair)] text-white text-2xl mb-2">Book a Consultation</h3>
                  <p className="font-[family-name:var(--font-cormorant)] text-white/30 text-base mb-8">Fill in the details and our design team will reach out within 24 hours.</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="font-[family-name:var(--font-inter)] text-white/40 text-xs tracking-[0.2em] uppercase block mb-3">Your Name *</label>
                      <input type="text" required value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} className="w-full bg-transparent border-b border-white/10 py-3 text-white font-[family-name:var(--font-cormorant)] text-lg focus:border-[#C9A96E] focus:outline-none transition-colors duration-300 placeholder:text-white/20" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="font-[family-name:var(--font-inter)] text-white/40 text-xs tracking-[0.2em] uppercase block mb-3">Email Address *</label>
                      <input type="email" required value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} className="w-full bg-transparent border-b border-white/10 py-3 text-white font-[family-name:var(--font-cormorant)] text-lg focus:border-[#C9A96E] focus:outline-none transition-colors duration-300 placeholder:text-white/20" placeholder="john@example.com" />
                    </div>
                    <div>
                      <label className="font-[family-name:var(--font-inter)] text-white/40 text-xs tracking-[0.2em] uppercase block mb-3">Phone Number</label>
                      <input type="tel" value={formState.phone} onChange={(e) => setFormState({ ...formState, phone: e.target.value })} className="w-full bg-transparent border-b border-white/10 py-3 text-white font-[family-name:var(--font-cormorant)] text-lg focus:border-[#C9A96E] focus:outline-none transition-colors duration-300 placeholder:text-white/20" placeholder="+91 98765 43210" />
                    </div>
                    <div>
                      <label className="font-[family-name:var(--font-inter)] text-white/40 text-xs tracking-[0.2em] uppercase block mb-3">Project Type</label>
                      <select value={formState.projectType} onChange={(e) => setFormState({ ...formState, projectType: e.target.value })} className="w-full bg-transparent border-b border-white/10 py-3 text-white font-[family-name:var(--font-cormorant)] text-lg focus:border-[#C9A96E] focus:outline-none transition-colors duration-300 cursor-hover appearance-none">
                        <option value="" className="bg-[#0a0a0a]">Select type</option>
                        <option value="residential" className="bg-[#0a0a0a]">Residential</option>
                        <option value="commercial" className="bg-[#0a0a0a]">Commercial</option>
                        <option value="hospitality" className="bg-[#0a0a0a]">Hospitality</option>
                        <option value="renovation" className="bg-[#0a0a0a]">Renovation</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="font-[family-name:var(--font-inter)] text-white/40 text-xs tracking-[0.2em] uppercase block mb-3">Estimated Budget</label>
                      <div className="flex flex-wrap gap-3">
                        {['Under 10L', '10L - 25L', '25L - 50L', '50L - 1Cr', 'Above 1Cr'].map((budget) => (
                          <button key={budget} type="button" onClick={() => setFormState({ ...formState, budget })} className={`px-4 py-2 text-xs tracking-[0.15em] border transition-all duration-300 cursor-hover ${formState.budget === budget ? 'border-[#C9A96E] bg-[#C9A96E]/10 text-[#C9A96E]' : 'border-white/10 text-white/40 hover:border-[#C9A96E]/40 hover:text-white/60'}`}>
                            {budget}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="font-[family-name:var(--font-inter)] text-white/40 text-xs tracking-[0.2em] uppercase block mb-3">Preferred Timeline</label>
                      <div className="flex flex-wrap gap-3">
                        {['Within 3 months', '3-6 months', '6-12 months', 'Flexible'].map((timeline) => (
                          <button key={timeline} type="button" onClick={() => setFormState({ ...formState, timeline })} className={`px-4 py-2 text-xs tracking-[0.15em] border transition-all duration-300 cursor-hover ${formState.timeline === timeline ? 'border-[#C9A96E] bg-[#C9A96E]/10 text-[#C9A96E]' : 'border-white/10 text-white/40 hover:border-[#C9A96E]/40 hover:text-white/60'}`}>
                            {timeline}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="font-[family-name:var(--font-inter)] text-white/40 text-xs tracking-[0.2em] uppercase block mb-3">Tell Us About Your Vision</label>
                      <textarea value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} rows={4} className="w-full bg-transparent border-b border-white/10 py-3 text-white font-[family-name:var(--font-cormorant)] text-lg focus:border-[#C9A96E] focus:outline-none transition-colors duration-300 resize-none placeholder:text-white/20" placeholder="Describe your dream space..." />
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <motion.button type="submit" className="magnetic-btn px-10 py-4 bg-gradient-to-r from-[#C9A96E] to-[#A07D44] text-[#0a0a0a] text-xs tracking-[0.25em] uppercase font-semibold hover:shadow-[0_0_40px_rgba(201,169,110,0.3)] transition-all duration-500 cursor-hover" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      {submitted ? 'Message Sent ✓' : 'Send Message'}
                    </motion.button>
                    <p className="font-[family-name:var(--font-inter)] text-white/20 text-[10px] tracking-[0.15em] uppercase hidden md:block">We respond within 24 hours</p>
                  </div>

                  {submitted && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 bg-[#C9A96E]/10 border border-[#C9A96E]/20">
                      <p className="font-[family-name:var(--font-cormorant)] text-[#C9A96E] text-lg">Thank you! Your consultation request has been received. Our design team will contact you within 24 hours.</p>
                    </motion.div>
                  )}
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== OFFICES ===== */}
      <section ref={officesRef} className="py-28 md:py-36 relative overflow-hidden bg-[#080808]">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div initial="hidden" animate={officesInView ? 'visible' : 'hidden'} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-8 h-[1px] bg-[#C9A96E]" />
                <span className="font-[family-name:var(--font-inter)] text-[#C9A96E] text-xs tracking-[0.4em] uppercase">Our Studios</span>
                <div className="w-8 h-[1px] bg-[#C9A96E]" />
              </div>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-white">
                Visit Our <span className="text-gradient-gold italic">Studios</span>
              </h2>
            </motion.div>

            {/* Office tabs */}
            <motion.div variants={fadeUp} className="flex justify-center gap-4 mb-10">
              {offices.map((office, i) => (
                <button
                  key={office.city}
                  onClick={() => setActiveOffice(i)}
                  className={`px-6 py-2 text-xs tracking-[0.2em] uppercase transition-all duration-300 cursor-hover ${
                    activeOffice === i ? 'bg-[#C9A96E] text-[#0a0a0a]' : 'border border-white/10 text-white/50 hover:border-[#C9A96E]/40'
                  }`}
                >
                  {office.city}
                </button>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="glass-card overflow-hidden max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2">
                <div className="aspect-square md:aspect-auto overflow-hidden">
                  <img src={offices[activeOffice].image} alt={`${offices[activeOffice].city} Studio`} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <h3 className="font-[family-name:var(--font-playfair)] text-white text-2xl mb-6">Elite Interiors {offices[activeOffice].city}</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-[#C9A96E] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      <p className="font-[family-name:var(--font-cormorant)] text-white/60 text-base whitespace-pre-line">{offices[activeOffice].address}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-[#C9A96E] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      <p className="font-[family-name:var(--font-cormorant)] text-white/60 text-base">{offices[activeOffice].phone}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-[#C9A96E] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      <p className="font-[family-name:var(--font-cormorant)] text-white/60 text-base">{offices[activeOffice].email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-[#C9A96E] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <p className="font-[family-name:var(--font-cormorant)] text-white/60 text-base">{offices[activeOffice].hours}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== CONSULTATION BOOKING ===== */}
      <section ref={bookingRef} className="py-28 md:py-36 relative overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-6 md:px-12">
          <motion.div initial="hidden" animate={bookingInView ? 'visible' : 'hidden'} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-white">
                How Your <span className="text-gradient-gold italic">Consultation</span> Works
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: '01', title: 'Book a Slot', desc: 'Fill the form above or call us. We\'ll schedule a 60-minute consultation at your convenience, either in-person at our studio or via video call.' },
                { step: '02', title: 'Share Your Vision', desc: 'During the consultation, tell us everything about your dream space. Our designer will ask the right questions and understand your lifestyle, tastes, and aspirations.' },
                { step: '03', title: 'Receive Your Proposal', desc: 'Within 5 business days, receive a comprehensive design proposal with mood boards, 3D concepts, material palettes, and a detailed project plan with transparent pricing.' },
              ].map((item, i) => (
                <motion.div key={item.step} variants={fadeUp} custom={i * 0.1} className="glass-card p-8 text-center transition-all duration-500 hover:border-[rgba(201,169,110,0.3)]" whileHover={{ y: -5 }}>
                  <span className="font-[family-name:var(--font-playfair)] text-4xl text-[#C9A96E]/20 block mb-4">{item.step}</span>
                  <h4 className="font-[family-name:var(--font-playfair)] text-white text-xl mb-3">{item.title}</h4>
                  <p className="font-[family-name:var(--font-cormorant)] text-white/40 text-base leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </SiteLayout>
  );
}
