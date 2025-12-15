import React, { useState } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { X, Copy, Mail, Facebook, Instagram, MessageCircle, Check } from 'lucide-react';
import { Product } from '../types';

const motion = m as any;

interface ShareModalProps {
  product: Product | null;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ product, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!product) return null;

  // Construct the share content
  const productUrl = `${window.location.origin}?product=${product.id}`;
  const shareText = `Check out ${product.name} from Dr. Smita Patil's Ayurveda!\n\nIt's authentic, natural, and amazing. Buy here: ${productUrl}`;
  const punchLine = "Experience the purity of nature.";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${shareText}\n${punchLine}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSocialShare = (platform: 'whatsapp' | 'facebook' | 'email' | 'instagram') => {
    const encodedText = encodeURIComponent(shareText + "\n" + punchLine);
    const encodedUrl = encodeURIComponent(productUrl);
    
    let url = '';

    switch (platform) {
      case 'whatsapp':
        url = `https://wa.me/?text=${encodedText}`;
        break;
      case 'facebook':
        // Facebook primarily shares the URL, text is handled by OG tags usually
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'email':
        url = `mailto:?subject=${encodeURIComponent(`Check out ${product.name}`)}&body=${encodedText}`;
        break;
      case 'instagram':
        // Instagram doesn't support web sharing via URL parameter. 
        // We copy text to clipboard and open Instagram.
        handleCopyLink();
        url = 'https://www.instagram.com/';
        break;
    }

    if (url) {
      window.open(url, '_blank');
    }
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-sm relative z-20 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-sand/30 p-5 flex justify-between items-center border-b border-gray-100">
            <div>
              <h3 className="font-serif text-lg text-charcoal font-bold">Share Product</h3>
              <p className="text-xs text-rosegold font-bold uppercase tracking-wide truncate max-w-[200px]">{product.name}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            <p className="text-gray-500 text-sm mb-6 text-center font-sans">
              Share this wellness secret with your friends and family.
            </p>

            <div className="grid grid-cols-4 gap-4 mb-6">
              {/* WhatsApp */}
              <button 
                onClick={() => handleSocialShare('whatsapp')}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-12 h-12 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-all shadow-sm">
                  <MessageCircle size={24} />
                </div>
                <span className="text-[10px] font-bold text-gray-500 uppercase">WhatsApp</span>
              </button>

              {/* Instagram */}
              <button 
                onClick={() => handleSocialShare('instagram')}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-12 h-12 rounded-full bg-pink-50 text-[#E1306C] flex items-center justify-center group-hover:bg-[#E1306C] group-hover:text-white transition-all shadow-sm">
                  <Instagram size={24} />
                </div>
                <span className="text-[10px] font-bold text-gray-500 uppercase">Instagram</span>
              </button>

              {/* Facebook */}
              <button 
                onClick={() => handleSocialShare('facebook')}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 text-[#1877F2] flex items-center justify-center group-hover:bg-[#1877F2] group-hover:text-white transition-all shadow-sm">
                  <Facebook size={24} />
                </div>
                <span className="text-[10px] font-bold text-gray-500 uppercase">Facebook</span>
              </button>

              {/* Gmail */}
              <button 
                onClick={() => handleSocialShare('email')}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-12 h-12 rounded-full bg-red-50 text-[#DB4437] flex items-center justify-center group-hover:bg-[#DB4437] group-hover:text-white transition-all shadow-sm">
                  <Mail size={24} />
                </div>
                <span className="text-[10px] font-bold text-gray-500 uppercase">Email</span>
              </button>
            </div>

            {/* Copy Link Section */}
            <div className="relative">
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
                 <div className="flex-1 truncate text-xs text-gray-400 font-mono">
                    {productUrl}
                 </div>
                 <button 
                   onClick={handleCopyLink}
                   className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-charcoal text-xs font-bold rounded-lg shadow-sm hover:bg-gold hover:text-white transition-all border border-gray-200"
                 >
                   {copied ? <Check size={14} /> : <Copy size={14} />}
                   {copied ? 'Copied' : 'Copy'}
                 </button>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ShareModal;