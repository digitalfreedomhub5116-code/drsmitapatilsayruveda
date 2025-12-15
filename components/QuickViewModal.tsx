import React, { useState } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { 
  X, ShoppingBag, Star, Check, Heart, Zap, ArrowLeft, Search, 
  ShoppingCart, Share2, MapPin, ShieldCheck, RotateCcw, 
  Tag, Percent, MessageCircle
} from 'lucide-react';
import { Product, User } from '../types';
import { useData } from '../contexts/DataContext';
import ImageSkeleton from './ui/ImageSkeleton';
import ReviewSection from './ReviewSection';

const motion = m as any;

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  wishlist?: Product[];
  onToggleWishlist?: (product: Product) => void;
  onBuyNow?: (product: Product) => void;
  onShare: (product: Product) => void;
  user?: User | null;
  onLogin?: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ 
  product, 
  onClose, 
  onAddToCart, 
  wishlist = [], 
  onToggleWishlist, 
  onBuyNow,
  onShare,
  user = null,
  onLogin = () => {}
}) => {
  const { categories } = useData();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) return null;

  const isInWishlist = wishlist.some(p => p.id === product.id);
  const originalPrice = Math.round(product.price * 1.4); // Mock original price
  const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  // Find similar products
  const similarProducts = categories
    .flatMap(c => c.products)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  // Mock images for carousel (using same image for demo if multiple not avail)
  const productImages = [product.image, product.image, product.image, product.image];

  const handleChatWithExpert = () => {
    const text = `Hi, I have a query regarding ${product.name}.`;
    const url = `https://wa.me/917470013333?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] bg-porcelain flex flex-col animate-in slide-in-from-right duration-300 font-sans">
        
        {/* --- Header --- */}
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-sand/50 shadow-sm z-20 shrink-0">
           <div className="flex items-center gap-3">
              <button onClick={onClose} className="text-charcoal hover:text-rosegold transition-colors p-1">
                 <ArrowLeft size={24} />
              </button>
           </div>
           <div className="flex items-center gap-4">
              <button className="text-charcoal hover:text-rosegold transition-colors"><Search size={22} /></button>
              <button className="text-charcoal hover:text-rosegold transition-colors relative">
                  <ShoppingCart size={22} />
                  <span className="absolute -top-2 -right-1 bg-deeprose text-white text-[9px] font-bold px-1 rounded-full">1</span>
              </button>
           </div>
        </div>

        {/* --- Main Scrollable Content --- */}
        <div className="flex-1 overflow-y-auto bg-porcelain pb-20">
            
            {/* 1. Product Image Carousel */}
            <div className="bg-white relative pb-4 shadow-sm">
               <div className="relative h-[350px] md:h-[450px] w-full bg-white flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                  {productImages.map((img, i) => (
                      <div key={i} className="w-full shrink-0 snap-center flex items-center justify-center p-8 relative">
                          <ImageSkeleton src={img} className="max-h-full max-w-full object-contain mix-blend-multiply" alt="" />
                      </div>
                  ))}
                  
                  {/* Floating Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-4 z-20">
                      {onToggleWishlist && (
                        <button 
                            onClick={() => onToggleWishlist(product)}
                            className="w-10 h-10 bg-white/80 backdrop-blur rounded-full shadow-md flex items-center justify-center text-gray-400 hover:bg-white transition-all"
                        >
                            <Heart size={20} className={isInWishlist ? "fill-rosegold text-rosegold" : "text-charcoal"} />
                        </button>
                      )}
                      <button 
                        onClick={() => onShare(product)}
                        className="w-10 h-10 bg-white/80 backdrop-blur rounded-full shadow-md flex items-center justify-center text-charcoal hover:bg-white transition-all"
                      >
                          <Share2 size={20} />
                      </button>
                  </div>

                  {/* Carousel Dots */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-20">
                      {productImages.map((_, i) => (
                          <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === 0 ? 'bg-charcoal' : 'bg-sand'}`} />
                      ))}
                  </div>
               </div>
            </div>

            {/* 3. Title & Price Info */}
            <div className="bg-white mt-2 p-5 shadow-sm">
                <p className="text-xs text-rosegold font-bold uppercase tracking-widest mb-2">{product.subtitle}</p>
                <h1 className="font-serif text-lg text-charcoal leading-snug mb-3">{product.name} with Natural Herbs & Essential Oils</h1>
                
                <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-deeprose font-bold text-lg">{discount}% off</span>
                    <span className="text-gray-400 text-sm line-through decoration-gray-400">₹{originalPrice}</span>
                    <span className="text-2xl font-serif font-bold text-charcoal">₹{product.price}</span>
                </div>

                <div className="flex flex-wrap gap-2 text-[10px] font-medium uppercase tracking-wide mb-5">
                    <span className="border border-sand rounded px-2 py-1 bg-sand/20 text-charcoal/70">Free Delivery</span>
                    <span className="border border-sand rounded px-2 py-1 bg-sand/20 text-charcoal/70">Assured Quality</span>
                </div>

                {/* Chat with Expert Button */}
                <button 
                  onClick={handleChatWithExpert}
                  className="w-full bg-[#25D366] text-white font-sans font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-colors shadow-md active:scale-95"
                >
                  <MessageCircle size={20} className="fill-current" />
                  Chat with Expert
                </button>
            </div>

            {/* 4. Deals & Offers */}
            <div className="mt-2 bg-blush/10 border-y border-blush/20 p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="flex items-center gap-2 mb-4 relative z-10">
                    <div className="bg-rosegold text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm italic font-serif">
                        Offer
                    </div>
                    <span className="text-sm font-bold text-charcoal">Extra ₹10 off via UPI</span>
                </div>

                <div className="space-y-4 relative z-10">
                    <div className="flex gap-3 items-start">
                        <Tag size={16} className="text-rosegold shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs font-bold text-charcoal uppercase tracking-wide">Bank Offer</p>
                            <p className="text-xs text-gray-600">5% Cashback on Axis Bank Credit Card</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-start">
                        <Percent size={16} className="text-rosegold shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs font-bold text-charcoal uppercase tracking-wide">Special Price</p>
                            <p className="text-xs text-gray-600">Get extra 20% off (price inclusive of cashback)</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 5. Delivery Details */}
            <div className="bg-white mt-2 p-5 shadow-sm">
                <h3 className="font-serif font-bold text-charcoal mb-4 text-lg">Delivery Details</h3>

                <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 border border-sand/50 rounded-xl bg-porcelain">
                        <RotateCcw size={20} className="mx-auto text-charcoal/60 mb-2" />
                        <p className="text-[10px] text-charcoal font-bold uppercase tracking-wide">7 Days<br/>Return</p>
                    </div>
                    <div className="p-3 border border-sand/50 rounded-xl bg-porcelain">
                        <ShieldCheck size={20} className="mx-auto text-charcoal/60 mb-2" />
                        <p className="text-[10px] text-charcoal font-bold uppercase tracking-wide">100%<br/>Authentic</p>
                    </div>
                    <div className="p-3 border border-sand/50 rounded-xl bg-porcelain">
                        <Zap size={20} className="mx-auto text-charcoal/60 mb-2" />
                        <p className="text-[10px] text-charcoal font-bold uppercase tracking-wide">Fast<br/>Shipping</p>
                    </div>
                </div>
            </div>

            {/* 6. Product Highlights */}
            <div className="bg-white mt-2 p-5 shadow-sm">
                <h3 className="font-serif font-bold text-charcoal mb-4 text-lg">Product Highlights</h3>
                <ul className="space-y-4">
                    {product.description.map((desc, i) => (
                        <li key={i} className="flex gap-3 items-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                            <span className="text-sm text-gray-600 leading-relaxed">{desc}</span>
                        </li>
                    ))}
                    <li className="flex gap-3 items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                        <span className="text-sm text-gray-600 leading-relaxed">Ayurvedic Formulation</span>
                    </li>
                    <li className="flex gap-3 items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                        <span className="text-sm text-gray-600 leading-relaxed">Chemical Free & Organic</span>
                    </li>
                </ul>
            </div>
            
            {/* Reviews Section */}
            <ReviewSection 
              productId={product.id} 
              user={user} 
              onLoginRequest={onLogin} 
            />

             {/* 7. Similar Products */}
             <div className="bg-white mt-2 p-5 pb-8 shadow-sm">
                <h3 className="font-serif font-bold text-charcoal mb-4 text-lg">Similar Products</h3>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {similarProducts.map((p) => (
                        <div key={p.id} className="w-36 shrink-0 border border-sand rounded-xl p-2 flex flex-col bg-white">
                            <div className="h-28 bg-porcelain rounded-lg mb-2 overflow-hidden">
                                <img src={p.image} className="w-full h-full object-cover" alt={p.name} />
                            </div>
                            <p className="text-xs font-bold text-charcoal line-clamp-2 mb-1">{p.name}</p>
                            <p className="text-xs text-rosegold font-bold mt-auto">₹{p.price}</p>
                        </div>
                    ))}
                </div>
             </div>

             <div className="h-4"></div>
        </div>

        {/* --- Sticky Footer --- */}
        <div className="bg-white border-t border-sand px-0 py-0 flex z-30 shrink-0 shadow-[0_-4px_10px_-1px_rgba(0,0,0,0.05)]">
            <button 
                onClick={() => {
                    onAddToCart(product);
                    onClose();
                }}
                className="flex-1 bg-white text-charcoal font-sans font-bold py-4 text-sm uppercase tracking-widest flex items-center justify-center hover:bg-sand/20 transition-colors border-r border-sand/50"
            >
                Add to Cart
            </button>
            <button 
                onClick={() => {
                    if (onBuyNow) onBuyNow(product);
                    onClose();
                }}
                className="flex-1 bg-charcoal text-white font-sans font-bold py-4 text-sm uppercase tracking-widest flex items-center justify-center hover:bg-gold hover:text-charcoal transition-colors"
            >
                <Zap size={18} className="fill-current mr-2" /> Buy Now
            </button>
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
    </AnimatePresence>
  );
};

export default QuickViewModal;