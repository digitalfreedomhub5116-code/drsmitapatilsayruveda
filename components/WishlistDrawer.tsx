import React from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, Heart, Zap, ArrowLeft } from 'lucide-react';
import { Product } from '../types';

const motion = m as any;

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemove: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onBuyNow?: (product: Product) => void;
}

const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ isOpen, onClose, wishlist, onRemove, onAddToCart, onBuyNow }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md glass-panel z-50 flex flex-col shadow-2xl bg-white/95"
          >
            {/* Header */}
            <div className="p-4 md:p-6 border-b border-gray-100 flex justify-between items-center bg-sand/30 sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <button 
                  onClick={onClose}
                  className="p-2 -ml-2 hover:bg-white/50 rounded-full transition-colors text-charcoal active:scale-90 md:hidden"
                  aria-label="Go back"
                >
                  <ArrowLeft size={24} />
                </button>
                <h2 className="font-serif text-xl md:text-2xl text-charcoal flex items-center gap-2">
                  <Heart className="fill-rosegold text-rosegold" size={24}/> Wishlist
                </h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block">
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <Heart size={48} className="opacity-20 mb-4" />
                  <p className="font-sans">Your wishlist is empty.</p>
                  <button 
                    onClick={onClose} 
                    className="mt-6 px-6 py-2 bg-charcoal text-white rounded-full text-sm font-bold md:hidden"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                wishlist.map((item) => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="flex gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-white shadow-sm border border-gray-100"
                  >
                    <img src={item.image} alt={item.name} className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg bg-gray-50" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif font-bold text-charcoal text-sm md:text-base line-clamp-1">{item.name}</h3>
                        <p className="text-xs text-rosegold line-clamp-1">{item.subtitle}</p>
                      </div>
                      <div className="flex justify-between items-end mt-2">
                        <span className="font-sans font-medium text-sm md:text-base">₹{item.price}</span>
                        <div className="flex gap-2">
                            {onBuyNow && (
                              <button 
                                onClick={() => {
                                   onBuyNow(item);
                                   onClose();
                                }} 
                                className="p-2 bg-charcoal text-white rounded-lg hover:bg-gold transition-colors shadow-md" 
                                title="Buy Now"
                              >
                                  <Zap size={16} className="fill-current" />
                              </button>
                            )}
                            <button 
                              onClick={() => onAddToCart(item)} 
                              className="p-2 border border-gray-200 text-charcoal rounded-lg hover:bg-gray-50 transition-colors" 
                              title="Move to Cart"
                            >
                                <ShoppingBag size={16} />
                            </button>
                            <button 
                              onClick={() => onRemove(item.id)} 
                              className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                              title="Remove"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WishlistDrawer;