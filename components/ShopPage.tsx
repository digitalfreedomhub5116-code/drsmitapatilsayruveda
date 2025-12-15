import React, { useState, useEffect } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { ChevronRight, Home, Search, ShoppingBag, Heart, Star, Zap, Eye, Share2 } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { Category, Product } from '../types';
import ImageSkeleton from './ui/ImageSkeleton';

const motion = m as any;

interface ShopPageProps {
  onCategoryClick: (category: Category) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onNavigateHome: () => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onShare: (product: Product) => void;
}

const ShopPage: React.FC<ShopPageProps> = ({ 
  onCategoryClick, 
  onAddToCart, 
  onQuickView, 
  onNavigateHome, 
  wishlist, 
  onToggleWishlist, 
  onBuyNow,
  onShare
}) => {
  const { categories } = useData();
  const [activeCategoryId, setActiveCategoryId] = useState<string>(categories[0]?.id || '');
  
  // Update active category if categories change
  useEffect(() => {
    if (categories.length > 0 && !activeCategoryId) {
      setActiveCategoryId(categories[0].id);
    }
  }, [categories, activeCategoryId]);

  const activeCategory = categories.find(c => c.id === activeCategoryId) || categories[0];

  const isInWishlist = (id: string) => wishlist.some(p => p.id === id);

  return (
    <div className="pt-[105px] md:pt-[70px] h-screen flex flex-col bg-white overflow-hidden">
      
      {/* Main Split Layout */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* --- LEFT SIDEBAR (Categories) --- */}
        <div className="w-[85px] md:w-1/5 bg-porcelain h-full overflow-y-auto pb-24 scrollbar-hide border-r border-gray-200" style={{ WebkitOverflowScrolling: 'touch' }}>
           {categories.map((cat) => (
             <button
               key={cat.id}
               onClick={() => setActiveCategoryId(cat.id)}
               className={`w-full flex flex-col md:flex-row items-center md:gap-4 p-2 py-4 md:px-6 md:py-5 border-b border-gray-100 transition-colors relative ${
                 activeCategoryId === cat.id 
                   ? 'bg-white text-rosegold shadow-[inset_4px_0_0_0_#B76E79]' 
                   : 'text-gray-500 hover:bg-gray-100'
               }`}
             >
               {/* Icon/Image */}
               <div className={`w-12 h-12 md:w-10 md:h-10 rounded-full overflow-hidden p-[2px] mb-1 md:mb-0 transition-all ${
                 activeCategoryId === cat.id ? 'border-2 border-rosegold' : 'border border-transparent bg-gray-200'
               }`}>
                  <ImageSkeleton src={cat.image} alt={cat.title} className="w-full h-full object-cover rounded-full" />
               </div>

               {/* Text */}
               <span className={`text-[10px] md:text-sm font-bold text-center md:text-left leading-tight line-clamp-2 ${
                 activeCategoryId === cat.id ? 'text-charcoal font-bold' : ''
               }`}>
                 {cat.title}
               </span>
             </button>
           ))}
        </div>

        {/* --- RIGHT CONTENT (Products) --- */}
        <div className="flex-1 h-full overflow-y-auto bg-white pb-32 md:pb-20 relative" style={{ WebkitOverflowScrolling: 'touch' }}>
          <AnimatePresence mode="wait">
            {activeCategory && (
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="p-3 md:p-6"
              >
                {/* Category Banner */}
                <div className="relative h-32 md:h-56 rounded-xl md:rounded-2xl overflow-hidden mb-6 group transform-gpu">
                   <ImageSkeleton src={activeCategory.image} className="w-full h-full object-cover" alt={activeCategory.title} />
                   <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-6 z-20">
                      <h2 className="text-white font-display text-2xl md:text-4xl mb-1">{activeCategory.title}</h2>
                      <p className="text-white/80 text-xs md:text-sm font-sans max-w-md line-clamp-2">{activeCategory.description}</p>
                   </div>
                </div>

                {/* Sub-header */}
                <div className="flex items-center justify-between mb-4 px-1">
                   <h3 className="font-bold text-charcoal text-sm md:text-lg">Popular in {activeCategory.title.split(' ')[0]}</h3>
                   <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{activeCategory.products.length} Items</span>
                </div>

                {/* Products Grid (2 Columns Mobile, 3-4 Desktop) */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                   {activeCategory.products.map((product, idx) => (
                      <div
                        key={product.id}
                        className="bg-white rounded-lg border border-gray-100 shadow-sm flex flex-col group overflow-hidden"
                      >
                        {/* Image Area */}
                        <div 
                          className="relative aspect-square bg-gray-50 overflow-hidden cursor-pointer"
                          onClick={() => onQuickView(product)}
                        >
                           <ImageSkeleton 
                              src={product.image} 
                              alt={product.name} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
                           />
                           
                           {/* Mobile Wishlist */}
                           <button 
                             onClick={(e) => { e.stopPropagation(); onToggleWishlist(product); }}
                             className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full shadow-sm text-charcoal active:scale-90 transition-transform md:hidden z-20"
                           >
                              <Heart size={14} className={isInWishlist(product.id) ? "fill-rosegold text-rosegold" : ""} />
                           </button>

                           {/* Mobile Share Button */}
                           <button 
                             onClick={(e) => { e.stopPropagation(); onShare(product); }}
                             className="absolute top-2 left-2 p-1.5 bg-white/90 rounded-full shadow-sm text-charcoal active:scale-90 transition-transform md:hidden z-20"
                           >
                              <Share2 size={14} />
                           </button>

                           {/* Desktop Overlay Actions */}
                           <div className="hidden md:flex absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center gap-2 z-20">
                               <button 
                                  onClick={(e) => { e.stopPropagation(); onToggleWishlist(product); }} 
                                  className="p-2 bg-white rounded-full hover:bg-rosegold hover:text-white transition-colors shadow-lg" 
                                  title="Wishlist"
                                >
                                  <Heart size={18} className={isInWishlist(product.id) ? "fill-current text-rosegold" : ""} />
                               </button>
                               <button 
                                  onClick={(e) => { e.stopPropagation(); onShare(product); }}
                                  className="p-2 bg-white rounded-full hover:bg-rosegold hover:text-white transition-colors shadow-lg" 
                                  title="Share"
                                >
                                  <Share2 size={18} />
                               </button>
                           </div>

                           {/* Rating Pill */}
                           <div className="absolute bottom-2 left-2 bg-white/95 px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-0.5 shadow-sm z-20">
                              4.8 <Star size={8} className="fill-gold text-gold" />
                           </div>
                        </div>

                        {/* Details */}
                        <div className="p-3 flex flex-col flex-1">
                           <div className="mb-1">
                             <p className="text-[9px] text-gray-400 uppercase tracking-wider truncate">{product.subtitle}</p>
                             <h4 className="font-serif text-sm text-charcoal font-bold leading-tight line-clamp-2 min-h-[2.5em]">{product.name}</h4>
                           </div>
                           
                           <div className="mt-auto pt-2 flex items-center justify-between">
                              <div>
                                <span className="text-sm font-bold text-charcoal block">₹{product.price}</span>
                                <span className="text-[9px] text-green-600 font-medium">In Stock</span>
                              </div>
                              <button 
                                onClick={() => onAddToCart(product)}
                                className="p-2 rounded-lg bg-gray-50 text-charcoal border border-gray-200 hover:bg-charcoal hover:text-white transition-colors active:scale-95"
                              >
                                <ShoppingBag size={16} />
                              </button>
                           </div>
                        </div>
                      </div>
                   ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
    </div>
  );
};

export default ShopPage;