'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import Loader from '@/components/Loader';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">{loading && <Loader key="loader" />}</AnimatePresence>
      {!loading && (
        <>
          <CustomCursor />
          <Navigation />
          <main className="grain-overlay min-h-screen">{children}</main>
          <Footer />
        </>
      )}
    </>
  );
}
