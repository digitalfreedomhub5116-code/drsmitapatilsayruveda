import React from 'react';
import { motion as m } from 'framer-motion';
import { ShoppingBag, Heart, Zap, Share2 } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { Product } from '../types';
import ImageSkeleton from './ui/ImageSkeleton';

const motion = m as any;

interface FeaturedProductsProps {
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  wishlist?: Product[];
  onToggleWishlist?: (product: Product) => void;
  onBuyNow?: (product: Product) => void;
  onShare: (product: Product) => void;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ 
  onAddToCart, 
  onQuickView, 
  wishlist = [], 
  onToggleWishlist, 
  onBuyNow,
  onShare
}) => {
  const { categories } = useData();
  
  // Flatten products and pick top 4. 
  const allProducts = categories.flatMap(c => c.products);
  
  // Preferred best sellers: Multani Mitti (sc-4), Anti Dandruff Oil (hc-2), Aloe Vera Gel (sc-1), Body Scrub Ubtan (sc-3)
  const preferredIds = ['sc-4', 'hc-2', 'sc-1', 'sc-3'];
  let featured = allProducts.filter(p => preferredIds.includes(p.id));
  
  // Sort them to match preferred order
  featured.sort((a, b) => preferredIds.indexOf(a.id) - preferredIds.indexOf(b.id));

  // Fallback if not enough products found
  if (featured.length < 4) {
      featured = allProducts.slice(0, 4);
  }

  const isInWishlist = (id: string) => wishlist.some(p => p.id === id);

  return (
    <section className="py-12 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-rosegold text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-3 block">Customer Favorites</span>
            <h2 className="font-display text-3xl md:text-5xl text-charcoal mb-2 md:mb-4">Featured Products</h2>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
             <p className="mt-4 font-sans text-xs md:text-base text-gray-600 max-w-2xl mx-auto">
               Our most loved formulations, time-tested and trusted by thousands for their purity and effectiveness.
             </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {featured.map((product, idx) => (
             <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white border border-sand rounded-xl md:rounded-3xl p-2 md:p-4 hover:shadow-xl hover:border-gold/30 transition-all duration-300 flex flex-col relative"
            >
              <div 
                className="relative h-44 md:h-64 rounded-lg md:rounded-2xl overflow-hidden mb-3 md:mb-6 bg-gray-50 transform-gpu cursor-pointer"
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
                    className={`absolute top-2 left-2 md:top-4 md:left-4 p-2 md:p-3 rounded-full shadow-md transition-all z-20 ${isInWishlist(product.id) ? 'bg-rosegold text-white' : 'bg-white text-charcoal hover:bg-rosegold hover:text-white'}`}
                   >
                     <Heart size={14} className={`md:w-4 md:h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                   </button>
                 )}

                 {/* Share Button (Stacked below wishlist) */}
                 <button
                    onClick={(e) => { e.stopPropagation(); onShare(product); }}
                    className="absolute top-10 left-2 md:top-16 md:left-4 p-2 md:p-3 rounded-full shadow-md transition-all z-20 bg-white text-charcoal hover:bg-rosegold hover:text-white mt-1 md:mt-2"
                   >
                     <Share2 size={14} className="md:w-4 md:h-4" />
                 </button>
              </div>
              
              <div className="flex-1 flex flex-col px-1 md:px-2">
                <div className="mb-2 md:mb-4 text-left md:text-center">
                    <p className="text-[9px] md:text-xs font-bold text-rosegold uppercase tracking-widest mb-1 md:mb-2 truncate">{product.subtitle}</p>
                    <h3 className="font-serif text-sm md:text-xl text-charcoal font-bold leading-tight group-hover:text-gold transition-colors line-clamp-2">{product.name}</h3>
                </div>
                
                <p className="hidden md:block text-sm text-gray-500 mb-6 line-clamp-2 text-center font-sans leading-relaxed">
                   {product.description.join(' • ')}
                </p>
                
                <div className="mt-auto flex flex-col md:flex-row items-start md:items-center justify-between pt-2 md:pt-4 border-t border-gray-100 gap-2 md:gap-0">
                    <span className="font-sans font-bold text-base md:text-xl text-charcoal">₹{product.price}</span>
                    <div className="flex gap-2 w-full md:w-auto">
                        <button 
                           onClick={() => onAddToCart(product)}
                           className="flex-1 md:flex-none p-2 md:p-3 rounded-xl border border-charcoal text-charcoal hover:bg-charcoal hover:text-white transition-colors flex items-center justify-center"
                           title="Add to Cart"
                        >
                           <ShoppingBag size={16} className="md:w-[18px] md:h-[18px]" />
                        </button>
                        {onBuyNow && (
                           <button 
                              onClick={() => onBuyNow(product)}
                              className="flex-1 md:flex-none px-4 py-2 md:px-6 md:py-3 bg-charcoal text-white rounded-xl font-sans font-bold text-[10px] md:text-xs uppercase tracking-wider hover:bg-gold hover:text-charcoal transition-colors shadow-lg flex items-center justify-center gap-2"
                           >
                              <Zap size={14} className="md:w-4 md:h-4 fill-current" /> <span className="md:inline">Buy</span>
                           </button>
                        )}
                    </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 md:mt-16 text-center">
             <button onClick={() => { 
                const shopSection = document.getElementById('shop');
                shopSection?.scrollIntoView({ behavior: 'smooth' });
             }} className="inline-flex items-center gap-2 text-charcoal font-bold uppercase tracking-widest border-b-2 border-gold pb-1 hover:text-rosegold hover:border-rosegold transition-colors text-xs md:text-sm">
                View All Products <Zap size={14} className="md:w-4 md:h-4" />
             </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;