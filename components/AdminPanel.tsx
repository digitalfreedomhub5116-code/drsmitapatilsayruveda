import React, { useState } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { Lock, User, Eye, EyeOff, Save, Trash2, Plus, ArrowLeft, RefreshCw, Image as ImageIcon, Type, LayoutTemplate, MessageSquare, PieChart, HelpCircle, Users } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { Category, Product, SiteContent } from '../types';

const motion = m as any;

interface AdminPanelProps {
  onExit: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onExit }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Login State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // CMS Hooks
  const { 
    heroPhrases, updateHeroPhrases,
    heroImages, updateHeroImages,
    categories, updateCategories,
    deleteProduct,
    siteContent, updateSiteContent,
    registeredUsers, deleteUserRecord,
    resetToDefaults
  } = useData();

  const [activeTab, setActiveTab] = useState<string>('hero');

  // Input styles for consistent black text on white background
  const inputClass = "w-full bg-white text-black border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-gold shadow-sm font-sans";
  const labelClass = "block text-xs font-bold uppercase text-gray-500 mb-2";

  // --- Auth Handler ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'pruthvi' && password === 'mh14df5116') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid Credentials. Access Denied.');
    }
  };

  // --- Hero Section Handlers ---
  const handlePhraseChange = (index: number, val: string) => {
    const newPhrases = [...heroPhrases];
    newPhrases[index] = val;
    updateHeroPhrases(newPhrases);
  };

  const handleImageChange = (index: number, val: string) => {
    const newImages = [...heroImages];
    newImages[index] = val;
    updateHeroImages(newImages);
  };

  // --- Product Handlers ---
  const handleUpdateProduct = (catId: string, prodId: string, field: keyof Product, value: any) => {
    const newCats = categories.map(cat => {
        if (cat.id !== catId) return cat;
        return {
            ...cat,
            products: cat.products.map(p => p.id === prodId ? { ...p, [field]: value } : p)
        };
    });
    updateCategories(newCats);
  };

  const handleDeleteProduct = (e: React.MouseEvent | undefined, catId: string, prodId: string) => {
      // Event safety
      if (e) {
          e.stopPropagation();
          e.preventDefault();
      }
      
      if(!window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) return;
      
      // Call the context function to update state
      deleteProduct(catId, prodId);
  }

  const handleAddProduct = (catId: string) => {
      const newCats = categories.map(cat => {
          if(cat.id !== catId) return cat;
          const newProd: Product = {
              id: `new-${Date.now()}`,
              name: 'New Product',
              subtitle: 'Subtitle',
              price: 0,
              description: ['Benefit 1'],
              image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=500&auto=format&fit=crop'
          };
          return { ...cat, products: [...cat.products, newProd] };
      });
      updateCategories(newCats);
  }

  // --- Content Update Helper ---
  const updateContent = (section: keyof SiteContent, field: string | null, value: any, index?: number, subField?: string) => {
      const newContent = { ...siteContent };
      
      if (Array.isArray(newContent[section])) {
          // Handle Array Updates (FAQs, Testimonials, Stats, BrandLogos)
          if (typeof index === 'number') {
              const arr = [...(newContent[section] as any[])];
              if (subField) {
                  arr[index] = { ...arr[index], [subField]: value };
              } else {
                  arr[index] = value;
              }
              (newContent as any)[section] = arr;
          }
      } else {
          // Handle Object Updates (About, CTA, Process)
          if (field) {
            if (section === 'process' && field === 'steps' && typeof index === 'number' && subField) {
                 const steps = [...newContent.process.steps];
                 steps[index] = { ...steps[index], [subField]: value };
                 newContent.process.steps = steps;
            } else {
                (newContent as any)[section] = {
                    ...(newContent as any)[section],
                    [field]: value
                };
            }
          }
      }
      updateSiteContent(newContent);
  };

  const handleDeleteUser = (e: React.MouseEvent, userId: string) => {
    e.stopPropagation();
    if(window.confirm("Remove this user? This will log them out if they are currently active.")) {
      deleteUserRecord(userId);
    }
  };


  // --- Render Logic ---

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center p-4">
        <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gold to-rosegold" />
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-charcoal rounded-full flex items-center justify-center mx-auto mb-4 text-gold">
              <Lock size={28} />
            </div>
            <h2 className="font-display text-2xl text-charcoal">Admin Access</h2>
            <p className="text-gray-400 text-sm">Secure Panel for Pruthvi</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
               <label className="text-xs font-bold uppercase text-gray-500">Username</label>
               <div className="relative">
                 <User className="absolute left-3 top-3 text-gray-400" size={18} />
                 <input 
                   type="text" 
                   value={username}
                   onChange={e => setUsername(e.target.value)}
                   className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gold bg-white text-black"
                   placeholder="Enter username"
                 />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-xs font-bold uppercase text-gray-500">Password</label>
               <div className="relative">
                 <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                 <input 
                   type={showPassword ? "text" : "password"}
                   value={password}
                   onChange={e => setPassword(e.target.value)}
                   className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gold bg-white text-black"
                   placeholder="Enter password"
                 />
                 <button 
                   type="button"
                   onClick={() => setShowPassword(!showPassword)}
                   className="absolute right-3 top-3 text-gray-400 hover:text-charcoal"
                 >
                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                 </button>
               </div>
            </div>

            {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}

            <div className="flex gap-4">
                <button 
                    type="button" 
                    onClick={onExit}
                    className="flex-1 py-3 text-charcoal font-bold hover:bg-gray-100 rounded-xl transition-colors"
                >
                    Cancel
                </button>
                <button 
                    type="submit"
                    className="flex-1 bg-charcoal text-white py-3 rounded-xl font-bold shadow-lg hover:bg-gold hover:text-charcoal transition-all"
                >
                    Login
                </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  // --- Dashboard Interface ---
  return (
    <div className="min-h-screen bg-porcelain flex flex-col">
      {/* Admin Header */}
      <header className="bg-charcoal text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button onClick={onExit} className="hover:text-gold transition-colors flex items-center gap-2 text-sm font-bold">
                    <ArrowLeft size={16} /> Back to Site
                </button>
                <div className="h-6 w-px bg-white/20" />
                <h1 className="font-display text-xl tracking-wide text-gold">Admin Panel</h1>
            </div>
            <div className="flex items-center gap-4">
                <button 
                    onClick={resetToDefaults}
                    className="text-xs text-red-300 hover:text-red-100 flex items-center gap-1 border border-red-300/30 px-3 py-1.5 rounded-full"
                >
                    <RefreshCw size={12} /> Reset Data
                </button>
                <div className="bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold">
                    User: Pruthvi
                </div>
            </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-sand sticky top-24">
                <h3 className="text-xs font-bold uppercase text-gray-400 mb-4 px-2">Content Manager</h3>
                <nav className="space-y-2">
                    {[
                        { id: 'users', icon: <Users size={18} />, label: 'New Users' },
                        { id: 'hero', icon: <Type size={18} />, label: 'Hero & Header' },
                        { id: 'products', icon: <ImageIcon size={18} />, label: 'Products & Images' },
                        { id: 'about', icon: <User size={18} />, label: 'About Section' },
                        { id: 'process', icon: <LayoutTemplate size={18} />, label: 'Process Steps' },
                        { id: 'stats', icon: <PieChart size={18} />, label: 'Stats & Logos' },
                        { id: 'reviews', icon: <MessageSquare size={18} />, label: 'Reviews & FAQ' },
                        { id: 'cta', icon: <HelpCircle size={18} />, label: 'CTA & Footer' },
                    ].map((item) => (
                        <button 
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${activeTab === item.id ? 'bg-charcoal text-white shadow-lg' : 'hover:bg-sand text-charcoal'}`}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                <h4 className="font-bold text-blue-900 text-sm mb-2">Tip</h4>
                <p className="text-xs text-blue-700 leading-relaxed">
                    Changes are saved automatically to your browser. Use the "Reset Data" button in the header to restore original content.
                </p>
            </div>
        </div>

        {/* Editor Area */}
        <div className="lg:col-span-3 pb-20">

            {activeTab === 'users' && (
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-sand space-y-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="font-serif text-2xl text-charcoal flex items-center gap-2">
                          <Users className="text-rosegold" /> Registered Users
                      </h2>
                      <span className="bg-sand text-charcoal px-3 py-1 rounded-full text-xs font-bold">
                        {registeredUsers.length} Total
                      </span>
                    </div>

                    {registeredUsers.length === 0 ? (
                        <div className="text-center py-10 text-gray-400">
                            No users registered yet.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-100 text-xs font-bold uppercase text-gray-400">
                                        <th className="p-3">Profile</th>
                                        <th className="p-3">Name</th>
                                        <th className="p-3">Phone</th>
                                        <th className="p-3">Email</th>
                                        <th className="p-3">Address</th>
                                        <th className="p-3">Joined Date</th>
                                        <th className="p-3 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registeredUsers.map((user) => (
                                        <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                            <td className="p-3">
                                                <div className="w-10 h-10 rounded-full bg-sand overflow-hidden flex items-center justify-center text-rosegold">
                                                    {user.profilePic ? (
                                                        <img src={user.profilePic} alt="User" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <User size={20} />
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-3 font-bold text-charcoal text-sm">
                                                {user.name || <span className="text-gray-400 italic">Unset</span>}
                                            </td>
                                            <td className="p-3 text-sm font-mono text-gray-600">
                                                +91 {user.phoneNumber}
                                            </td>
                                            <td className="p-3 text-xs text-gray-500">
                                                {user.email || '-'}
                                            </td>
                                            <td className="p-3 text-xs text-gray-500 max-w-[150px] truncate" title={user.address}>
                                                {user.address || '-'}
                                            </td>
                                            <td className="p-3 text-xs text-gray-500">
                                                {user.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : '-'}
                                            </td>
                                            <td className="p-3 text-right">
                                                <button 
                                                    type="button"
                                                    onClick={(e) => handleDeleteUser(e, user.id)}
                                                    className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors cursor-pointer relative z-10"
                                                    title="Remove User"
                                                >
                                                    <Trash2 size={16} className="pointer-events-none" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'hero' && (
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-sand">
                        <h2 className="font-serif text-2xl text-charcoal mb-6 flex items-center gap-2">
                            <Type className="text-rosegold" /> Header Creatives
                        </h2>
                        
                        <div className="space-y-6">
                            <div>
                                <label className={labelClass}>Rolling Text (Hero Phrases)</label>
                                {heroPhrases.map((phrase, i) => (
                                    <div key={i} className="mb-3 flex gap-2">
                                        <span className="w-8 h-10 flex items-center justify-center bg-gray-100 rounded text-gray-500 font-mono text-xs">{i+1}</span>
                                        <input 
                                            value={phrase}
                                            onChange={(e) => handlePhraseChange(i, e.target.value)}
                                            className={inputClass}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6 border-t border-gray-100">
                                <label className={labelClass}>Carousel Images (URLs)</label>
                                {heroImages.map((img, i) => (
                                    <div key={i} className="mb-4">
                                        <div className="flex gap-2 mb-2">
                                            <span className="w-8 h-10 flex items-center justify-center bg-gray-100 rounded text-gray-500 font-mono text-xs">{i+1}</span>
                                            <input 
                                                value={img}
                                                onChange={(e) => handleImageChange(i, e.target.value)}
                                                className={inputClass}
                                            />
                                        </div>
                                        <div className="ml-10 h-24 w-24 rounded-lg overflow-hidden border border-gray-200 relative bg-gray-50">
                                            <img src={img} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'products' && (
                <div className="space-y-8">
                     {categories.map((cat) => (
                         <div key={cat.id} className="bg-white p-6 rounded-3xl shadow-sm border border-sand">
                             <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                                 <img src={cat.image} className="w-16 h-16 rounded-xl object-cover" alt={cat.title} />
                                 <div>
                                     <h3 className="font-display text-xl">{cat.title}</h3>
                                     <p className="text-xs text-gray-400">{cat.products.length} Products</p>
                                 </div>
                                 <button onClick={() => handleAddProduct(cat.id)} className="ml-auto flex items-center gap-2 bg-charcoal text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-gold hover:text-charcoal transition-colors">
                                     <Plus size={14} /> Add Product
                                 </button>
                             </div>

                             <div className="grid grid-cols-1 gap-4">
                                 {cat.products.map((prod) => (
                                     <div key={prod.id} className="border border-gray-100 rounded-xl p-4 bg-gray-50/50 relative">
                                         <div className="flex flex-col md:flex-row gap-4">
                                             <div className="w-24 h-24 bg-white rounded-lg border border-gray-200 shrink-0 overflow-hidden relative group">
                                                 <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                                                 <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                     <span className="text-white text-[10px]">Preview</span>
                                                 </div>
                                             </div>
                                             
                                             <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                 <div>
                                                     <label className={labelClass}>Name</label>
                                                     <input 
                                                         value={prod.name}
                                                         onChange={(e) => handleUpdateProduct(cat.id, prod.id, 'name', e.target.value)}
                                                         className={inputClass}
                                                     />
                                                 </div>
                                                 <div>
                                                     <label className={labelClass}>Price (₹)</label>
                                                     <input 
                                                         type="number"
                                                         value={prod.price}
                                                         onChange={(e) => handleUpdateProduct(cat.id, prod.id, 'price', Number(e.target.value))}
                                                         className={inputClass}
                                                     />
                                                 </div>
                                                 <div className="md:col-span-2">
                                                     <label className={labelClass}>Image URL</label>
                                                     <input 
                                                         value={prod.image}
                                                         onChange={(e) => handleUpdateProduct(cat.id, prod.id, 'image', e.target.value)}
                                                         className={inputClass}
                                                     />
                                                 </div>
                                                 <div className="md:col-span-2">
                                                     <label className={labelClass}>Subtitle</label>
                                                     <input 
                                                         value={prod.subtitle}
                                                         onChange={(e) => handleUpdateProduct(cat.id, prod.id, 'subtitle', e.target.value)}
                                                         className={inputClass}
                                                     />
                                                 </div>
                                             </div>

                                             <div className="flex flex-col justify-center">
                                                 <button 
                                                    type="button"
                                                    onClick={(e) => handleDeleteProduct(e, cat.id, prod.id)}
                                                    className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors cursor-pointer relative z-10" 
                                                    title="Delete Product"
                                                 >
                                                     <Trash2 size={18} className="pointer-events-none" />
                                                 </button>
                                             </div>
                                         </div>
                                     </div>
                                 ))}
                             </div>
                         </div>
                     ))}
                </div>
            )}

            {activeTab === 'about' && (
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-sand space-y-6">
                    <h2 className="font-serif text-2xl text-charcoal mb-4">About Section</h2>
                    
                    <div>
                        <label className={labelClass}>Section Title</label>
                        <input value={siteContent.about.title} onChange={e => updateContent('about', 'title', e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Highlight Word (colored text)</label>
                        <input value={siteContent.about.highlight} onChange={e => updateContent('about', 'highlight', e.target.value)} className={inputClass} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Badge Value</label>
                            <input value={siteContent.about.badgeVal} onChange={e => updateContent('about', 'badgeVal', e.target.value)} className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass}>Badge Label</label>
                            <input value={siteContent.about.badgeLabel} onChange={e => updateContent('about', 'badgeLabel', e.target.value)} className={inputClass} />
                        </div>
                    </div>
                    <div>
                        <label className={labelClass}>Image URL</label>
                        <input value={siteContent.about.image} onChange={e => updateContent('about', 'image', e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Paragraph 1</label>
                        <textarea rows={3} value={siteContent.about.p1} onChange={e => updateContent('about', 'p1', e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Paragraph 2</label>
                        <textarea rows={3} value={siteContent.about.p2} onChange={e => updateContent('about', 'p2', e.target.value)} className={inputClass} />
                    </div>
                </div>
            )}

            {activeTab === 'process' && (
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-sand space-y-6">
                    <h2 className="font-serif text-2xl text-charcoal mb-4">Process Section</h2>
                    <div>
                        <label className={labelClass}>Main Title</label>
                        <input value={siteContent.process.title} onChange={e => updateContent('process', 'title', e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Description</label>
                        <input value={siteContent.process.desc} onChange={e => updateContent('process', 'desc', e.target.value)} className={inputClass} />
                    </div>
                    
                    <div className="space-y-4 pt-4">
                        <label className={labelClass}>Steps</label>
                        {siteContent.process.steps.map((step, i) => (
                            <div key={i} className="p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                                <div className="mb-2">
                                    <span className="text-xs font-bold text-gray-400">Step {i+1} Title</span>
                                    <input value={step.title} onChange={e => updateContent('process', 'steps', e.target.value, i, 'title')} className={inputClass} />
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-gray-400">Description</span>
                                    <input value={step.desc} onChange={e => updateContent('process', 'steps', e.target.value, i, 'desc')} className={inputClass} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'stats' && (
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-sand space-y-6">
                        <h2 className="font-serif text-2xl text-charcoal mb-4">Statistics</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {siteContent.stats.map((stat, i) => (
                                <div key={i} className="p-4 border border-gray-100 rounded-xl">
                                    <div className="mb-2">
                                        <label className={labelClass}>Value</label>
                                        <input value={stat.val} onChange={e => updateContent('stats', null, e.target.value, i, 'val')} className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Label</label>
                                        <input value={stat.label} onChange={e => updateContent('stats', null, e.target.value, i, 'label')} className={inputClass} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Brand Logos editing section removed */}
                </div>
            )}

            {activeTab === 'reviews' && (
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-sand space-y-6">
                        <h2 className="font-serif text-2xl text-charcoal mb-4">Testimonials</h2>
                        {siteContent.testimonials.map((t, i) => (
                            <div key={i} className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                                <div className="mb-2">
                                    <label className={labelClass}>Review Text</label>
                                    <textarea rows={2} value={t.text} onChange={e => updateContent('testimonials', null, e.target.value, i, 'text')} className={inputClass} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>Name</label>
                                        <input value={t.name} onChange={e => updateContent('testimonials', null, e.target.value, i, 'name')} className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Location</label>
                                        <input value={t.loc} onChange={e => updateContent('testimonials', null, e.target.value, i, 'loc')} className={inputClass} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-sand space-y-6">
                        <h2 className="font-serif text-2xl text-charcoal mb-4">FAQ</h2>
                        {siteContent.faqs.map((faq, i) => (
                            <div key={i} className="p-4 border border-gray-100 rounded-xl">
                                <div className="mb-2">
                                    <label className={labelClass}>Question</label>
                                    <input value={faq.q} onChange={e => updateContent('faqs', null, e.target.value, i, 'q')} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Answer</label>
                                    <textarea rows={2} value={faq.a} onChange={e => updateContent('faqs', null, e.target.value, i, 'a')} className={inputClass} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'cta' && (
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-sand space-y-6">
                    <h2 className="font-serif text-2xl text-charcoal mb-4">CTA Section</h2>
                    <div>
                        <label className={labelClass}>Title</label>
                        <input value={siteContent.cta.title} onChange={e => updateContent('cta', 'title', e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Highlight Word</label>
                        <input value={siteContent.cta.highlight} onChange={e => updateContent('cta', 'highlight', e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Subtitle Text</label>
                        <textarea rows={2} value={siteContent.cta.text} onChange={e => updateContent('cta', 'text', e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Background Image URL</label>
                        <input value={siteContent.cta.image} onChange={e => updateContent('cta', 'image', e.target.value)} className={inputClass} />
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;