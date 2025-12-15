import React, { useState } from 'react';
import { motion as m } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Instagram, Facebook, Home, ChevronRight, Clock, MessageCircle } from 'lucide-react';

const motion = m as any;

interface ContactPageProps {
  onNavigateHome: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onNavigateHome }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct the WhatsApp message
    const text = `*New Inquiry from Website*
    
*Name:* ${formData.name}
*Email:* ${formData.email}
*Subject:* ${formData.subject}

*Message:*
${formData.message}`;

    // WhatsApp API URL
    const phoneNumber = "919359732290";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    
    // Open WhatsApp
    window.open(url, '_blank');
    
    // Show local success state
    setIsSent(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setIsSent(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="pt-20 min-h-screen bg-porcelain animate-in fade-in duration-700">
      
      {/* Page Header */}
      <div className="bg-sand/30 py-16 mb-8 border-b border-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 mb-6"
          >
            <button 
              onClick={onNavigateHome} 
              className="hover:text-rosegold transition-colors flex items-center gap-1 group"
            >
              <Home size={12} className="mb-0.5 group-hover:text-rosegold transition-colors" /> Home
            </button>
            <ChevronRight size={12} className="text-gray-300" />
            <span className="text-rosegold">Contact</span>
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="font-display text-4xl md:text-6xl text-charcoal mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="font-sans text-gray-500 max-w-xl mx-auto"
          >
            We are here to help you on your journey to natural wellness. Reach out for consultations, queries, or just to say hello.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Contact Info Column */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="space-y-12"
          >
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-sand/50 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
               
               <h3 className="font-serif text-2xl text-charcoal mb-8">Clinic Information</h3>
               
               <div className="space-y-8">
                 <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-sand flex items-center justify-center text-rosegold shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-charcoal text-sm uppercase tracking-wider mb-1">Visit Us</h4>
                      <p className="text-gray-500 font-sans text-sm leading-relaxed">
                        Dr. Smita Patil's Ayurveda<br />
                        Plot No. 42, Green Avenue,<br />
                        Kothrud, Pune, Maharashtra - 411038
                      </p>
                    </div>
                 </div>

                 <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-sand flex items-center justify-center text-rosegold shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-charcoal text-sm uppercase tracking-wider mb-1">Call Us</h4>
                      <p className="text-gray-500 font-sans text-sm">+91 98765 43210</p>
                      <p className="text-gray-400 font-sans text-xs mt-1">Mon-Sat, 10am - 7pm</p>
                    </div>
                 </div>

                 <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-sand flex items-center justify-center text-rosegold shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-charcoal text-sm uppercase tracking-wider mb-1">Email Us</h4>
                      <p className="text-gray-500 font-sans text-sm">hello@drsmitaayurveda.com</p>
                      <p className="text-gray-500 font-sans text-sm">support@drsmitaayurveda.com</p>
                    </div>
                 </div>
               </div>

               <div className="mt-10 pt-8 border-t border-gray-100">
                 <h4 className="font-bold text-charcoal text-xs uppercase tracking-wider mb-4">Follow Our Journey</h4>
                 <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-rosegold hover:text-white hover:border-rosegold transition-all">
                      <Instagram size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                      <Facebook size={18} />
                    </a>
                 </div>
               </div>
            </div>

            {/* Map Placeholder */}
            <div className="h-64 bg-gray-200 rounded-3xl overflow-hidden relative grayscale opacity-80 hover:grayscale-0 transition-all duration-500 shadow-inner">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.568370597395!2d73.8093!3d18.5034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e674e1185%3A0xbe4791702403848!2sKothrud%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1645512345678!5m2!1sen!2sin" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 loading="lazy"
               ></iframe>
            </div>
          </motion.div>

          {/* Contact Form Column */}
          <motion.div 
             initial="hidden"
             animate="visible"
             variants={fadeInUp}
             transition={{ delay: 0.2 }}
             className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-white relative"
          >
             <div className="absolute top-0 right-0 w-64 h-64 bg-rosegold/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />

             <h3 className="font-serif text-2xl text-charcoal mb-2">Send a Message</h3>
             <p className="text-gray-500 font-sans text-sm mb-8">Fill the details below to start a WhatsApp chat with us.</p>

             {isSent ? (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="bg-green-50 text-green-800 p-6 rounded-2xl flex flex-col items-center text-center space-y-2 border border-green-100"
               >
                 <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                   <MessageCircle size={24} />
                 </div>
                 <h4 className="font-serif text-lg font-bold">Redirecting to WhatsApp...</h4>
                 <p className="text-sm font-sans">Please continue your conversation in the app.</p>
               </motion.div>
             ) : (
               <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase text-gray-400">Name</label>
                       <input 
                         type="text" 
                         name="name"
                         value={formData.name}
                         onChange={handleChange}
                         required
                         className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-rosegold bg-transparent text-charcoal transition-colors placeholder-gray-300 font-sans"
                         placeholder="Your Name"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase text-gray-400">Email</label>
                       <input 
                         type="email" 
                         name="email"
                         value={formData.email}
                         onChange={handleChange}
                         required
                         className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-rosegold bg-transparent text-charcoal transition-colors placeholder-gray-300 font-sans"
                         placeholder="you@company.com"
                       />
                    </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase text-gray-400">Subject</label>
                     <input 
                       type="text" 
                       name="subject"
                       value={formData.subject}
                       onChange={handleChange}
                       required
                       className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-rosegold bg-transparent text-charcoal transition-colors placeholder-gray-300 font-sans"
                       placeholder="Consultation / Order Inquiry"
                     />
                  </div>

                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase text-gray-400">Message</label>
                     <textarea 
                       name="message"
                       value={formData.message}
                       onChange={handleChange}
                       required
                       rows={4}
                       className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-rosegold bg-transparent text-charcoal transition-colors placeholder-gray-300 font-sans resize-none"
                       placeholder="How can we help you?"
                     />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#25D366] text-white font-serif py-4 rounded-xl mt-4 hover:bg-[#128C7E] transition-all shadow-lg flex items-center justify-center gap-2 group"
                  >
                    Send via WhatsApp <MessageCircle size={20} className="fill-current" />
                  </button>
               </form>
             )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;