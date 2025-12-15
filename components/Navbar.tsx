import React, { useState, useEffect } from 'react';
import { motion as m, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User as UserIcon, LogOut, Settings, Heart, Home, LayoutGrid, PlayCircle, ShoppingCart, Search, Mic, X } from 'lucide-react';
import { User, Product } from '../types';
import { useData } from '../contexts/DataContext';

const motion = m as any;

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  user: User | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  onOpenProfile: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
  onQuickView: (product: Product) => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  cartCount, 
  onOpenCart, 
  wishlistCount,
  onOpenWishlist,
  user, 
  onLoginClick, 
  onLogoutClick, 
  onOpenProfile,
  onNavigate,
  currentPage,
  onQuickView
}) => {
  const { scrollY } = useScroll();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { categories } = useData();

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  
  // Desktop Scroll Animations
  const headerBg = useTransform(scrollY, [0, 50], ["rgba(255,255,255,0)", "rgba(255,255,255,0.98)"]);
  const headerBlur = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(12px)"]);
  const headerShadow = useTransform(scrollY, [0, 50], ["none", "0 4px 20px -5px rgba(0,0,0,0.05)"]);
  const navPadding = useTransform(scrollY, [0, 50], ["1.5rem", "1rem"]);

  // Search Effect
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const allProducts = categories.flatMap(c => c.products);
      const results = allProducts.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, categories]);

  const navLinks = [
    { name: 'Home', page: 'home', href: '#' },
    { name: 'Shop', page: 'shop', href: '#' },
    { name: 'Our Story', page: 'story', href: '#' },
    { name: 'Contact', page: 'contact', href: '#' },
  ];

  const mobileNavItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'shop', icon: LayoutGrid, label: 'Shop' },
    { id: 'story', icon: PlayCircle, label: 'Story' },
    { id: 'account', icon: UserIcon, label: user ? 'Profile' : 'Login', action: user ? onOpenProfile : onLoginClick },
    { id: 'cart', icon: ShoppingCart, label: 'Cart', action: onOpenCart, badge: cartCount },
  ];

  const getDisplayName = () => {
    if (!user) return '';
    if (user.name) return user.name.split(' ')[0];
    return `+91 ${user.phoneNumber.slice(0,5)}...`;
  };

  const handleNavClick = (e: React.MouseEvent, item: { name: string, page: string, href: string }) => {
    e.preventDefault();
    onNavigate(item.page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Components ---

  const UserAvatar = () => (
    user ? (
        <div className="relative">
        <button 
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
            {user.profilePic ? (
                <img src={user.profilePic} alt="Profile" className="w-8 h-8 rounded-full object-cover border border-gray-200" />
            ) : (
                <div className="w-8 h-8 rounded-full bg-sand flex items-center justify-center text-charcoal border border-transparent">
                    <UserIcon size={18} />
                </div>
            )}
            <span className="font-sans text-xs font-bold text-charcoal hidden md:block">
                {getDisplayName()}
            </span>
        </button>

        <AnimatePresence>
            {isUserMenuOpen && (
            <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 origin-top-right"
                onMouseLeave={() => setIsUserMenuOpen(false)}
            >
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                    <p className="text-[10px] uppercase text-gray-400 font-bold">Account</p>
                    <p className="text-sm font-bold text-charcoal truncate">{user.name || user.phoneNumber}</p>
                </div>
                <button onClick={() => { onOpenProfile(); setIsUserMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
                    <Settings size={14} /> My Profile
                </button>
                <button onClick={() => { onLogoutClick(); setIsUserMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2">
                    <LogOut size={14} /> Logout
                </button>
            </motion.div>
            )}
        </AnimatePresence>
        </div>
    ) : (
    <button 
        onClick={onLoginClick} 
        className="text-sm font-bold text-charcoal hover:text-rosegold transition-colors"
    >
        Login
    </button>
    )
  );

  return (
    <>
      {/* --- DESKTOP NAVIGATION --- */}
      <div className="hidden md:block">
          {/* Marquee */}
          <div className="bg-sand/80 backdrop-blur-sm overflow-hidden py-1.5 z-50 relative border-b border-white/50">
            <div className="max-w-7xl mx-auto flex justify-center text-[10px] font-bold tracking-widest text-charcoal/70 uppercase">
               Free Shipping on All Orders Above ₹499
            </div>
          </div>

          {/* Main Navbar */}
          <motion.nav
            style={{ 
              backgroundColor: headerBg, 
              backdropFilter: headerBlur,
              boxShadow: headerShadow,
              paddingTop: navPadding,
              paddingBottom: navPadding
            }}
            className="fixed top-[28px] left-0 right-0 z-[100] w-full transition-all duration-300"
          >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="font-display font-bold text-2xl text-rosegold tracking-tight">
                    Dr. Smita Patil
                </a>

                {/* Links */}
                <div className="flex items-center gap-8">
                   {navLinks.map((item) => (
                       <a
                           key={item.page}
                           href={item.href}
                           onClick={(e) => handleNavClick(e, item)}
                           className={`text-sm font-medium transition-colors relative group ${currentPage === item.page ? 'text-charcoal' : 'text-gray-500 hover:text-charcoal'}`}
                       >
                           {item.name}
                           <span className={`absolute -bottom-1 left-0 h-0.5 bg-rosegold transition-all duration-300 ${currentPage === item.page ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                       </a>
                   ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-6">
                    <button onClick={onOpenWishlist} className="relative text-charcoal hover:text-rosegold transition-colors">
                        <Heart size={20} />
                        {wishlistCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-rosegold text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                {wishlistCount}
                            </span>
                        )}
                    </button>
                    
                    <UserAvatar />
                    
                    <button onClick={onOpenCart} className="relative text-charcoal hover:text-rosegold transition-colors">
                        <ShoppingBag size={20} />
                        {cartCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-deeprose text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
          </motion.nav>
      </div>

      {/* --- MOBILE NAVIGATION --- */}
      <div className="md:hidden">
          
          {/* Top Compact Header */}
          <div className="fixed top-0 left-0 right-0 z-[100] bg-white shadow-sm pb-2 pt-safe-top">
             <div className="flex justify-between items-center px-4 py-2">
                 <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="font-display font-bold text-lg text-rosegold">
                    Dr. Smita Patil
                 </a>
                 <div className="flex gap-4">
                    <button onClick={onOpenWishlist} className="relative p-1 text-charcoal">
                        <Heart size={22} strokeWidth={1.5} className={wishlistCount > 0 ? "fill-rosegold text-rosegold" : ""} />
                        {wishlistCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-rosegold rounded-full" />
                        )}
                    </button>
                 </div>
             </div>

             {/* Slim Search Bar */}
             <div className="px-4 relative">
                <div className="relative">
                   <input 
                     type="text" 
                     placeholder="Search..." 
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full bg-porcelain border border-gray-100 rounded-full py-2 pl-9 pr-12 text-sm focus:outline-none focus:border-rosegold/50 focus:bg-white transition-colors placeholder-gray-400 text-charcoal h-9"
                   />
                   <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                   
                   {searchQuery ? (
                     <button onClick={() => setSearchQuery('')} className="absolute right-3 top-2.5 text-gray-400">
                       <X size={16} />
                     </button>
                   ) : (
                     <div className="absolute right-3 top-2.5 flex gap-2 text-gray-400">
                        <Mic size={16} />
                     </div>
                   )}
                </div>

                {/* Results Dropdown */}
                <AnimatePresence>
                  {searchQuery.length > 1 && (
                     <motion.div 
                       initial={{ opacity: 0, y: -5 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: -5 }}
                       className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden max-h-[50vh] overflow-y-auto z-[60]"
                     >
                        {searchResults.length === 0 ? (
                           <div className="p-4 text-center text-gray-400 text-xs">No products found</div>
                        ) : (
                           searchResults.map(product => (
                             <div 
                               key={product.id}
                               onClick={() => {
                                 onQuickView(product);
                                 setSearchQuery('');
                               }}
                               className="flex gap-3 p-3 border-b border-gray-50 active:bg-gray-50 transition-colors last:border-0"
                             >
                                <img src={product.image} className="w-10 h-10 object-cover rounded bg-gray-100" />
                                <div>
                                   <h4 className="font-bold text-xs text-charcoal">{product.name}</h4>
                                   <p className="text-[10px] text-rosegold font-bold">₹{product.price}</p>
                                </div>
                             </div>
                           ))
                        )}
                     </motion.div>
                  )}
                </AnimatePresence>
             </div>
          </div>

          {/* Simple Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-gray-100 pb-safe-bottom h-[60px] flex items-center justify-around shadow-[0_-4px_10px_-4px_rgba(0,0,0,0.1)]">
             {mobileNavItems.map((item) => {
                 const isActive = currentPage === item.id || (item.id === 'account' && currentPage === 'account'); 
                 const Icon = item.icon;
                 
                 return (
                     <button
                        key={item.id}
                        onClick={() => item.action ? item.action() : onNavigate(item.id)}
                        className="flex-1 flex flex-col items-center justify-center h-full gap-1 active:scale-95 transition-transform"
                     >
                        <div className={`relative p-1 rounded-xl transition-colors ${isActive ? 'text-rosegold' : 'text-gray-400'}`}>
                            <Icon 
                                size={22} 
                                strokeWidth={isActive ? 2.5 : 2}
                                className="transition-all"
                            />
                            {item.badge && item.badge > 0 && (
                                <span className="absolute -top-1 -right-1 bg-deeprose text-white text-[9px] font-bold min-w-[14px] h-[14px] flex items-center justify-center rounded-full border border-white">
                                    {item.badge}
                                </span>
                            )}
                        </div>
                        
                        <span className={`text-[9px] font-bold transition-colors ${isActive ? 'text-charcoal' : 'text-gray-400'}`}>
                            {item.label}
                        </span>
                     </button>
                 );
             })}
          </div>
      </div>
      
      <style>{`
        .pt-safe-top {
          padding-top: max(env(safe-area-inset-top), 0px);
        }
        .pb-safe-bottom {
          padding-bottom: max(env(safe-area-inset-bottom), 0px);
        }
      `}</style>
    </>
  );
};

export default Navbar;