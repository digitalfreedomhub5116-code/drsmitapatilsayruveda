import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Image as ImageIcon, Video, X, User as UserIcon, Upload, Trash2, Camera, Paperclip, AlertCircle, Lock } from 'lucide-react';
import { Review, User } from '../types';
import { useData } from '../contexts/DataContext';

interface ReviewSectionProps {
  productId: string;
  user: User | null;
  onLoginRequest: () => void;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ productId, user, onLoginRequest }) => {
  const { reviews, addReview } = useData();
  const productReviews = reviews.filter(r => r.productId === productId);
  
  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [mediaFiles, setMediaFiles] = useState<{ file: File; type: 'image' | 'video'; preview: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [showRestrictionMsg, setShowRestrictionMsg] = useState(false);

  // Stats
  const averageRating = productReviews.length 
    ? (productReviews.reduce((acc, r) => acc + r.rating, 0) / productReviews.length).toFixed(1)
    : '0.0';

  const hasPurchased = user?.purchasedProductIds?.includes(productId);

  const handleRateButtonClick = () => {
      if (!user) {
          onLoginRequest();
          return;
      }
      
      if (!hasPurchased) {
          setShowRestrictionMsg(true);
          setTimeout(() => setShowRestrictionMsg(false), 4000);
          return;
      }

      setIsFormOpen(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const type = file.type.startsWith('video/') ? 'video' : 'image';
      const preview = URL.createObjectURL(file);
      setMediaFiles(prev => [...prev, { file, type, preview }]);
    }
  };

  const handleRemoveMedia = (index: number) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (rating === 0) {
        alert("Please select a star rating.");
        return;
    }
    if (!comment.trim()) {
        alert("Please provide some feedback.");
        return;
    }

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      productId,
      userId: user.id,
      userName: user.name || user.phoneNumber || 'Anonymous',
      userProfilePic: user.profilePic,
      rating,
      comment,
      media: mediaFiles.map(m => ({ type: m.type, url: m.preview })), // In a real app, upload to server here
      date: new Date().toISOString().split('T')[0]
    };

    addReview(newReview);
    
    // Reset Form
    setRating(0);
    setComment('');
    setMediaFiles([]);
    setIsFormOpen(false);
  };

  return (
    <div className="mt-4 p-5 bg-white shadow-sm border-t border-gray-100 relative">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-serif font-bold text-charcoal text-lg">Ratings & Reviews</h3>
          <div className="flex items-center gap-2 mt-1">
             <span className="text-3xl font-bold text-charcoal">{averageRating}</span>
             <Star className="fill-gold text-gold" size={24} />
             <span className="text-sm text-gray-500 ml-2">{productReviews.length} ratings</span>
          </div>
        </div>
        
        <div className="relative">
          <button 
            onClick={handleRateButtonClick}
            className="bg-white border border-charcoal text-charcoal px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-charcoal hover:text-white transition-colors flex items-center gap-2"
          >
              Rate Product
          </button>
          
          <AnimatePresence>
              {showRestrictionMsg && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute top-full right-0 mt-2 w-64 bg-red-50 text-red-600 p-3 rounded-xl border border-red-100 shadow-xl z-20 text-xs font-medium"
                  >
                      <div className="flex gap-2">
                         <AlertCircle size={16} className="shrink-0 mt-0.5" />
                         <span>Verified Purchase Only. You need to buy this product to leave a review.</span>
                      </div>
                  </motion.div>
              )}
          </AnimatePresence>
        </div>
      </div>

      {/* Popup Form Modal */}
      <AnimatePresence>
         {isFormOpen && user && (
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                   onClick={() => setIsFormOpen(false)}
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative z-30 overflow-hidden"
                >
                    <div className="bg-sand/30 p-5 flex justify-between items-center border-b border-gray-100">
                        <h3 className="font-serif text-xl text-charcoal font-bold">Write a Review</h3>
                        <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6">
                        {/* Star Rating */}
                        <div className="flex justify-center gap-3 mb-6">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    type="button"
                                    key={star}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    onClick={() => setRating(star)}
                                    className="transition-transform hover:scale-110 active:scale-95"
                                >
                                    <Star 
                                        size={32} 
                                        className={`${(hoverRating || rating) >= star ? 'fill-gold text-gold' : 'text-gray-200'}`} 
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Comment Text Area */}
                        <div className="mb-4">
                            <textarea 
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Give your feedback"
                                className="w-full p-4 bg-porcelain border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-rosegold min-h-[120px] resize-none transition-colors"
                                required
                            />
                        </div>

                        {/* Media Uploads */}
                        <div className="mb-6">
                            <div className="flex flex-wrap gap-2 mb-3">
                                {mediaFiles.map((m, i) => (
                                    <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 group">
                                        {m.type === 'video' ? (
                                            <video src={m.preview} className="w-full h-full object-cover" />
                                        ) : (
                                            <img src={m.preview} alt="Upload" className="w-full h-full object-cover" />
                                        )}
                                        <button 
                                            type="button"
                                            onClick={() => handleRemoveMedia(i)}
                                            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 className="text-white" size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleFileSelect} 
                                className="hidden" 
                                accept="image/*,video/*"
                                multiple={false}
                            />
                            
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-rosegold transition-colors px-4 py-2 rounded-lg border border-dashed border-gray-300 hover:border-rosegold w-full justify-center"
                            >
                                <Paperclip size={16} /> Attach Photos/Videos
                            </button>
                        </div>

                        <button 
                            type="submit"
                            className="w-full bg-charcoal text-white font-serif font-bold py-4 rounded-xl text-sm hover:bg-gold hover:text-charcoal transition-colors shadow-lg"
                        >
                            Submit Review
                        </button>
                    </form>
                </motion.div>
            </div>
         )}
      </AnimatePresence>

      {/* Reviews List */}
      <div className="space-y-6">
         {productReviews.length === 0 ? (
             <div className="text-center py-8 text-gray-400 text-sm italic">
                 No reviews yet. Be the first to review!
             </div>
         ) : (
             productReviews.map((review) => (
                 <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                     <div className="flex items-center gap-2 mb-2">
                         <div className="bg-green-600 text-white text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                             {review.rating} <Star size={10} className="fill-white" />
                         </div>
                         <span className="font-bold text-charcoal text-sm">{review.comment.substring(0, 30)}{review.comment.length > 30 ? '...' : ''}</span>
                     </div>
                     
                     <p className="text-sm text-gray-600 leading-relaxed mb-3">
                         {review.comment}
                     </p>

                     {/* Media Grid */}
                     {review.media && review.media.length > 0 && (
                         <div className="flex gap-2 mb-3">
                             {review.media.map((m, i) => (
                                 <div key={i} className="w-16 h-16 rounded-lg overflow-hidden border border-gray-100 cursor-pointer hover:opacity-80 transition-opacity">
                                     {m.type === 'video' ? (
                                         <div className="relative w-full h-full bg-black">
                                            <video src={m.url} className="w-full h-full object-cover opacity-80" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Video className="text-white" size={20} />
                                            </div>
                                         </div>
                                     ) : (
                                         <img src={m.url} alt="Review attachment" className="w-full h-full object-cover" />
                                     )}
                                 </div>
                             ))}
                         </div>
                     )}

                     <div className="flex items-center gap-2 text-xs text-gray-400">
                         <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                             {review.userProfilePic ? (
                                 <img src={review.userProfilePic} className="w-full h-full object-cover" />
                             ) : (
                                 <UserIcon size={12} />
                             )}
                         </div>
                         <span className="font-medium text-gray-500">{review.userName}</span>
                         <span className="text-green-600 text-[10px] bg-green-50 px-1 rounded flex items-center gap-0.5"><CheckCircleIcon size={10} /> Verified Buyer</span>
                         <span>•</span>
                         <span>{review.date}</span>
                     </div>
                 </div>
             ))
         )}
      </div>
    </div>
  );
};

// Small helper icon
const CheckCircleIcon = ({size}: {size: number}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);

export default ReviewSection;