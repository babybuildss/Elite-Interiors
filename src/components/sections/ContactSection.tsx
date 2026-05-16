'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const contactInfo = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Visit Our Studio',
    value: '42, Elite Towers, MG Road,\nMumbai, Maharashtra 400001',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: 'Call Us',
    value: '+91 98765 43210',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Email Us',
    value: 'hello@eliteinteriors.in',
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

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
    <section id="contact" ref={sectionRef} className="relative py-32 md:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent" />

      {/* Hero image */}
      <div className="absolute top-0 left-0 right-0 h-[50vh] overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/contact-hero.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/80 to-[#0a0a0a]" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="pt-16 md:pt-24">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-[#C9A96E]" />
              <span className="font-[family-name:var(--font-inter)] text-[#C9A96E] text-xs tracking-[0.4em] uppercase">
                Get In Touch
              </span>
            </div>

            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
              Let&apos;s Create
              <br />
              <span className="text-gradient-gold italic">Something Extraordinary</span>
            </h2>

            <p className="font-[family-name:var(--font-cormorant)] text-white/50 text-lg max-w-2xl">
              Ready to transform your space into a masterpiece? Share your vision with us,
              and let our team of expert designers bring it to life with unparalleled craftsmanship.
            </p>
          </motion.div>

          {/* Contact grid */}
          <div className="grid lg:grid-cols-5 gap-12 mt-16">
            {/* Left: Contact info */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.label}
                  className="glass-card p-6 group cursor-hover transition-all duration-500"
                  whileHover={{ y: -4, borderColor: 'rgba(201, 169, 110, 0.3)' }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-[#C9A96E] group-hover:scale-110 transition-transform duration-300 mt-1">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-[family-name:var(--font-inter)] text-white/70 text-xs tracking-[0.2em] uppercase mb-1">
                        {info.label}
                      </h4>
                      <p className="font-[family-name:var(--font-cormorant)] text-white text-lg whitespace-pre-line">
                        {info.value}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Social links */}
              <div className="pt-6">
                <p className="font-[family-name:var(--font-inter)] text-white/30 text-xs tracking-[0.2em] uppercase mb-4">
                  Follow Us
                </p>
                <div className="flex gap-4">
                  {['Instagram', 'Pinterest', 'LinkedIn'].map((social) => (
                    <motion.a
                      key={social}
                      href="#"
                      className="px-4 py-2 border border-white/10 text-white/40 text-xs tracking-[0.15em] uppercase hover:border-[#C9A96E]/40 hover:text-[#C9A96E] transition-all duration-300 cursor-hover"
                      whileHover={{ y: -2 }}
                    >
                      {social}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div variants={itemVariants} className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="glass-card p-8 md:p-10">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="font-[family-name:var(--font-inter)] text-white/40 text-xs tracking-[0.2em] uppercase block mb-3">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-transparent border-b border-white/10 py-3 text-white font-[family-name:var(--font-cormorant)] text-lg focus:border-[#C9A96E] focus:outline-none transition-colors duration-300 placeholder:text-white/20"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="font-[family-name:var(--font-inter)] text-white/40 text-xs tracking-[0.2em] uppercase block mb-3">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-transparent border-b border-white/10 py-3 text-white font-[family-name:var(--font-cormorant)] text-lg focus:border-[#C9A96E] focus:outline-none transition-colors duration-300 placeholder:text-white/20"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="font-[family-name:var(--font-inter)] text-white/40 text-xs tracking-[0.2em] uppercase block mb-3">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full bg-transparent border-b border-white/10 py-3 text-white font-[family-name:var(--font-cormorant)] text-lg focus:border-[#C9A96E] focus:outline-none transition-colors duration-300 placeholder:text-white/20"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="font-[family-name:var(--font-inter)] text-white/40 text-xs tracking-[0.2em] uppercase block mb-3">
                      Project Type
                    </label>
                    <select
                      value={formState.projectType}
                      onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                      className="w-full bg-transparent border-b border-white/10 py-3 text-white font-[family-name:var(--font-cormorant)] text-lg focus:border-[#C9A96E] focus:outline-none transition-colors duration-300 cursor-hover appearance-none"
                    >
                      <option value="" className="bg-[#0a0a0a]">Select type</option>
                      <option value="residential" className="bg-[#0a0a0a]">Residential</option>
                      <option value="commercial" className="bg-[#0a0a0a]">Commercial</option>
                      <option value="hospitality" className="bg-[#0a0a0a]">Hospitality</option>
                      <option value="renovation" className="bg-[#0a0a0a]">Renovation</option>
                    </select>
                  </div>

                  {/* Budget */}
                  <div className="md:col-span-2">
                    <label className="font-[family-name:var(--font-inter)] text-white/40 text-xs tracking-[0.2em] uppercase block mb-3">
                      Estimated Budget
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {['Under 10L', '10L - 25L', '25L - 50L', '50L - 1Cr', 'Above 1Cr'].map((budget) => (
                        <button
                          key={budget}
                          type="button"
                          onClick={() => setFormState({ ...formState, budget })}
                          className={`px-4 py-2 text-xs tracking-[0.15em] border transition-all duration-300 cursor-hover ${
                            formState.budget === budget
                              ? 'border-[#C9A96E] bg-[#C9A96E]/10 text-[#C9A96E]'
                              : 'border-white/10 text-white/40 hover:border-[#C9A96E]/40 hover:text-white/60'
                          }`}
                        >
                          {budget}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="md:col-span-2">
                    <label className="font-[family-name:var(--font-inter)] text-white/40 text-xs tracking-[0.2em] uppercase block mb-3">
                      Tell Us About Your Vision
                    </label>
                    <textarea
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      rows={4}
                      className="w-full bg-transparent border-b border-white/10 py-3 text-white font-[family-name:var(--font-cormorant)] text-lg focus:border-[#C9A96E] focus:outline-none transition-colors duration-300 resize-none placeholder:text-white/20"
                      placeholder="Describe your dream space..."
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="mt-8 flex items-center justify-between">
                  <motion.button
                    type="submit"
                    className="magnetic-btn px-10 py-4 bg-gradient-to-r from-[#C9A96E] to-[#A07D44] text-[#0a0a0a] text-xs tracking-[0.25em] uppercase font-semibold hover:shadow-[0_0_40px_rgba(201,169,110,0.3)] transition-all duration-500 cursor-hover"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {submitted ? 'Message Sent ✓' : 'Send Message'}
                  </motion.button>

                  <p className="font-[family-name:var(--font-inter)] text-white/20 text-[10px] tracking-[0.15em] uppercase hidden md:block">
                    We respond within 24 hours
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
