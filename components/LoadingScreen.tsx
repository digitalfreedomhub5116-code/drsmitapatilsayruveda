import React, { useEffect, useState } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';

const motion = m as any;

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [isPresent, setIsPresent] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPresent(false);
      setTimeout(onComplete, 1000); // Wait for exit animation
    }, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isPresent && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-sand"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.1,
            transition: { duration: 0.8, ease: "easeInOut" } 
          }}
        >
          <div className="relative w-64 h-64 flex flex-col items-center justify-center">
            {/* Morphing/Drawing SVG */}
            <svg
              viewBox="0 0 200 200"
              className="w-48 h-48 stroke-gold fill-none stroke-[2px]"
            >
              {/* Bowl/Mortar */}
              <motion.path
                d="M 40 80 Q 100 180 160 80 L 160 70 L 40 70 Z"
                initial={{ pathLength: 0, fill: "rgba(212, 175, 55, 0)" }}
                animate={{ 
                  pathLength: 1, 
                  fill: ["rgba(212, 175, 55, 0)", "rgba(212, 175, 55, 1)"] 
                }}
                transition={{ 
                  pathLength: { duration: 2, ease: "easeInOut" },
                  fill: { delay: 2.2, duration: 0.5 }
                }}
              />
              {/* Pestle */}
              <motion.path
                d="M 100 130 L 130 40 L 145 45 L 115 135 Z"
                initial={{ pathLength: 0, fill: "rgba(212, 175, 55, 0)" }}
                animate={{ 
                  pathLength: 1,
                  fill: ["rgba(212, 175, 55, 0)", "rgba(212, 175, 55, 1)"],
                  rotate: [0, -10, 0]
                }}
                transition={{ 
                  pathLength: { duration: 1.5, delay: 0.5, ease: "easeInOut" },
                  fill: { delay: 2.2, duration: 0.5 },
                  rotate: { delay: 2.5, duration: 0.5, repeat: 1, repeatType: "reverse" }
                }}
              />
            </svg>
            
            <motion.h1
              className="mt-4 font-display text-xl text-rosegold tracking-widest uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              Dr. Smita Patil
            </motion.h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;