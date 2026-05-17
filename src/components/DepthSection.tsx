'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface DepthSectionProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  bgImage?: string;
}

export default function DepthSection({ children, className = '', depth = 0.3, bgImage }: DepthSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Safe scroll — only use when ref is attached
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [`${depth * -100}px`, `${depth * 100}px`]);
  const contentY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  return (
    <section ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Parallax background layer */}
      {bgImage && (
        <motion.div
          className="absolute inset-0 -top-20 -bottom-20 z-0"
          style={{ y: bgY }}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${bgImage}')` }}
          />
          <div className="absolute inset-0 bg-[#0a0a0a]/80" />
        </motion.div>
      )}

      {/* 3D floating content layer */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10"
      >
        {children}
      </motion.div>

      {/* Atmospheric depth layers */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0a0a] to-transparent z-[5] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-[5] pointer-events-none" />
    </section>
  );
}
