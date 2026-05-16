import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-rich-black border-t border-gold/10">
      {/* Top CTA Bar */}
      <div className="py-16 px-4 text-center" style={{ background: 'linear-gradient(135deg, rgba(201,169,110,0.08) 0%, transparent 50%, rgba(201,169,110,0.08) 100%)' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="font-playfair text-3xl md:text-5xl text-white mb-4"
        >
          Ready to Transform Your Space?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-cormorant text-xl text-white/60 mb-8"
        >
          Let us create something extraordinary together
        </motion.p>
        <Link
          to="/contact"
          className="inline-block px-10 py-4 border border-gold text-gold font-inter text-sm tracking-[0.2em] uppercase hover:bg-gold hover:text-rich-black transition-all duration-500"
          data-cursor
        >
          Start Your Journey
        </Link>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 border border-gold rotate-45 flex items-center justify-center">
                <span className="text-gold font-playfair font-bold -rotate-45 text-sm">EI</span>
              </div>
              <div>
                <span className="font-playfair text-lg tracking-[0.2em] text-white">ELITE</span>
                <span className="font-cormorant text-xs tracking-[0.3em] text-gold/70 block -mt-1">INTERIORS</span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Redefining luxury living through exceptional interior design since 2010. Every space tells a story — let us write yours.
            </p>
            <div className="flex gap-4">
              {['Instagram', 'Pinterest', 'LinkedIn'].map(social => (
                <a key={social} href="#" data-cursor className="w-10 h-10 border border-gold/20 flex items-center justify-center hover:border-gold hover:bg-gold/10 transition-all duration-300 group">
                  <span className="text-gold/50 text-xs group-hover:text-gold transition-colors">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-gold text-lg mb-6 tracking-wider">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {[
                { to: '/about', label: 'About Us' },
                { to: '/services', label: 'Services' },
                { to: '/portfolio', label: 'Portfolio' },
                { to: '/contact', label: 'Contact' },
              ].map(link => (
                <Link key={link.to} to={link.to} className="text-white/50 text-sm hover:text-gold hover:pl-2 transition-all duration-300 font-inter tracking-wide">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-playfair text-gold text-lg mb-6 tracking-wider">Services</h4>
            <div className="flex flex-col gap-3">
              {['Residential Design', 'Commercial Spaces', 'Hospitality Design', 'Luxury Retail', 'Turnkey Solutions'].map(s => (
                <span key={s} className="text-white/50 text-sm font-inter tracking-wide">{s}</span>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-playfair text-gold text-lg mb-6 tracking-wider">Newsletter</h4>
            <p className="text-white/50 text-sm mb-4 font-inter">Stay updated with our latest projects and design insights.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-dark-lighter border border-gold/20 px-4 py-3 text-white text-sm font-inter focus:outline-none focus:border-gold/50 placeholder-white/30"
              />
              <button className="px-4 py-3 bg-gold text-rich-black text-sm font-inter tracking-wider hover:bg-gold-light transition-colors">
                JOIN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gold/10 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-xs font-inter tracking-wider">
          <span>&copy; {currentYear} Elite Interiors. All Rights Reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gold transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
