import React from 'react';
import { motion as m } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const motion = m as any;

interface SparkleButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  marquee?: boolean;
}

const SparkleButton: React.FC<SparkleButtonProps> = ({ onClick, children, className = "", fullWidth = false, marquee = false }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`relative overflow-hidden group bg-gold text-white font-serif font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${fullWidth ? 'w-full' : ''} ${className} ${marquee ? 'px-0 py-3 w-64' : 'py-3 px-8'}`}
      whileHover={{ scale: 1.05, backgroundColor: '#C21E56' }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out skew-y-12 origin-bottom" />
      </div>
      
      <div className="relative z-10 w-full flex justify-center">
        {marquee ? (
           <div className="w-full overflow-hidden flex mask-gradient-x">
              <motion.div
                className="flex items-center gap-6 whitespace-nowrap"
                animate={{ x: "-50%" }}
                transition={{ 
                   repeat: Infinity, 
                   duration: 10, 
                   ease: "linear" 
                }}
                style={{ width: "max-content" }}
              >
                  {[...Array(6)].map((_, i) => (
                      <span key={i} className="flex items-center gap-4 text-lg">
                          {children} <Sparkles size={14} className="fill-white/50 opacity-70" />
                      </span>
                  ))}
              </motion.div>
           </div>
        ) : (
          <span className="relative flex items-center justify-center gap-2">
            {children}
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              whileHover={{ opacity: 1, scale: 1, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Sparkles size={18} />
            </motion.span>
          </span>
        )}
      </div>
    </motion.button>
  );
};

export default SparkleButton;