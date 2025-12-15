import React from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Eye, ChevronRight, Home, Heart, Zap, Share2, ArrowLeft } from 'lucide-react';
import { Category, Product } from '../types';
import ImageSkeleton from './ui/ImageSkeleton';

const motion = m as any;

interface CategoryModalProps {
  category: Category | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onNavigateHome: () => void;
  wishlist?: Product[];
  onToggleWishlist?: (product: Product) => void;
  onBuyNow?: (product: Product) => void;
  onShare: (product: Product) => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ 
  category, 
  onClose, 
  onAddToCart, 
  onQuickView, 
  onNavigateHome, 
  wishlist = [], 
  onToggleWishlist, 
  onBuyNow,
  onShare
}) => {
  if (!category) return null;

  const isInWishlist = (id: string) => wishlist.some(p => p.id === id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-charcoal/80 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.9, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 50, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-porcelain w-full h-full md:h-[90vh] md:w-[90vw] md:max-w-6xl md:rounded-3xl shadow-2xl relative z-10 overflow-hidden flex flex-col"
        >
          {/* Header Image Area */}
          <div className="relative h-48 md:h-64 shrink-0 overflow-hidden bg-charcoal">
            <ImageSkeleton 
              src={category.image} 
              alt={category.title} 
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent flex flex-col justify-end p-6 text-white z-10">
              
              {/* Breadcrumbs (Desktop) */}
              <div className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/80 mb-4 absolute top-6 left-6">
                <button 
                  onClick={onNavigateHome} 
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <Home size={12} className="mb-0.5" /> Home
                </button>
                <ChevronRight size={12} className="text-white/50" />
                <span>Shop</span>
                <ChevronRight size={12} className="text-white/50" />
                <span className="text-white">{category.title}</span>
              </div>

              <h2 className="font-display text-3xl md:text-5xl mb-2">{category.title}</h2>
              <p className="font-sans text-sm md:text-lg text-white/90 max-w-2xl line-clamp-2 md:line-clamp-none leading-relaxed">{category.description}</p>
            </div>

            {/* Mobile Header Actions Overlay */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start md:hidden z-20">
               <button 
                 onClick={onClose}
                 className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30"
               >
                 <ArrowLeft size={20} />
               </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1 overflow-y-auto p-4 md:p-10 bg-white">
             <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
               {category.products.map((product, idx) => (
                 <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group bg-white border border-sand rounded-xl md:rounded-2xl p-2 md:p-4 hover:shadow-xl hover:border-gold/30 transition-all duration-300 flex flex-col"
                 >
                   <div 
                      className="relative h-40 md:h-64 rounded-lg md:rounded-xl overflow-hidden mb-3 md:mb-4 bg-gray-50 cursor-pointer"
                      onClick={() => onQuickView(product)}
                   >
                     <ImageSkeleton 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                     />
                     
                     {/* Wishlist Button */}
                     {onToggleWishlist && (
                       <button
                        onClick={(e) => { e.stopPropagation(); onToggleWishlist(product); }}
                        className={`absolute top-2 left-2 md:top-3 md:left-3 p-1.5 md:p-2 rounded-full shadow-sm transition-all z-20 ${isInWishlist(product.id) ? 'bg-rosegold text-white' : 'bg-white/90 text-charcoal hover:bg-rosegold hover:text-white'}`}
                       >
                         <Heart size={14} className={isInWishlist(product.id) ? 'fill-current' : ''} />
                       </button>
                     )}

                     {/* Share Button (Stacked) */}
                     <button
                        onClick={(e) => { e.stopPropagation(); onShare(product); }}
                        className="absolute top-9 left-2 md:top-12 md:left-3 p-1.5 md:p-2 rounded-full shadow-sm transition-all z-20 bg-white/90 text-charcoal hover:bg-rosegold hover:text-white mt-1"
                       >
                         <Share2 size={14} />
                     </button>
                   </div>
                   
                   <div className="flex-1">
                     <div className="flex flex-col md:flex-row justify-between items-start mb-2">
                        <div>
                          <h3 className="font-serif text-sm md:text-xl text-charcoal font-bold leading-tight line-clamp-2">{product.name}</h3>
                          <p className="text-[9px] md:text-xs text-rosegold uppercase tracking-wider font-bold mt-1 truncate">{product.subtitle}</p>
                        </div>
                        <span className="font-sans font-bold text-base md:text-lg mt-1 md:mt-0">₹{product.price}</span>
                     </div>
                     
                     <p className="hidden md:block text-xs text-gray-500 mb-4 line-clamp-2">
                       {product.description.join(' • ')}
                     </p>
                   </div>

                   <div className="flex gap-2 mt-2">
                     <button 
                        onClick={() => onAddToCart(product)}
                        className="flex-1 p-2 md:p-3 rounded-lg md:rounded-xl border border-charcoal text-charcoal font-sans font-bold text-[10px] md:text-sm uppercase tracking-wider hover:bg-gray-50 transition-all flex items-center justify-center gap-1 md:gap-2"
                     >
                       <ShoppingBag size={14} className="md:w-4 md:h-4" /> <span className="hidden md:inline">Add</span>
                     </button>
                     {onBuyNow && (
                       <button 
                          onClick={() => onBuyNow(product)}
                          className="flex-1 p-2 md:p-3 bg-charcoal text-white rounded-lg md:rounded-xl font-sans font-bold text-[10px] md:text-sm uppercase tracking-wider hover:bg-gold hover:text-charcoal transition-all flex items-center justify-center gap-1 md:gap-2 shadow-lg"
                       >
                         <Zap size={14} className="md:w-4 md:h-4 fill-current" /> <span className="md:inline">Buy Now</span><span className="md:hidden">Buy</span>
                       </button>
                     )}
                   </div>
                 </motion.div>
               ))}
             </div>
          </div>

          {/* Floating Close Button (Desktop & Mobile safe fallback) */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-[80] p-2.5 bg-white text-charcoal rounded-full shadow-xl hover:bg-gold hover:text-white transition-all transform hover:scale-110 flex items-center justify-center border border-gray-100"
            aria-label="Close"
          >
            <X size={24} />
          </button>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CategoryModal;