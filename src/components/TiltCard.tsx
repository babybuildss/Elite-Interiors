'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltAmount?: number;
  glareEnabled?: boolean;
}

export default function TiltCard({ children, className = '', tiltAmount = 10, glareEnabled = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [tiltAmount, -tiltAmount]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-tiltAmount, tiltAmount]);

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={`relative ${className}`}
    >
      {children}

      {/* 3D Glare effect */}
      {glareEnabled && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-inherit overflow-hidden"
          style={{
            opacity: isHovered ? 0.15 : 0,
            background: useTransform(
              [glareX, glareY],
              ([latestX, latestY]) =>
                `radial-gradient(circle at ${latestX}% ${latestY}%, rgba(201, 169, 110, 0.4), transparent 60%)`
            ),
            transition: 'opacity 0.3s',
          }}
        />
      )}

      {/* 3D Shadow */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-inherit"
        style={{
          background: 'rgba(201, 169, 110, 0.1)',
          filter: 'blur(20px)',
          transform: 'translateZ(-20px)',
          opacity: isHovered ? 0.5 : 0,
          transition: 'opacity 0.3s',
        }}
      />
    </motion.div>
  );
}
