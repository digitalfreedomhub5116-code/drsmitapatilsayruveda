import React from 'react';
import { motion as m } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { Category } from '../types';

const motion = m as any;

interface CategoriesSectionProps {
  onCategoryClick: (category: Category) => void;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ onCategoryClick }) => {
  const { categories } = useData();

  // Create a triplicated list to ensure seamless looping
  // We use 3 sets so we can translate -33.33% and snap back to 0 seamlessly
  const marqueeCategories = [...categories, ...categories, ...categories];

  return (
    <section id="shop" className="py-12 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-10 md:mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-rosegold text-xs font-bold uppercase tracking-[0.2em] mb-3 block">Curated Collections</span>
            <h2 className="font-display text-3xl md:text-5xl text-charcoal mb-4">Shop by Category</h2>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
            <p className="mt-4 font-sans text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
              Swipe through our essence of nature.
            </p>
          </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden">
        
        {/* Gradient Fades for Smooth Edges */}
        <div className="absolute top-0 left-0 h-full w-8 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-8 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-4 md:gap-8 w-max px-4"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 40, // Slow, smooth scroll
          }}
        >
          {marqueeCategories.map((category, index) => (
            <motion.div
              key={`${category.id}-${index}`}
              className="relative shrink-0 w-[85vw] md:w-[400px] h-[400px] md:h-[550px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-gray-100"
              onClick={() => onCategoryClick(category)}
              whileHover={{ scale: 0.98 }}
            >
              {/* Background Image with Zoom Effect */}
              <div className="absolute inset-0 w-full h-full bg-gray-100">
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end items-start text-white">
                <div className="transform md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500 w-full">
                  <div className="flex items-center gap-2 mb-3 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity md:delay-100">
                    <Sparkles size={16} className="text-gold" />
                    <span className="text-xs uppercase tracking-wider text-gold font-bold">{category.products.length} Products</span>
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl mb-3 leading-tight">{category.title}</h3>
                  <p className="font-sans text-sm md:text-base text-gray-200 line-clamp-2 mb-6 opacity-100 md:opacity-80 group-hover:opacity-100 transition-opacity">
                    {category.description}
                  </p>
                  
                  <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white border-b border-gold pb-1 hover:text-gold transition-colors">
                    Explore <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;