import React from 'react';
import { motion as m } from 'framer-motion';
import { ChevronRight, Home, Leaf, Heart, ShieldCheck, Sprout } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const motion = m as any;

interface OurStoryPageProps {
  onNavigateHome: () => void;
}

const OurStoryPage: React.FC<OurStoryPageProps> = ({ onNavigateHome }) => {
  const { siteContent } = useData();
  const { about, stats } = siteContent;

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const values = [
    { icon: <Leaf size={24} />, title: "100% Organic", desc: "Sourced directly from certified farms in Rajasthan." },
    { icon: <ShieldCheck size={24} />, title: "Ancient Recipes", desc: "Formulations derived from 5000-year-old texts." },
    { icon: <Sprout size={24} />, title: "Sustainable", desc: "Eco-friendly packaging and ethical sourcing." },
    { icon: <Heart size={24} />, title: "Handcrafted", desc: "Made in small batches to ensure potency." },
  ];

  return (
    <div className="pt-20 min-h-screen bg-white animate-in fade-in duration-700 font-sans">
      
      {/* Navigation Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-6">
         <button 
            onClick={onNavigateHome} 
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 hover:text-rosegold transition-colors group"
          >
            <Home size={12} className="mb-0.5 group-hover:text-rosegold" /> 
            Home <ChevronRight size={12} /> <span className="text-rosegold font-bold">Our Story</span>
         </button>
      </div>

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden flex items-center justify-center">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={about.image} 
            alt="Dr. Smita Patil" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
           <motion.span 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="block text-white/90 font-bold uppercase tracking-[0.3em] text-xs md:text-sm mb-4"
           >
             The Legacy
           </motion.span>
           <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="font-display text-5xl md:text-7xl text-white mb-6 leading-tight"
           >
             {about.title}
           </motion.h1>
        </div>
      </section>

      {/* The Vision / Content Section */}
      <section className="relative py-20 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          
          {/* Left Column: Stats & Badge */}
          <div className="md:col-span-4 relative">
             <motion.div 
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={fadeInUp}
               className="sticky top-32 p-8 bg-porcelain rounded-3xl border border-sand/50"
             >
                <div className="text-center mb-8 pb-8 border-b border-gray-200">
                   <span className="block text-6xl font-display text-rosegold mb-2">{about.badgeVal}</span>
                   <span className="text-xs font-bold uppercase tracking-widest text-charcoal">{about.badgeLabel}</span>
                </div>
                
                <div className="space-y-6">
                   {stats.slice(0, 3).map((stat, i) => (
                      <div key={i} className="flex justify-between items-center">
                         <span className="text-sm text-gray-500 font-medium">{stat.label}</span>
                         <span className="font-serif text-lg font-bold text-charcoal">{stat.val}</span>
                      </div>
                   ))}
                </div>
             </motion.div>
          </div>

          {/* Right Column: Narrative */}
          <div className="md:col-span-8 space-y-12">
             <motion.div
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={fadeInUp}
             >
                <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-8 leading-relaxed">
                  "{about.p1}"
                </h2>
                <div className="prose prose-lg text-gray-500 font-sans leading-loose">
                  <p className="mb-6">
                    {about.p2}
                  </p>
                  <p className="mb-6">
                    In a world chasing instant results with synthetic chemicals, we chose the path less traveled. 
                    Dr. Smita Patil began her journey in a small clinic in Pune, noticing how modern lifestyle stressors were wreaking havoc on skin health.
                  </p>
                  <p>
                    Decoding ancient Sanskrit texts, she rediscovered formulations that do not just coat the skin, 
                    but communicate with its cells. Every herb is picked at a specific time of day to ensure maximum potency, 
                    and every oil is cold-pressed to preserve its life force.
                  </p>
                </div>
                
                <div className="mt-12 flex items-center gap-4">
                   <img 
                    src={about.image} 
                    alt="Signature" 
                    className="w-16 h-16 rounded-full object-cover border-2 border-gold grayscale"
                   />
                   <div>
                     <p className="font-display text-lg text-charcoal">Dr. Smita Patil</p>
                     <p className="text-xs text-rosegold uppercase tracking-wider font-bold">Founder & Ayurvedic Practitioner</p>
                   </div>
                </div>
             </motion.div>

             {/* Values Grid */}
             <motion.div 
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={fadeInUp}
               className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16"
             >
                {values.map((val, i) => (
                  <div key={i} className="flex gap-4 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                     <div className="w-12 h-12 bg-sand rounded-full flex items-center justify-center text-rosegold shrink-0">
                        {val.icon}
                     </div>
                     <div>
                        <h4 className="font-bold text-charcoal mb-1">{val.title}</h4>
                        <p className="text-sm text-gray-500 leading-relaxed">{val.desc}</p>
                     </div>
                  </div>
                ))}
             </motion.div>
          </div>

        </div>
      </section>

      {/* Philosophy Quote */}
      <section className="bg-charcoal py-20 px-6 text-center">
         <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="max-w-3xl mx-auto"
         >
            <div className="w-16 h-1 bg-gold mx-auto mb-8" />
            <p className="font-serif text-2xl md:text-4xl text-white leading-relaxed italic opacity-90">
              "Ayurveda is the science of life. It teaches us that true beauty is not just about how you look, but how you feel, how you breathe, and how you live."
            </p>
         </motion.div>
      </section>

    </div>
  );
};

export default OurStoryPage;