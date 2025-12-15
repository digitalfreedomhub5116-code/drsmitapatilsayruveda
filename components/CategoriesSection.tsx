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

  return (
    <section id="shop" className="py-12 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-rosegold text-xs font-bold uppercase tracking-[0.2em] mb-3 block">Curated Collections</span>
            <h2 className="font-display text-3xl md:text-5xl text-charcoal mb-4">Shop by Category</h2>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
          </motion.div>
        </div>

        {/* 
            Mobile: Horizontal Scroll Slider with Snap
            Desktop: Standard Grid 
        */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 -mx-4 px-4 md:grid md:grid-cols-2 md:lg:grid-cols-4 md:gap-6 md:pb-0 md:mx-0 md:px-0 md:overflow-visible scrollbar-hide">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onCategoryClick(category)}
              className="shrink-0 w-[85vw] md:w-auto snap-center group cursor-pointer relative h-[380px] md:h-[400px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Background Image with Zoom Effect */}
              <div className="absolute inset-0 w-full h-full bg-gray-100">
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end items-start text-white">
                <div className="transform md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500 w-full">
                  <div className="flex items-center gap-2 mb-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity md:delay-100">
                    <Sparkles size={16} className="text-gold" />
                    <span className="text-xs uppercase tracking-wider text-gold font-bold">{category.products.length} Products</span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl mb-2">{category.title}</h3>
                  <p className="font-sans text-sm text-gray-300 line-clamp-2 mb-4 opacity-100 md:opacity-80 group-hover:opacity-100 transition-opacity">
                    {category.description}
                  </p>
                  
                  <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white border-b border-gold pb-1 hover:text-gold transition-colors">
                    Explore <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default CategoriesSection;