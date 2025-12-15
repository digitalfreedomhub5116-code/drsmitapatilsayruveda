import React, { useState, useEffect } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { MAIN_PRODUCT } from '../constants';
import { useData } from '../contexts/DataContext';
import SparkleButton from './ui/SparkleButton';
import { Sparkles } from 'lucide-react';

const motion = m as any;

interface HeroProps {
  onAddToCart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onAddToCart }) => {
  const { heroPhrases, heroImages } = useData();
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (heroPhrases.length === 0) return;
    const interval = setInterval(() => {
      setActivePhraseIndex((prev) => (prev + 1) % heroPhrases.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroPhrases]);

  // Carousel timer
  useEffect(() => {
    if (heroImages.length === 0) return;
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages]);

  const marqueeText = "Experience the purifying power of nature with Dr. Smita Patil's authentic Ayurvedic blend.";

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex flex-col md:flex-row items-center overflow-hidden pt-28 pb-10">
      
      {/* Background Gradient */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-b from-white via-porcelain to-blush/20 opacity-50" />

      {/* Left Content */}
      <div className="w-full md:w-1/2 px-6 md:px-16 lg:px-24 z-10 flex flex-col justify-center items-center md:items-start text-center md:text-left h-full mt-4 md:mt-0">
        <div className="h-24 md:h-40 flex items-center justify-center md:justify-start w-full">
          <AnimatePresence mode="wait">
            <motion.h1
              key={activePhraseIndex}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="font-serif text-3xl md:text-6xl text-charcoal leading-tight"
            >
              {heroPhrases[activePhraseIndex]}
            </motion.h1>
          </AnimatePresence>
        </div>
        
        {/* Animated Marquee Strip */}
        <div className="w-full max-w-md overflow-hidden relative mt-4 md:mt-6 mb-8 mask-gradient-x">
            <motion.div 
                className="flex gap-8 whitespace-nowrap"
                animate={{ x: "-50%" }}
                transition={{ 
                    repeat: Infinity, 
                    duration: 15, 
                    ease: "linear" 
                }}
            >
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                        <span className="font-sans text-sm md:text-lg text-gray-600">{marqueeText}</span>
                        <Sparkles size={12} className="text-gold fill-gold/50" />
                    </div>
                ))}
            </motion.div>
        </div>

        <motion.div 
          className="mt-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <SparkleButton onClick={onAddToCart}>
            Shop Now - ₹{MAIN_PRODUCT.price}
          </SparkleButton>
        </motion.div>
      </div>

      {/* Right Content - Product Image Carousel */}
      <div className="w-full md:w-1/2 flex items-center justify-center relative z-10 mt-8 md:mt-0">
        
        {/* Static Glow Aura */}
        <div className="absolute w-64 h-64 md:w-80 md:h-80 bg-gold/10 rounded-full blur-3xl" />

        <div className="relative group">
          {/* Main Image Carousel Container */}
          <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-xl bg-white border-4 border-white transform transition-transform will-change-transform">
             <AnimatePresence mode="wait">
               {heroImages.length > 0 && (
                 <motion.img 
                  key={activeImageIndex}
                  src={heroImages[activeImageIndex]} 
                  alt="Ayurvedic Essence" 
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  loading="eager" // Load LCP image eagerly
                />
               )}
             </AnimatePresence>

             {/* Carousel Indicators */}
             <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
               {heroImages.map((_, i) => (
                 <div 
                   key={i} 
                   className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === activeImageIndex ? 'bg-white w-4' : 'bg-white/50'}`} 
                 />
               ))}
             </div>
          </div>
          
          {/* Decorative Ring (Static on Mobile) */}
          <div className="absolute -inset-4 border border-gold/40 rounded-3xl z-[-1] hidden md:block" />
        </div>
      </div>
    </section>
  );
};

export default Hero;