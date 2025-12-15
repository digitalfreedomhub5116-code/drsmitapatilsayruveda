import React, { useState, useRef, useEffect } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { X, Camera, MapPin, Mail, User as UserIcon, Save, Clock, AlertCircle } from 'lucide-react';
import { User } from '../types';

const motion = m as any;

interface ProfileModalProps {
  isOpen: boolean;
  user: User | null;
  onClose: () => void; // Used for "Later" or "Cancel"
  onSave: (updatedUser: User) => void;
  isNewLogin?: boolean; // To trigger the "Guide" look
  forceCompletion?: boolean; // If true, forces entry before proceeding (e.g., checkout)
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, user, onClose, onSave, isNewLogin, forceCompletion }) => {
  // Local state for form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [profilePic, setProfilePic] = useState<string | null>(null);
  
  // Alert state
  const [showAlert, setShowAlert] = useState(false);
  
  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state with user prop when opening
  useEffect(() => {
    if (isOpen && user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setAddress(user.address || '');
      setProfilePic(user.profilePic || null);
      setShowAlert(false);
    }
  }, [isOpen, user]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a fake local URL for preview
      const url = URL.createObjectURL(file);
      setProfilePic(url);
    }
  };

  const handleSaveAttempt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // Validation
    if (!name.trim() || !address.trim()) {
       triggerAlert();
       return;
    }

    const updatedUser: User = {
      ...user,
      name,
      email,
      address,
      profilePic: profilePic || undefined
    };

    onSave(updatedUser);
  };

  const triggerAlert = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  // If user tries to click backdrop
  const handleBackdropClick = () => {
    triggerAlert();
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      {/* Strict Backdrop - clicking it triggers alert instead of closing */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-charcoal/80 backdrop-blur-sm cursor-not-allowed"
        onClick={handleBackdropClick}
      />

      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
      >
        {/* Close Button - Always available to abort the process (Cancel Checkout) */}
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-gray-100 transition-colors text-charcoal bg-white/50 backdrop-blur"
            title={forceCompletion ? "Cancel & Exit" : "Close"}
        >
            <X size={20} />
        </button>

        {/* Sidebar / Visual Header */}
        <div className="md:w-1/3 bg-sand/50 p-8 flex flex-col items-center justify-center border-r border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gold/10 to-transparent" />
          
          <div className="relative group cursor-pointer mb-4" onClick={() => fileInputRef.current?.click()}>
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-porcelain flex items-center justify-center">
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <UserIcon size={48} className="text-gray-300" />
              )}
            </div>
            <div className="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="text-white" />
            </div>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleImageUpload} 
          />
          
          <h3 className="font-serif text-xl text-charcoal font-bold text-center">
            {name || "Your Name"}
          </h3>
          <p className="text-xs text-rosegold font-bold mt-1">{user.phoneNumber}</p>
        </div>

        {/* Form Content */}
        <div className="md:w-2/3 p-8 overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="font-display text-2xl text-charcoal">
                {isNewLogin ? "Welcome, Beautiful!" : "Your Details"}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {forceCompletion 
                   ? "We need your details to deliver your order." 
                   : (isNewLogin ? "Let's personalize your Ayurveda journey." : "Update your personal details below.")}
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveAttempt} className="space-y-5">
            {/* Alert Box */}
            <AnimatePresence>
              {showAlert && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3 overflow-hidden"
                >
                  <AlertCircle size={20} className="shrink-0" />
                  <p className="text-sm font-medium">Please fill your {forceCompletion ? 'shipping' : ''} details to proceed.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-400 flex items-center gap-2">
                <UserIcon size={14} /> Full Name <span className="text-red-400">*</span>
              </label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dr. Smita Patil"
                className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-rosegold bg-transparent text-charcoal transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-400 flex items-center gap-2">
                <Mail size={14} /> Email Address
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-rosegold bg-transparent text-charcoal transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-400 flex items-center gap-2">
                <MapPin size={14} /> Shipping Address <span className="text-red-400">*</span>
              </label>
              <textarea 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Flat No, Building, Street, City, Pincode"
                rows={3}
                className="w-full border rounded-xl border-gray-200 p-3 focus:outline-none focus:border-rosegold bg-porcelain/50 text-charcoal text-sm resize-none transition-colors"
              />
            </div>

            <div className="pt-6 flex flex-col-reverse md:flex-row gap-4">
              {!forceCompletion && (
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 rounded-xl border border-gray-200 text-gray-400 font-sans text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Clock size={16} /> I will do it later
                </button>
              )}
              
              <button
                type="submit"
                className={`flex-1 px-6 py-3 rounded-xl bg-gold text-white font-serif shadow-lg hover:bg-deeprose transition-colors flex items-center justify-center gap-2 ${forceCompletion ? 'w-full' : ''}`}
              >
                <Save size={16} /> {forceCompletion ? 'Save & Continue' : 'Save Profile'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileModal;