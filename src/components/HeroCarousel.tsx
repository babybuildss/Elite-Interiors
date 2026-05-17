'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroCarouselProps {
  images: { src: string; alt: string }[];
  autoPlayInterval?: number;
  children?: React.ReactNode;
}

export default function HeroCarousel({ images, autoPlayInterval = 5000, children }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(timer);
  }, [nextSlide, autoPlayInterval, isPaused]);

  return (
    <div
      className="absolute inset-0 z-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images with Crossfade */}
      <AnimatePresence mode="crossfade">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${images[current].src}')` }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/40 to-[#0a0a0a] z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/60 z-[1]" />

      {/* Content layer */}
      <div className="relative z-[2] h-full">{children}</div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] flex items-center gap-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="cursor-hover relative group"
            aria-label={`Go to slide ${i + 1}`}
          >
            <div
              className={`w-8 h-[2px] transition-all duration-500 ${
                i === current ? 'bg-[#C9A96E] w-12' : 'bg-white/20 group-hover:bg-white/40'
              }`}
            />
            {i === current && (
              <motion.div
                layoutId="carouselProgress"
                className="absolute top-0 left-0 h-full bg-[#C9A96E]"
                initial={{ width: '0%' }}
                animate={{ width: isPaused ? '0%' : '100%' }}
                transition={{ duration: autoPlayInterval / 1000, ease: 'linear' }}
                onAnimationComplete={() => {
                  if (!isPaused) nextSlide();
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[3] w-12 h-12 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#C9A96E] hover:border-[#C9A96E]/40 transition-all duration-300 cursor-hover backdrop-blur-sm bg-[#0a0a0a]/20"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[3] w-12 h-12 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#C9A96E] hover:border-[#C9A96E]/40 transition-all duration-300 cursor-hover backdrop-blur-sm bg-[#0a0a0a]/20"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide counter */}
      <div className="absolute bottom-8 right-8 z-[3] font-[family-name:var(--font-inter)] text-white/30 text-xs tracking-[0.2em]">
        <span className="text-[#C9A96E]">{String(current + 1).padStart(2, '0')}</span>
        <span className="mx-1">/</span>
        <span>{String(images.length).padStart(2, '0')}</span>
      </div>
    </div>
  );
}
