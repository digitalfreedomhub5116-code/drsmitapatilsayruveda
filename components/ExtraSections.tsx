import React, { useRef, useState } from 'react';
import { motion as m, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Star, ChevronDown, Plus, Minus, Heart, Users, Clock, Globe, Sparkles, Leaf, ArrowRight } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const motion = m as any;

// --- Shared Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
    } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

// --- 3. Process / Steps Section ---
export const ProcessSection = () => {
  const { siteContent } = useData();
  const { process } = siteContent;
  const ref = useRef(null);
  
  // Parallax Effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  
  // Hardcoded icons map for steps 1-4
  const icons = [
      <Leaf size={24} />,
      <Sparkles size={24} />,
      <Star size={24} />,
      <Heart size={24} />
  ];

  return (
    <section ref={ref} className="py-24 bg-charcoal text-white relative overflow-hidden">
      
      {/* Image Background with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0 h-[120%] -top-[10%]"
      >
         <img
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop"
            alt="Ritual Background"
            className="w-full h-full object-cover opacity-50"
         />
      </motion.div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-charcoal/80 z-0" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl text-gold mb-4"
          >
            {process.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-sans text-gray-300 max-w-lg mx-auto"
          >
            {process.desc}
          </motion.p>
        </div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {process.steps.map((step, i) => (
            <motion.div 
              key={i}
              variants={fadeInUp}
              className="relative p-8 border border-white/10 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300 group hover:-translate-y-2 backdrop-blur-sm"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-charcoal border border-gold rounded-full flex items-center justify-center text-gold z-20 group-hover:scale-110 transition-transform shadow-lg">
                {icons[i] || <Star size={24} />}
              </div>
              <div className="mt-6 text-center">
                 <h3 className="font-serif text-xl mb-3 text-porcelain">{step.title}</h3>
                 <p className="font-sans text-sm text-gray-300 leading-relaxed">{step.desc}</p>
              </div>
              <div className="absolute top-4 right-4 text-[40px] font-display text-white/5 group-hover:text-gold/20 transition-colors select-none">
                0{i + 1}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// --- 4. Stats Section ---
export const StatsSection = () => {
  const { siteContent } = useData();
  const { stats } = siteContent;
  
  const icons = [
    <Users size={20} />,
    <Clock size={20} />,
    <Leaf size={20} />,
    <Globe size={20} />
  ];

  return (
    <section className="py-20 bg-gold relative">
       {/* Pattern Overlay */}
       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-10" />
       
       <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-x-0 md:divide-x divide-charcoal/10">
          {stats.map((stat, i) => (
            <StatItem key={i} label={stat.label} val={stat.val} icon={icons[i] || <Star size={20} />} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatItem = ({ label, val, icon, delay }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="flex flex-col items-center justify-center p-6 text-center"
    >
      <div className="mb-4 text-charcoal/60 bg-white/20 p-3 rounded-full backdrop-blur-sm">
        {icon}
      </div>
      <h3 className="font-display text-4xl md:text-6xl text-white mb-2 font-medium">{val}</h3>
      <p className="font-sans text-charcoal font-bold uppercase text-[10px] md:text-xs tracking-[0.2em]">{label}</p>
    </motion.div>
  );
};

// --- 5. Testimonials Section ---
export const TestimonialsSection = () => {
  const { siteContent } = useData();
  const { testimonials } = siteContent;

  return (
    <section className="py-32 bg-porcelain relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sand/40 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rosegold/10 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 text-center mb-20 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30, scale: 0.95 }}
           whileInView={{ opacity: 1, y: 0, scale: 1 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl text-charcoal mb-4">Love Notes</h2>
          <div className="w-24 h-1 bg-rosegold mx-auto rounded-full" />
        </motion.div>
      </div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
      >
        {testimonials.map((item, i) => (
          <motion.div 
            key={i}
            variants={fadeInUp}
            whileHover={{ y: -10 }}
            className="bg-white/60 backdrop-blur-md p-10 rounded-2xl shadow-sm border border-white hover:shadow-xl hover:border-gold/30 transition-all duration-300"
          >
            <div className="flex text-gold mb-6">
              {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
            </div>
            <p className="font-sans text-gray-600 italic mb-8 leading-relaxed">"{item.text}"</p>
            <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sand to-rosegold flex items-center justify-center text-white font-serif font-bold">
                {item.name[0]}
              </div>
              <div>
                <h4 className="font-serif font-bold text-charcoal text-sm">{item.name}</h4>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.loc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

// --- 6. FAQ Section ---
export const FaqSection = () => {
  const { siteContent } = useData();
  const { faqs } = siteContent;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 bg-white relative">
      <div className="max-w-3xl mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl text-center text-charcoal mb-16"
        >
          Common Questions
        </motion.h2>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`border transition-all duration-300 rounded-xl overflow-hidden ${openIndex === i ? 'border-rosegold bg-porcelain' : 'border-gray-100 bg-white hover:border-gray-300'}`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <span className={`font-serif font-bold transition-colors ${openIndex === i ? 'text-rosegold' : 'text-charcoal'}`}>
                  {faq.q}
                </span>
                <span className={`transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-rosegold' : 'text-gray-400'}`}>
                   {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-gray-500 font-sans text-sm leading-loose">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 7. CTA Section with Parallax Background ---
export const CtaSection = () => {
  const { siteContent } = useData();
  const { cta } = siteContent;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const titleParts = cta.title.split(cta.highlight);

  return (
    <section ref={ref} className="py-32 relative overflow-hidden flex items-center justify-center min-h-[600px]">
      {/* Parallax Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-deeprose/90 z-10" />
        <img 
          src={cta.image} 
          alt="Ayurvedic Spa" 
          className="w-full h-[120%] object-cover opacity-50" 
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Sparkles className="mx-auto text-gold mb-6 w-12 h-12" />
          <h2 className="font-display text-5xl md:text-7xl mb-8 leading-tight">
            {titleParts[0]} <span className="text-gold italic">{cta.highlight}</span> {titleParts[1]}
          </h2>
          <p className="font-sans text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            {cta.text}
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
             <div className="relative w-full md:w-96">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full px-8 py-5 rounded-full text-charcoal bg-white/95 backdrop-blur shadow-2xl focus:outline-none focus:ring-4 focus:ring-gold/30 transition-all font-sans placeholder-gray-400"
                />
             </div>
             <button className="bg-charcoal text-white font-bold uppercase tracking-widest text-sm px-10 py-5 rounded-full hover:bg-gold hover:text-charcoal transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 w-full md:w-auto">
               Subscribe
             </button>
          </div>
          <p className="mt-6 text-xs text-white/50 uppercase tracking-wider">No spam, only wellness.</p>
        </motion.div>
      </div>
    </section>
  );
};