import React, { useState } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { INGREDIENTS, MAIN_PRODUCT } from '../constants';
import { Plus, Check } from 'lucide-react';

const motion = m as any;

const ProductShowcase: React.FC = () => {
  const [activeIngredient, setActiveIngredient] = useState<string | null>(null);

  return (
    <section id="ingredients" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl text-rosegold mb-4">Pure Ingredients</h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
          <p className="mt-4 font-sans text-gray-600 max-w-2xl mx-auto">
            A harmonious blend of earth and florals, crafted to rejuvenate your skin from within.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          
          {/* Interactive Image */}
          <div className="w-full md:w-1/2 relative min-h-[400px] flex items-center justify-center bg-sand/30 rounded-3xl p-8">
            <motion.img 
              src={MAIN_PRODUCT.image} 
              alt="Multani Mitti Jar"
              className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full shadow-lg border-4 border-white relative z-10"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            />

            {/* Ingredient Hotspots */}
            {INGREDIENTS.map((ing) => (
              <div 
                key={ing.id}
                className="absolute z-20"
                style={{ top: ing.position.top, left: ing.position.left }}
              >
                <motion.button
                  className={`w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg transition-colors ${activeIngredient === ing.id ? 'bg-deeprose text-white' : 'bg-white text-gold'}`}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setActiveIngredient(activeIngredient === ing.id ? null : ing.id)}
                >
                  <Plus size={20} className={`transition-transform duration-300 ${activeIngredient === ing.id ? 'rotate-45' : ''}`} />
                </motion.button>
                
                <AnimatePresence>
                  {activeIngredient === ing.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className="absolute left-1/2 -translate-x-1/2 mt-4 w-48 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-gold/20 text-center"
                    >
                      <h4 className="font-serif text-rosegold font-bold">{ing.name}</h4>
                      <p className="text-xs text-charcoal mt-1 leading-relaxed">{ing.benefit}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Details List */}
          <div className="w-full md:w-1/2 space-y-6">
             <h3 className="font-serif text-2xl text-charcoal mb-6">Why Your Skin Needs This</h3>
             <ul className="space-y-4">
               {MAIN_PRODUCT.description.map((desc, idx) => (
                 <motion.li 
                   key={idx}
                   initial={{ opacity: 0, x: 20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.1 }}
                   className="flex items-start gap-4 p-4 rounded-xl hover:bg-sand/50 transition-colors"
                 >
                   <div className="w-8 h-8 rounded-full bg-rosegold/10 flex items-center justify-center flex-shrink-0 text-rosegold">
                     <Check size={16} />
                   </div>
                   <span className="font-sans text-charcoal/80 font-medium pt-1">{desc}</span>
                 </motion.li>
               ))}
             </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;