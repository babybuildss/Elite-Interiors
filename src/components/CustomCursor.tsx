'use client';

import { useRef, useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Skip on touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const setupHoverListeners = () => {
      const hoverables = document.querySelectorAll('a, button, [data-cursor-hover], input, select, textarea');
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    setupHoverListeners();
    const interval = setInterval(setupHoverListeners, 3000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearInterval(interval);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference transition-[width,height] duration-300"
        style={{
          width: isHovering ? 60 : 40,
          height: isHovering ? 60 : 40,
          borderRadius: '50%',
          border: '1px solid rgba(201, 169, 110, 0.4)',
          transform: `translate(${position.x - (isHovering ? 30 : 20)}px, ${position.y - (isHovering ? 30 : 20)}px) scale(${isClicking ? 0.8 : 1})`,
          opacity: isVisible ? 1 : 0,
          transition: 'transform 0.15s ease-out, width 0.3s, height 0.3s, opacity 0.3s',
        }}
      />
      <div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#C9A96E] pointer-events-none z-[9998]"
        style={{
          transform: `translate(${position.x - 3}px, ${position.y - 3}px) scale(${isClicking ? 2 : 1})`,
          opacity: isVisible ? 1 : 0,
          transition: 'transform 0.08s ease-out, opacity 0.3s',
        }}
      />
    </>
  );
}
