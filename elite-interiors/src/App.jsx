import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [cursorHover, setCursorHover] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const moveCursor = (e) => setCursorPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

  useEffect(() => {
    const addHover = () => setCursorHover(true)
    const removeHover = () => setCursorHover(false)
    const interactiveEls = document.querySelectorAll('a, button, input, textarea, select, [data-cursor]')
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })
    return () => {
      interactiveEls.forEach(el => {
        el.removeEventListener('mouseenter', addHover)
        el.removeEventListener('mouseleave', removeHover)
      })
    }
  }, [loading, location])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  if (loading) {
    return (
      <div className="fixed inset-0 bg-rich-black flex items-center justify-center z-[99999]">
        <div className="text-center">
          <div className="loader-diamond mx-auto mb-8" />
          <h2 className="font-playfair text-gold text-2xl tracking-[0.3em] uppercase">Elite Interiors</h2>
          <div className="mt-4 w-48 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
        </div>
      </div>
    )
  }

  return (
    <>
      <div
        className={`custom-cursor hidden lg:block ${cursorHover ? 'hover' : ''}`}
        style={{ left: cursorPos.x - 10, top: cursorPos.y - 10 }}
      />
      <div className="film-grain" />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  )
}
