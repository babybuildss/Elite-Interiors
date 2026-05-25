'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import Loader from '@/components/Loader';

const LOADED_KEY = 'elite-interiors-initial-load';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(LOADED_KEY)) return;

    setShowLoader(true);
    const timer = setTimeout(() => {
      setShowLoader(false);
      sessionStorage.setItem(LOADED_KEY, '1');
    }, 2600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoader && <Loader key="loader" />}
      </AnimatePresence>
      <CustomCursor />
      <Navigation />
      <main className="grain-overlay min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
