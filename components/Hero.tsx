import React, { useState, useEffect } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { MAIN_PRODUCT } from '../constants';
import { useData } from '../contexts/DataContext';
import SparkleButton from './ui/SparkleButton';
import { Sparkles, Leaf } from 'lucide-react';

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

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex flex-col md:flex-row items-center overflow-hidden pt-28 pb-10 bg-porcelain">
      
      {/* 1. Animated Background Gradient / Blobs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
         {/* Blob 1 - Rosegold */}
         <motion.div 
            className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-rosegold/10 rounded-full blur-[80px] md:blur-[100px] mix-blend-multiply"
            animate={{ 
              x: [0, 100, 0], 
              y: [0, 50, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
         />
         {/* Blob 2 - Gold */}
         <motion.div 
            className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-gold/10 rounded-full blur-[60px] md:blur-[80px] mix-blend-multiply"
            animate={{ 
              x: [0, -50, 0], 
              y: [0, 100, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
         />
         {/* Blob 3 - Blush */}
         <motion.div 
            className="absolute -bottom-[20%] left-[20%] w-[600px] h-[600px] bg-blush/20 rounded-full blur-[100px] md:blur-[120px] mix-blend-multiply"
            animate={{ 
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
         />
      </div>

      {/* 2. Floating Particles / Petals */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
           <motion.div
             key={i}
             className="absolute"
             initial={{ 
               top: Math.random() * 100 + "%", 
               left: Math.random() * 100 + "%", 
               opacity: 0 
             }}
             animate={{ 
               top: [null, Math.random() * 100 + "%"], // Move to random spot
               left: [null, Math.random() * 100 + "%"],
               opacity: [0, 0.6, 0],
               rotate: [0, 360]
             }}
             transition={{ 
               duration: Math.random() * 20 + 20, 
               repeat: Infinity, 
               ease: "linear" 
             }}
           >
             {i % 2 === 0 ? (
               <div className="w-1.5 h-1.5 bg-gold rounded-full blur-[1px]" />
             ) : (
               <Leaf size={16} className="text-rosegold/30 rotate-45" />
             )}
           </motion.div>
        ))}
      </div>

      {/* Left Content */}
      <div className="w-full md:w-1/2 px-6 md:px-16 lg:px-24 z-10 flex flex-col justify-center items-center md:items-start text-center md:text-left h-full mt-4 md:mt-0">
        <div className="h-24 md:h-40 flex items-center justify-center md:justify-start w-full mb-8">
          <AnimatePresence mode="wait">
            <motion.h1
              key={activePhraseIndex}
              initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -20, opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-serif text-3xl md:text-6xl text-charcoal leading-tight drop-shadow-sm"
            >
              {heroPhrases[activePhraseIndex]}
            </motion.h1>
          </AnimatePresence>
        </div>
        
        <motion.div 
          className="mt-4"
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
      <div className="w-full md:w-1/2 flex items-center justify-center relative z-10 mt-12 md:mt-0">
        
        {/* Animated Rings Aura */}
        <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-72 h-72 md:w-96 md:h-96 bg-gold/20 rounded-full blur-2xl" 
        />
        <motion.div 
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute w-60 h-60 md:w-80 md:h-80 bg-rosegold/20 rounded-full blur-xl" 
        />

        <motion.div 
          className="relative group"
          animate={{ y: [0, -15, 0] }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          {/* Main Image Carousel Container */}
          <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-2xl bg-white border-4 border-white transform transition-transform will-change-transform">
             <AnimatePresence mode="wait">
               {heroImages.length > 0 && (
                 <motion.img 
                  key={activeImageIndex}
                  src={heroImages[activeImageIndex]} 
                  alt="Ayurvedic Essence" 
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2 }}
                  loading="eager" // Load LCP image eagerly
                />
               )}
             </AnimatePresence>

             {/* Carousel Indicators */}
             <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
               {heroImages.map((_, i) => (
                 <div 
                   key={i} 
                   className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === activeImageIndex ? 'bg-white w-4 shadow-sm' : 'bg-white/50'}`} 
                 />
               ))}
             </div>
          </div>
          
          {/* Decorative Ring (Static on Mobile) */}
          <div className="absolute -inset-4 border border-gold/40 rounded-3xl z-[-1] hidden md:block" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;