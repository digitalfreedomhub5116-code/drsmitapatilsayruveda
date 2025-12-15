import React, { useState } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { X, QrCode, CreditCard, Wallet, Smartphone, Loader2, CheckCircle2 } from 'lucide-react';

const motion = m as any;

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, amount }) => {
  const [method, setMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const handlePay = () => {
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('success');
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden"
      >
        {paymentStatus === 'success' ? (
          <div className="p-10 flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
              className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6"
            >
              <CheckCircle2 size={40} />
            </motion.div>
            <h3 className="font-serif text-3xl text-charcoal mb-2">Order Confirmed!</h3>
            <p className="text-gray-500 font-sans">Thank you for choosing Dr. Smita Patil's Ayurveda.</p>
            <button onClick={onClose} className="mt-8 text-rosegold font-bold hover:underline">Close</button>
          </div>
        ) : (
          <>
            <div className="bg-sand/30 p-6 flex justify-between items-center border-b border-gray-100">
              <h3 className="font-serif text-xl text-charcoal">Secure Payment</h3>
              <button onClick={onClose}><X size={20} className="text-gray-500" /></button>
            </div>

            <div className="p-6">
              <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                <PaymentTab 
                  active={method === 'upi'} 
                  onClick={() => setMethod('upi')} 
                  icon={<Smartphone size={20} />} 
                  label="UPI" 
                />
                <PaymentTab 
                  active={method === 'card'} 
                  onClick={() => setMethod('card')} 
                  icon={<CreditCard size={20} />} 
                  label="Card" 
                />
                <PaymentTab 
                  active={method === 'cod'} 
                  onClick={() => setMethod('cod')} 
                  icon={<Wallet size={20} />} 
                  label="Cash" 
                />
              </div>

              <div className="min-h-[250px]">
                {method === 'upi' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                    <p className="text-sm text-gray-500 mb-6">Scan QR with any UPI App</p>
                    <div className="w-48 h-48 mx-auto bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center relative overflow-hidden group">
                      <QrCode size={100} className="text-charcoal opacity-20" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/10 to-transparent translate-y-[-100%] animate-[scan_2s_ease-in-out_infinite]" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white px-4 py-2 rounded-lg shadow-sm font-mono text-xs text-gray-400">Mock QR</div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-4 mt-6 grayscale opacity-60">
                        {/* Mock Icons */}
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-[8px] font-bold text-blue-800">GPay</div>
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-[8px] font-bold text-purple-800">Pe</div>
                        <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center text-[8px] font-bold text-cyan-800">Paytm</div>
                    </div>
                  </motion.div>
                )}
                {method === 'card' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                     <div className="space-y-2">
                       <label className="text-xs font-bold uppercase text-gray-500">Card Number</label>
                       <input type="text" placeholder="0000 0000 0000 0000" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-rosegold bg-transparent" />
                     </div>
                     <div className="flex gap-4">
                       <div className="space-y-2 flex-1">
                         <label className="text-xs font-bold uppercase text-gray-500">Expiry</label>
                         <input type="text" placeholder="MM/YY" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-rosegold bg-transparent" />
                       </div>
                       <div className="space-y-2 flex-1">
                         <label className="text-xs font-bold uppercase text-gray-500">CVV</label>
                         <input type="password" placeholder="123" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-rosegold bg-transparent" />
                       </div>
                     </div>
                  </motion.div>
                )}
                {method === 'cod' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center pt-8">
                     <Wallet size={64} className="mx-auto text-gold mb-4" />
                     <p className="font-sans text-gray-600">Pay in cash upon delivery.</p>
                     <p className="text-xs text-red-400 mt-2">Additional ₹50 handling fee applies.</p>
                  </motion.div>
                )}
              </div>

              <button 
                onClick={handlePay}
                disabled={paymentStatus === 'processing'}
                className="w-full bg-deeprose text-white font-serif py-4 rounded-xl mt-6 hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
              >
                {paymentStatus === 'processing' ? <Loader2 className="animate-spin" /> : `Pay ₹${amount}`}
              </button>
            </div>
          </>
        )}
      </motion.div>
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};

const PaymentTab = ({ active, onClick, icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all whitespace-nowrap ${active ? 'border-rosegold bg-rosegold/10 text-rosegold' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
  >
    {icon}
    <span className="font-sans font-medium text-sm">{label}</span>
  </button>
);

export default PaymentModal;