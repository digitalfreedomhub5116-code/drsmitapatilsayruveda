import React, { useState, useEffect } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { X, Phone, ArrowRight, Lock, Loader2, CheckCircle2, MessageCircle, Bell } from 'lucide-react';
import { User } from '../types';
import { useData } from '../contexts/DataContext';

const motion = m as any;

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { registeredUsers, registerUser } = useData();
  
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  // Reset state when opening/closing
  useEffect(() => {
    if (isOpen) {
      setStep('phone');
      setPhoneNumber('');
      setOtp('');
      setError('');
      setShowNotification(false);
    }
  }, [isOpen]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (phoneNumber.length < 10) {
      setError('Please enter a valid mobile number');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call and OTP generation
    setTimeout(() => {
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(code);
      setIsLoading(false);
      setStep('otp');
      
      // Trigger the "Fake" WhatsApp Notification
      setShowNotification(true);
      
      // Auto hide notification after 6 seconds
      setTimeout(() => setShowNotification(false), 6000);
    }, 2000);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (otp.length !== 4) {
      setError('Please enter the 4-digit OTP');
      return;
    }

    // Check against the generated OTP
    if (otp !== generatedOtp && otp !== '1234') { // allowing 1234 as a fallback for testing
       setError('Incorrect code. Please check the notification.');
       return;
    }

    setIsLoading(true);
    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      
      // Check if user exists in our "Database" (Context)
      const existingUser = registeredUsers.find(u => u.phoneNumber === phoneNumber);
      
      if (existingUser) {
        onSuccess(existingUser);
      } else {
        // Create new user
        const newUser: User = {
          id: 'user-' + Math.random().toString(36).substr(2, 9),
          phoneNumber: phoneNumber,
          joinedAt: new Date().toISOString()
        };
        registerUser(newUser);
        onSuccess(newUser);
      }
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Simulated Push Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-4 left-0 right-0 mx-auto w-[90%] max-w-sm bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-3 z-[80] border border-gray-100 flex items-start gap-3 cursor-pointer"
            onClick={() => {
                // Auto-fill on click for convenience
                setOtp(generatedOtp);
                setShowNotification(false);
            }}
          >
            <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center text-white shrink-0">
               <MessageCircle size={24} />
            </div>
            <div className="flex-1">
               <div className="flex justify-between items-center">
                 <h4 className="font-bold text-sm text-charcoal">WhatsApp • +91 8530085116</h4>
                 <span className="text-[10px] text-gray-400">now</span>
               </div>
               <p className="text-xs text-gray-600 mt-1">
                 Your Dr. Smita Patil verification code is <span className="font-bold text-charcoal text-sm">{generatedOtp}</span>
               </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
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
          className="bg-porcelain rounded-3xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden border border-white/50"
        >
          {/* Decorative background blobs */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-rosegold/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

          {/* Header */}
          <div className="relative p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-serif text-xl text-charcoal font-bold">
              {step === 'phone' ? 'Welcome Back' : 'Verify Mobile'}
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
              <X size={20} />
            </button>
          </div>

          <div className="p-8 relative">
            <AnimatePresence mode="wait">
              {step === 'phone' ? (
                <motion.form
                  key="phone-step"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSendOtp}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-sand rounded-full flex items-center justify-center mx-auto mb-4 text-rosegold">
                      <Phone size={28} />
                    </div>
                    <p className="text-gray-500 font-sans text-sm">
                      We will send a code via <span className="font-bold">SMS</span> and <span className="font-bold text-[#25D366]">WhatsApp</span>.
                    </p>
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400 font-bold text-sm">+91</span>
                    </div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="Mobile Number"
                      maxLength={10}
                      className="block w-full pl-12 pr-3 py-3 border-b-2 border-gray-200 bg-transparent text-lg font-medium text-charcoal placeholder-gray-300 focus:outline-none focus:border-gold transition-colors"
                      autoFocus
                    />
                  </div>

                  {error && <p className="text-red-500 text-xs text-center">{error}</p>}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-charcoal text-white font-sans font-medium py-3 rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2 group"
                  >
                    {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
                      <>
                        Get OTP <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.form
                  key="otp-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleVerifyOtp}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-sand rounded-full flex items-center justify-center mx-auto mb-4 text-rosegold relative">
                      <Lock size={28} />
                      {/* Badge for notification hint */}
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-6 h-6 bg-[#25D366] rounded-full border-2 border-white flex items-center justify-center"
                      >
                         <MessageCircle size={12} color="white" />
                      </motion.div>
                    </div>
                    <p className="text-gray-500 font-sans text-sm">
                      Enter the 4-digit code sent to <br/>
                      <span className="font-bold text-charcoal">+91 {phoneNumber}</span>
                    </p>
                    <button 
                      type="button" 
                      onClick={() => setStep('phone')} 
                      className="text-gold text-xs font-bold mt-2 hover:underline"
                    >
                      Change Number
                    </button>
                  </div>

                  <div className="flex justify-center gap-3">
                    {[0, 1, 2, 3].map((i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength={1}
                        value={otp[i] || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val.match(/[0-9]/) || val === '') {
                            const newOtp = otp.split('');
                            newOtp[i] = val;
                            setOtp(newOtp.join('').slice(0, 4));
                            // Auto focus next
                            if (val && i < 3) {
                              const nextInput = document.getElementById(`otp-${i+1}`);
                              nextInput?.focus();
                            }
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !otp[i] && i > 0) {
                            const prevInput = document.getElementById(`otp-${i-1}`);
                            prevInput?.focus();
                          }
                        }}
                        id={`otp-${i}`}
                        className="w-12 h-14 text-center text-2xl font-serif border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none bg-white transition-all"
                      />
                    ))}
                  </div>
                  
                  <div className="text-center space-y-2">
                      <p className="text-xs text-gray-400">Check your WhatsApp notification above.</p>
                      <button 
                        type="button" 
                        onClick={() => setShowNotification(true)}
                        className="text-xs text-rosegold font-bold hover:underline"
                      >
                        Resend Code
                      </button>
                  </div>

                  {error && <p className="text-red-500 text-xs text-center">{error}</p>}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gold text-white font-sans font-medium py-3 rounded-xl hover:bg-deeprose transition-colors flex items-center justify-center gap-2 shadow-lg"
                  >
                    {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
                      <>
                        Verify & Proceed <CheckCircle2 size={16} />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AuthModal;