'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import SiteLayout from '@/components/SiteLayout';

const stats = [
  { number: '150+', label: 'Projects Completed', desc: 'Across 15+ cities in India' },
  { number: '12+', label: 'Years of Excellence', desc: 'Since 2012, crafting luxury' },
  { number: '25+', label: 'Design Awards', desc: 'National & international recognition' },
  { number: '98%', label: 'Client Retention', desc: 'Clients return for their next vision' },
];

const team = [
  { name: 'Arjun Malhotra', role: 'Founder & Principal Designer', image: '/images/team-2.png', desc: 'With over 18 years in luxury design, Arjun founded Elite Interiors with a vision to redefine Indian interior design on the global stage.' },
  { name: 'Ananya Iyer', role: 'Creative Director', image: '/images/team-1.png', desc: 'Ananya brings 14 years of international design experience from Milan and London, infusing every project with cosmopolitan sensibility.' },
  { name: 'Rohan Desai', role: 'Head of Architecture', image: '/images/team-4.png', desc: 'A licensed architect with 10 years of experience, Rohan ensures structural brilliance meets aesthetic perfection in every project.' },
  { name: 'Meera Patel', role: 'Senior Interior Designer', image: '/images/team-3.png', desc: 'Meera\'s expertise in material science and sustainable design brings an eco-conscious dimension to our luxury projects.' },
];

const awards = [
  { year: '2024', title: 'India Design Award', org: 'India Design Mark' },
  { year: '2023', title: 'Best Luxury Interior', org: 'AD 100 India' },
  { year: '2023', title: 'Excellence in Hospitality Design', org: 'IIID Awards' },
  { year: '2022', title: 'Residential Project of the Year', org: 'Design Excellence Awards' },
  { year: '2021', title: 'Top 50 Designers in India', org: 'Architectural Digest' },
  { year: '2020', title: 'Innovation in Sustainable Design', org: 'IGBC Green Awards' },
];

const timeline = [
  { year: '2012', title: 'The Beginning', desc: 'Arjun Malhotra founded Elite Interiors in a small Mumbai studio with a team of 3 and a dream to transform Indian design.' },
  { year: '2014', title: 'First Major Project', desc: 'Completed our first luxury penthouse project in South Mumbai, gaining immediate recognition in the industry.' },
  { year: '2016', title: 'Delhi Expansion', desc: 'Opened our second studio in Delhi, expanding our reach to North India and completing over 30 projects.' },
  { year: '2018', title: 'Award-Winning Year', desc: 'Won our first AD 100 award and completed the landmark Meridian Tower project spanning 12,000 sq ft.' },
  { year: '2020', title: 'Sustainable Focus', desc: 'Launched our Green Design Initiative, integrating eco-conscious practices into every luxury project.' },
  { year: '2022', title: 'National Recognition', desc: 'Named among India\'s Top 50 Design Firms. Team grew to 40+ designers, architects, and artisans.' },
  { year: '2024', title: 'The Future', desc: 'Expanding to Bangalore and Hyderabad. Pioneering smart home integration with luxury design.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } }),
};

export default function AboutPage() {
  const storyRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const awardsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const storyInView = useInView(storyRef, { once: true, margin: '-80px' });
  const visionInView = useInView(visionRef, { once: true, margin: '-80px' });
  const teamInView = useInView(teamRef, { once: true, margin: '-80px' });
  const awardsInView = useInView(awardsRef, { once: true, margin: '-80px' });
  const timelineInView = useInView(timelineRef, { once: true, margin: '-80px' });

  const { scrollYProgress } = useScroll({ target: storyRef, offset: ['start end', 'end start'] });
  const imgParallax = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <SiteLayout>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/about-studio.png')" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]/40" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pb-16 pt-32 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-[#C9A96E]" />
              <span className="font-[family-name:var(--font-inter)] text-[#C9A96E] text-xs tracking-[0.4em] uppercase">About Us</span>
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl lg:text-7xl text-white leading-tight">
              Our <span className="text-gradient-gold italic">Story</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ===== OUR STORY ===== */}
      <section ref={storyRef} className="py-28 md:py-36 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div initial="hidden" animate={storyInView ? 'visible' : 'hidden'} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            <div className="grid lg:grid-cols-2 gap-16">
              <motion.div variants={fadeUp} className="relative">
                <div className="relative overflow-hidden">
                  <motion.div className="aspect-[4/3] overflow-hidden" style={{ y: imgParallax }}>
                    <img src="/images/about-studio.png" alt="Elite Interiors Studio" className="w-full h-full object-cover" />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 to-transparent" />
                </div>
                <motion.div
                  className="absolute -bottom-6 -right-6 md:right-8 bg-[#0a0a0a] border border-[#C9A96E]/20 p-6 backdrop-blur-xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={storyInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <div className="font-[family-name:var(--font-playfair)] text-4xl text-gradient-gold">12+</div>
                  <div className="font-[family-name:var(--font-inter)] text-[10px] text-white/40 tracking-[0.2em] uppercase mt-1">Years of Excellence</div>
                </motion.div>
                <div className="absolute top-8 -left-4 w-[1px] h-24 bg-gradient-to-b from-[#C9A96E]/40 to-transparent" />
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-col justify-center">
                <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-white mb-6">
                  Designing Beyond <span className="text-gradient-gold italic">Imagination</span>
                </h2>
                <p className="font-[family-name:var(--font-cormorant)] text-white/60 text-lg leading-relaxed mb-4">
                  Founded in 2012, Elite Interiors has grown from a passionate design studio into one of the most sought-after luxury interior design firms in the country. Our philosophy is simple yet profound: every space tells a story, and we are the authors who bring that narrative to life.
                </p>
                <p className="font-[family-name:var(--font-cormorant)] text-white/40 text-lg leading-relaxed mb-6">
                  Our team of award-winning designers, architects, and artisans work in harmony to transform raw spaces into living masterpieces. We blend contemporary aesthetics with timeless elegance, ensuring each project stands as a testament to refined taste and uncompromising quality.
                </p>
                <p className="font-[family-name:var(--font-cormorant)] text-white/40 text-lg leading-relaxed mb-8">
                  From a 3-person studio in Mumbai to a 40+ strong team across India, our journey has been fuelled by an unwavering commitment to excellence and a deep understanding that luxury is not about price ΓÇö it&apos;s about the experience, the emotion, and the story each space tells.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-[1px] bg-[#C9A96E]/40" />
                  <div>
                    <p className="font-[family-name:var(--font-playfair)] text-white/80 text-sm italic">Arjun Malhotra</p>
                    <p className="font-[family-name:var(--font-inter)] text-[10px] text-[#C9A96E]/50 tracking-[0.2em] uppercase">Founder & Principal Designer</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-16 border-y border-[#C9A96E]/10 bg-[#080808]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="text-center group cursor-hover"
                initial={{ opacity: 0, y: 30 }}
                animate={storyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-gradient-gold mb-2">{s.number}</div>
                <div className="font-[family-name:var(--font-inter)] text-white/70 text-xs tracking-[0.15em] uppercase mb-1">{s.label}</div>
                <div className="font-[family-name:var(--font-cormorant)] text-white/30 text-sm">{s.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MISSION / VISION ===== */}
      <section ref={visionRef} className="py-28 md:py-36 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div initial="hidden" animate={visionInView ? 'visible' : 'hidden'} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div variants={fadeUp} className="glass-card p-10 md:p-12 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#C9A96E] to-[#C9A96E]/0" />
                <h3 className="font-[family-name:var(--font-inter)] text-[#C9A96E] text-xs tracking-[0.3em] uppercase mb-4">Our Mission</h3>
                <p className="font-[family-name:var(--font-playfair)] text-white text-2xl md:text-3xl leading-snug mb-6">
                  To transform every space into a narrative of elegance, where design transcends decoration and becomes an experience that moves the soul.
                </p>
                <p className="font-[family-name:var(--font-cormorant)] text-white/40 text-lg leading-relaxed">
                  We believe luxury is not defined by price tags but by the thoughtfulness behind every decision. Our mission is to democratize exceptional design, making world-class interior artistry accessible to those who appreciate the difference between ordinary and extraordinary.
                </p>
              </motion.div>
              <motion.div variants={fadeUp} className="glass-card p-10 md:p-12 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#E8D5A8] to-[#E8D5A8]/0" />
                <h3 className="font-[family-name:var(--font-inter)] text-[#E8D5A8] text-xs tracking-[0.3em] uppercase mb-4">Our Vision</h3>
                <p className="font-[family-name:var(--font-playfair)] text-white text-2xl md:text-3xl leading-snug mb-6">
                  To be India&apos;s most admired luxury design studio, setting global benchmarks for creativity, craftsmanship, and client experience.
                </p>
                <p className="font-[family-name:var(--font-cormorant)] text-white/40 text-lg leading-relaxed">
                  We envision a future where every Indian home and commercial space reflects the depth and sophistication of its occupants. Through innovation, sustainability, and unwavering quality, we aim to make that vision a reality ΓÇö one masterpiece at a time.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section ref={teamRef} className="py-28 md:py-36 relative overflow-hidden bg-[#080808]">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div initial="hidden" animate={teamInView ? 'visible' : 'hidden'} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-[#C9A96E]" />
              <span className="font-[family-name:var(--font-inter)] text-[#C9A96E] text-xs tracking-[0.4em] uppercase">The Team</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-16">
              Meet the <span className="text-gradient-gold italic">Minds</span>
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  variants={fadeUp}
                  custom={i * 0.1}
                  className="group cursor-hover"
                  whileHover={{ y: -8 }}
                >
                  <div className="relative overflow-hidden aspect-[3/4] mb-6">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="font-[family-name:var(--font-playfair)] text-white text-lg group-hover:text-[#C9A96E] transition-colors duration-300">{member.name}</h3>
                      <p className="font-[family-name:var(--font-inter)] text-[#C9A96E]/60 text-[10px] tracking-[0.2em] uppercase mt-1">{member.role}</p>
                      <p className="font-[family-name:var(--font-cormorant)] text-white/40 text-sm mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{member.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== AWARDS ===== */}
      <section ref={awardsRef} className="py-28 md:py-36 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div initial="hidden" animate={awardsInView ? 'visible' : 'hidden'} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-8 h-[1px] bg-[#C9A96E]" />
                <span className="font-[family-name:var(--font-inter)] text-[#C9A96E] text-xs tracking-[0.4em] uppercase">Recognition</span>
                <div className="w-8 h-[1px] bg-[#C9A96E]" />
              </div>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-white">
                Awards & <span className="text-gradient-gold italic">Accolades</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {awards.map((award, i) => (
                <motion.div
                  key={award.title}
                  variants={fadeUp}
                  custom={i * 0.05}
                  className="glass-card p-6 flex items-start gap-4 group cursor-hover transition-all duration-500 hover:border-[rgba(201,169,110,0.3)]"
                  whileHover={{ y: -4 }}
                >
                  <span className="font-[family-name:var(--font-playfair)] text-2xl text-[#C9A96E]/30 group-hover:text-[#C9A96E]/60 transition-colors duration-300">{award.year}</span>
                  <div>
                    <h4 className="font-[family-name:var(--font-playfair)] text-white text-lg group-hover:text-[#C9A96E] transition-colors duration-300">{award.title}</h4>
                    <p className="font-[family-name:var(--font-inter)] text-white/30 text-xs tracking-[0.1em] uppercase mt-1">{award.org}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section ref={timelineRef} className="py-28 md:py-36 relative overflow-hidden bg-[#080808]">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent" />
        <div className="max-w-[1000px] mx-auto px-6 md:px-12">
          <motion.div initial="hidden" animate={timelineInView ? 'visible' : 'hidden'} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-white">
                Our <span className="text-gradient-gold italic">Journey</span>
              </h2>
            </motion.div>

            <div className="relative">
              {/* Center line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-[#C9A96E]/15 md:-translate-x-[0.5px]" />

              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  variants={fadeUp}
                  custom={i * 0.1}
                  className={`relative flex items-start gap-8 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[#C9A96E] rounded-full -translate-x-1/2 mt-2 z-10" />

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-[calc(50%-30px)] ${i % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8 md:ml-auto'}`}>
                    <span className="font-[family-name:var(--font-playfair)] text-2xl text-[#C9A96E]/40">{item.year}</span>
                    <h4 className="font-[family-name:var(--font-playfair)] text-white text-xl mt-1">{item.title}</h4>
                    <p className="font-[family-name:var(--font-cormorant)] text-white/40 text-base mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </SiteLayout>
  );
}
