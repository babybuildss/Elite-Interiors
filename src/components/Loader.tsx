'use client';

import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative flex flex-col items-center"
      >
        <motion.div
          initial={{ rotate: 0, scale: 0 }}
          animate={{ rotate: 45, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-20 h-20 border border-[#C9A96E] mb-8"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%+16px)]">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-[family-name:var(--font-playfair)] text-[#C9A96E] text-3xl tracking-[0.3em] whitespace-nowrap"
          >
            ELITE
          </motion.h1>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 w-56 h-[1px] bg-[#1a1a1a] overflow-hidden"
      >
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ delay: 0.8, duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-full bg-gradient-to-r from-[#C9A96E] to-[#E8D5A8]"
        />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="mt-4 font-[family-name:var(--font-cormorant)] text-[#666] text-sm tracking-[0.5em] uppercase"
      >
        Crafting Elegance
      </motion.p>
    </motion.div>
  );
}
