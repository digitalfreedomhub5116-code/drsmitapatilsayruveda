import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const MarqueeSection = () => {
  const items = [
    "Hair Care", 
    "Skin Care", 
    "Diabetes", 
    "General Health", 
    "Immunity Boost", 
    "Natural Glow", 
    "Vitality"
  ];

  // Quadruple the items to ensure seamless looping on large screens
  const marqueeItems = [...items, ...items, ...items, ...items];

  return (
    <section className="bg-charcoal border-y border-gold/20 py-5 overflow-hidden relative z-20">
      {/* Side Fade Masks */}
      <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-charcoal to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-charcoal to-transparent z-10 pointer-events-none" />

      <div className="flex whitespace-nowrap min-w-full">
        <motion.div
          className="flex gap-16 items-center shrink-0 will-change-transform" 
          initial={{ x: "-50%" }} // Start from the left (-50%)
          animate={{ x: "0%" }}    // Move to the right (0%)
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 30 
          }}
        >
          {marqueeItems.map((text, i) => (
            <div key={i} className="flex items-center gap-16">
              <span className="font-display text-xl md:text-2xl text-gold/90 uppercase tracking-[0.15em] font-medium whitespace-nowrap">
                {text}
              </span>
              <Sparkles size={16} className="text-white/20" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MarqueeSection;