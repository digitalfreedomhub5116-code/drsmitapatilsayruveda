import React from 'react';
import { motion as m } from 'framer-motion';
import { ShoppingBag, Star, Heart, Zap, Share2 } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { Product } from '../types';
import ImageSkeleton from './ui/ImageSkeleton';

const motion = m as any;

interface AllProductsSectionProps {
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  wishlist?: Product[];
  onToggleWishlist?: (product: Product) => void;
  onBuyNow?: (product: Product) => void;
  onShare?: (product: Product) => void;
}

const AllProductsSection: React.FC<AllProductsSectionProps> = ({ 
    onAddToCart, 
    onQuickView, 
    wishlist = [], 
    onToggleWishlist, 
    onBuyNow,
    onShare
}) => {
  const { categories } = useData();
  
  // Flatten all products from all categories
  const allProducts = categories.flatMap(cat => cat.products);

  const isInWishlist = (id: string) => wishlist.some(p => p.id === id);

  return (
    <section className="py-12 md:py-20 bg-porcelain border-t border-white/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl md:text-4xl text-charcoal mb-2 md:mb-4">Complete Collection</h2>
            <div className="w-16 h-1 bg-rosegold mx-auto rounded-full" />
            <p className="mt-4 text-xs md:text-base text-gray-500 font-sans">Explore our full range of authentic Ayurvedic treasures.</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
          {allProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ delay: idx * 0.05 }}
              className="group bg-white rounded-xl md:rounded-2xl p-2 md:p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-transparent hover:border-gold/20"
            >
              <div 
                className="relative h-40 md:h-64 rounded-lg md:rounded-xl overflow-hidden mb-3 bg-gray-50 transform-gpu cursor-pointer"
                onClick={() => onQuickView(product)}
              >
                <ImageSkeleton 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                 
                 {/* Wishlist Button */}
                 {onToggleWishlist && (
                   <button
                    onClick={(e) => { e.stopPropagation(); onToggleWishlist(product); }}
                    className={`absolute top-2 left-2 md:top-3 md:left-3 p-1.5 md:p-2 rounded-full shadow-sm transition-all z-20 ${isInWishlist(product.id) ? 'bg-rosegold text-white' : 'bg-white/95 text-charcoal hover:bg-rosegold hover:text-white'}`}
                   >
                     <Heart size={14} className={isInWishlist(product.id) ? 'fill-current' : ''} />
                   </button>
                 )}
                 
                 {/* Share Button (Stacked) */}
                 {onShare && (
                     <button
                        onClick={(e) => { e.stopPropagation(); onShare(product); }}
                        className="absolute top-9 left-2 md:top-14 md:left-3 p-1.5 md:p-2 rounded-full shadow-sm transition-all z-20 bg-white/95 text-charcoal hover:bg-rosegold hover:text-white mt-1"
                       >
                         <Share2 size={14} />
                     </button>
                 )}
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="mb-1">
                    <p className="text-[9px] md:text-[10px] font-bold text-rosegold uppercase tracking-wider truncate">{product.subtitle}</p>
                    <h3 className="font-serif text-sm md:text-lg text-charcoal font-bold leading-tight group-hover:text-gold transition-colors line-clamp-2 min-h-[2.5em]">{product.name}</h3>
                    <p className="hidden md:block text-xs text-gray-500 mt-2 line-clamp-2 font-sans leading-relaxed opacity-80">
                      {product.description.join(' • ')}
                    </p>
                </div>
                
                <div className="mt-auto pt-3 flex flex-col gap-2 md:gap-3">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 md:gap-0">
                        <span className="font-sans font-bold text-base md:text-lg text-charcoal">₹{product.price}</span>
                        <div className="flex gap-2 w-full md:w-auto">
                             <button 
                                onClick={() => onAddToCart(product)}
                                className="flex-1 md:flex-none p-2 md:p-2.5 rounded-lg border border-gray-200 text-charcoal hover:bg-gray-50 transition-colors flex items-center justify-center"
                                title="Add to Cart"
                             >
                                <ShoppingBag size={16} className="md:w-[18px] md:h-[18px]" />
                             </button>
                             {onBuyNow && (
                               <button 
                                  onClick={() => onBuyNow(product)}
                                  className="flex-1 md:flex-none px-3 py-2 md:px-4 md:py-2.5 bg-charcoal text-white rounded-lg font-sans font-bold text-[10px] md:text-xs uppercase tracking-wider hover:bg-gold transition-colors shadow-md flex items-center justify-center gap-1"
                               >
                                  <Zap size={14} className="fill-current" /> <span className="md:inline">Buy</span>
                               </button>
                             )}
                        </div>
                    </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllProductsSection;