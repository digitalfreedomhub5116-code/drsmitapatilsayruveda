import React, { useState } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShieldCheck, Tag, Check, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';

const motion = m as any;

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart, onRemove, onCheckout }) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; amount: number } | null>(null);
  const [couponMessage, setCouponMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = appliedDiscount ? Math.max(0, subtotal - appliedDiscount.amount) : subtotal;

  const handleApplyCoupon = () => {
    setCouponMessage(null);
    if (!couponCode.trim()) return;

    // Mock Coupon Logic
    if (couponCode.toUpperCase() === 'WELCOME10') {
      const discountAmount = Math.round(subtotal * 0.1);
      setAppliedDiscount({ code: 'WELCOME10', amount: discountAmount });
      setCouponMessage({ type: 'success', text: `Coupon applied! You saved ₹${discountAmount}` });
    } else if (couponCode.toUpperCase() === 'AYURVEDA50') {
        setAppliedDiscount({ code: 'AYURVEDA50', amount: 50 });
        setCouponMessage({ type: 'success', text: 'Flat ₹50 discount applied!' });
    } else {
      setAppliedDiscount(null);
      setCouponMessage({ type: 'error', text: 'Invalid coupon code' });
    }
  };

  const removeCoupon = () => {
      setAppliedDiscount(null);
      setCouponCode('');
      setCouponMessage(null);
  };

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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[140]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md glass-panel z-[150] flex flex-col shadow-2xl bg-white/95"
          >
            {/* Header */}
            <div className="p-4 md:p-6 border-b border-gray-100 flex items-center justify-between bg-sand/30 sticky top-0 z-10">
              <div className="flex items-center gap-3">
                  <button 
                    onClick={onClose} 
                    className="p-2 -ml-2 hover:bg-white/50 rounded-full transition-colors text-charcoal active:scale-90"
                    aria-label="Go back"
                  >
                    <ArrowLeft size={24} />
                  </button>
                  <h2 className="font-serif text-xl md:text-2xl text-charcoal">Your Cart</h2>
              </div>
              
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-white/50 rounded-full transition-colors hidden md:block"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <ShoppingBagIcon />
                  <p className="mt-4 font-sans text-sm md:text-base">Your cart feels a bit light.</p>
                  <button onClick={onClose} className="mt-4 text-rosegold font-bold text-sm hover:underline">Start Shopping</button>
                </div>
              ) : (
                cart.map((item) => (
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
                      <div className="flex justify-between items-end">
                        <span className="font-sans font-medium text-sm md:text-base">₹{item.price}</span>
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-400">Qty: {item.quantity}</span>
                            <button 
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemove(item.id);
                            }}
                            className="text-red-400 hover:text-red-600 p-1 cursor-pointer"
                            >
                            <Trash2 size={16} className="pointer-events-none md:w-[18px] md:h-[18px]" />
                            </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-4 md:p-6 bg-porcelain border-t border-gray-100">
              
              {/* Coupon Section */}
              {cart.length > 0 && (
                <div className="mb-4 md:mb-6">
                    <label className="text-xs font-bold uppercase text-gray-500 mb-2 block flex items-center gap-1">
                        <Tag size={12} /> Have a coupon?
                    </label>
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            disabled={!!appliedDiscount}
                            placeholder="Enter code"
                            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rosegold bg-white uppercase disabled:bg-gray-50 disabled:text-gray-400"
                        />
                        {appliedDiscount ? (
                            <button 
                                onClick={removeCoupon}
                                className="bg-gray-200 text-gray-600 px-3 py-2 rounded-lg text-sm font-bold hover:bg-gray-300 transition-colors"
                            >
                                Remove
                            </button>
                        ) : (
                            <button 
                                onClick={handleApplyCoupon}
                                className="bg-charcoal text-white px-3 py-2 rounded-lg text-sm font-bold hover:bg-gold hover:text-charcoal transition-colors"
                            >
                                Apply
                            </button>
                        )}
                    </div>
                    {couponMessage && (
                        <p className={`text-xs mt-2 flex items-center gap-1 ${couponMessage.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                           {couponMessage.type === 'success' && <Check size={12} />}
                           {couponMessage.text}
                        </p>
                    )}
                </div>
              )}

              {/* Totals */}
              <div className="space-y-2 mb-4 md:mb-6">
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span className="font-sans">Subtotal</span>
                    <span className="font-sans font-medium">₹{subtotal}</span>
                  </div>
                  
                  {appliedDiscount && (
                     <div className="flex justify-between items-center text-sm text-green-600 animate-in slide-in-from-left">
                        <span className="font-sans flex items-center gap-1"><Tag size={12} /> Coupon ({appliedDiscount.code})</span>
                        <span className="font-sans font-medium">- ₹{appliedDiscount.amount}</span>
                     </div>
                  )}

                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <span className="font-sans font-bold text-gray-800">Total</span>
                    <span className="font-serif text-2xl font-bold text-charcoal">₹{total}</span>
                  </div>
              </div>
              
              <div className="flex items-center gap-2 text-[10px] md:text-xs text-green-700 mb-4 md:mb-6 bg-green-50 p-2 rounded justify-center">
                <ShieldCheck size={14} />
                <span>Secure Checkout • SSL Encrypted</span>
              </div>

              <button
                onClick={onCheckout}
                disabled={cart.length === 0}
                className="w-full bg-gold hover:bg-deeprose text-white font-serif py-3 md:py-4 rounded-xl md:rounded-full transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform active:scale-95"
              >
                Proceed to Pay
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Simple Icon component for empty state
const ShoppingBagIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

export default CartDrawer;