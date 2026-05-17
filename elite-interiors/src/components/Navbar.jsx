import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
        scrolled
          ? 'bg-rich-black/90 backdrop-blur-xl border-b border-gold/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group" data-cursor>
          <div className="w-10 h-10 border border-gold rotate-45 flex items-center justify-center group-hover:bg-gold/10 transition-all duration-500">
            <span className="text-gold font-playfair font-bold -rotate-45 text-sm">EI</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-playfair text-lg tracking-[0.2em] text-white group-hover:text-gold transition-colors">ELITE</span>
            <span className="font-cormorant text-xs tracking-[0.3em] text-gold/70 block -mt-1">INTERIORS</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              data-cursor
              className={`relative font-inter text-sm tracking-[0.15em] uppercase transition-colors duration-300 hover:text-gold ${
                location.pathname === link.path ? 'text-gold nav-link-active' : 'text-white/70'
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-0 h-[1px] bg-gold transition-all duration-500 ${
                location.pathname === link.path ? 'w-full' : 'w-0'
              }`} />
            </Link>
          ))}
          <Link
            to="/contact"
            data-cursor
            className="ml-4 px-6 py-2.5 border border-gold text-gold text-sm tracking-[0.15em] uppercase font-inter hover:bg-gold hover:text-rich-black transition-all duration-500"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          data-cursor
        >
          <span className={`block w-6 h-[1.5px] bg-gold transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`} />
          <span className={`block w-6 h-[1.5px] bg-gold transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[4.5px]' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden bg-rich-black/95 backdrop-blur-xl border-t border-gold/10 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={link.path}
                    className={`block text-lg tracking-[0.15em] uppercase font-inter transition-colors ${
                      location.pathname === link.path ? 'text-gold' : 'text-white/70'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                to="/contact"
                className="mt-2 inline-block px-6 py-3 border border-gold text-gold text-sm tracking-[0.15em] uppercase font-inter text-center hover:bg-gold hover:text-rich-black transition-all duration-500"
              >
                Book Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
