import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Lock } from 'lucide-react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import CategoriesSection from './components/CategoriesSection';
import AllProductsSection from './components/AllProductsSection';
import ShopPage from './components/ShopPage';
import ContactPage from './components/ContactPage';
import OurStoryPage from './components/OurStoryPage'; // New Import
import CategoryModal from './components/CategoryModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import PaymentModal from './components/PaymentModal';
import AuthModal from './components/AuthModal';
import ProfileModal from './components/ProfileModal';
import AdminPanel from './components/AdminPanel';
import QuickViewModal from './components/QuickViewModal';
import ShareModal from './components/ShareModal';
import MarqueeSection from './components/MarqueeSection'; // New Import
import { DataProvider, useData } from './contexts/DataContext';
import { 
  ProcessSection, 
  TestimonialsSection, 
  FaqSection
} from './components/ExtraSections';
import { MAIN_PRODUCT } from './constants';
import { CartItem, User, Category, Product } from './types';

// Inner component to use DataContext
const MainApp = () => {
  const [loading, setLoading] = useState(true);
  const { updateUserRecord } = useData();
  
  // App State - Added 'story'
  const [view, setView] = useState<'home' | 'shop' | 'admin' | 'contact' | 'story'>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  
  // UI Modal States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNewLogin, setIsNewLogin] = useState(false); 
  const [pendingCheckout, setPendingCheckout] = useState(false);
  
  // Share State
  const [shareProduct, setShareProduct] = useState<Product | null>(null);

  // Global Parallax State
  const containerRef = useRef(null);

  const addToCart = (product: Product = MAIN_PRODUCT, openDrawer = true) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    if (openDrawer) setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
        if (prev.some(p => p.id === product.id)) {
            return prev.filter(p => p.id !== product.id);
        }
        return [...prev, product];
    });
  };

  const handleShare = (product: Product) => {
    setShareProduct(product);
  };

  const handleCheckout = () => {
    setIsCartOpen(false); 
    if (user) {
      // STRICT CHECK: User must have name AND address to proceed
      if (user.name && user.address) {
        setIsPaymentOpen(true);
      } else {
        setPendingCheckout(true);
        setIsProfileOpen(true);
      }
    } else {
      setPendingCheckout(true);
      setIsAuthOpen(true);
    }
  };

  const handleBuyNow = (product: Product) => {
    addToCart(product, false);
    handleCheckout();
  };

  const handleAuthSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    setIsAuthOpen(false);
    
    if (pendingCheckout) {
        // In checkout flow, strictly require details
        if (!loggedInUser.name || !loggedInUser.address) {
            setIsNewLogin(!loggedInUser.name); // Show welcome only if it's a fresh user without name
            setIsProfileOpen(true);
        } else {
            setPendingCheckout(false);
            setIsPaymentOpen(true);
        }
        return;
    }
    
    // Normal Login Flow
    if (!loggedInUser.name) {
        setIsNewLogin(true);
        setIsProfileOpen(true);
    }
  };

  const handleProfileSave = (updatedUser: User) => {
    setUser(updatedUser);
    // Important: Update the central registry so Admin Panel sees changes
    updateUserRecord(updatedUser);
    
    setIsProfileOpen(false);
    setIsNewLogin(false);
    
    // If we were waiting to checkout, proceed now that we have details
    if (pendingCheckout) {
      setPendingCheckout(false);
      setIsPaymentOpen(true);
    }
  };

  const handleProfileClose = () => {
    setIsProfileOpen(false);
    setIsNewLogin(false);
    
    // If closed without saving during checkout, ABORT the checkout.
    // Do NOT open payment modal.
    if (pendingCheckout) {
      setPendingCheckout(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]); 
    setWishlist([]);
    setIsProfileOpen(false);
  };

  // Called when payment succeeds in PaymentModal
  const handlePaymentSuccess = () => {
    if (user) {
       // Extract all product IDs from the current cart
       const newPurchasedIds = cart.map(item => item.id);
       
       // Update user history (merge with existing)
       const updatedUser: User = {
          ...user,
          purchasedProductIds: [
            ...(user.purchasedProductIds || []),
            ...newPurchasedIds
          ]
          // Filter duplicates could be done, but simple array spread is fine for demo logic
       };
       
       setUser(updatedUser);
       updateUserRecord(updatedUser);
    }
    setCart([]);
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (view === 'admin') {
    return <AdminPanel onExit={() => setView('home')} />;
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-porcelain selection:bg-rosegold selection:text-white pb-[70px] md:pb-0">
      <LoadingScreen onComplete={() => setLoading(false)} />

      {!loading && (
        <>
          {/* Navbar moved OUTSIDE the animated div to ensure 'fixed' positioning works correctly relative to viewport */}
          <Navbar 
            cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
            onOpenCart={() => setIsCartOpen(true)}
            wishlistCount={wishlist.length}
            onOpenWishlist={() => setIsWishlistOpen(true)}
            user={user}
            onLoginClick={() => setIsAuthOpen(true)}
            onLogoutClick={handleLogout}
            onOpenProfile={() => setIsProfileOpen(true)}
            onNavigate={(page) => setView(page as any)}
            currentPage={view}
            onQuickView={setQuickViewProduct}
          />

          <div className="animate-in fade-in duration-1000">
            <main>
              {view === 'home' && (
                <>
                  <div className="relative">
                    <Hero onAddToCart={() => addToCart(MAIN_PRODUCT)} />
                  </div>
                  
                  {/* New Marquee Section */}
                  <MarqueeSection />

                  <CategoriesSection onCategoryClick={setSelectedCategory} />
                  
                  <FeaturedProducts 
                    onAddToCart={addToCart}
                    onQuickView={setQuickViewProduct}
                    wishlist={wishlist}
                    onToggleWishlist={toggleWishlist}
                    onBuyNow={handleBuyNow}
                    onShare={handleShare}
                  />

                  <ProcessSection />
                  <TestimonialsSection />
                  <FaqSection />
                </>
              )}

              {view === 'shop' && (
                <ShopPage 
                  onCategoryClick={setSelectedCategory}
                  onAddToCart={addToCart}
                  onQuickView={setQuickViewProduct}
                  onNavigateHome={() => setView('home')}
                  wishlist={wishlist}
                  onToggleWishlist={toggleWishlist}
                  onBuyNow={handleBuyNow}
                  onShare={handleShare}
                />
              )}

              {view === 'story' && (
                <OurStoryPage onNavigateHome={() => setView('home')} />
              )}

              {view === 'contact' && (
                <ContactPage onNavigateHome={() => setView('home')} />
              )}
              
              <footer id="contact" className="bg-charcoal text-white py-16 scroll-mt-20">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12 mb-12">
                  <div className="col-span-1 md:col-span-2">
                    <h3 className="font-display text-2xl text-gold mb-6">Dr. Smita Patil</h3>
                    <p className="font-sans text-gray-400 max-w-sm leading-relaxed">
                      Authentic Ayurvedic formulations crafted with love, science, and ancient wisdom. Experience the purity of nature.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-serif text-lg mb-6">Shop</h4>
                    <ul className="space-y-4 font-sans text-sm text-gray-400">
                      <li><button onClick={() => setView('shop')} className="hover:text-gold transition-colors text-left">All Products</button></li>
                      <li><a href="#" className="hover:text-gold transition-colors">Multani Mitti</a></li>
                      <li><a href="#" className="hover:text-gold transition-colors">Face Oils</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-serif text-lg mb-6">Support</h4>
                    <ul className="space-y-4 font-sans text-sm text-gray-400">
                      <li><button onClick={() => setView('contact')} className="hover:text-gold transition-colors">Contact Us</button></li>
                      <li><button onClick={() => setView('story')} className="hover:text-gold transition-colors">Our Story</button></li>
                      <li><a href="#" className="hover:text-gold transition-colors">Shipping Policy</a></li>
                      <li><button onClick={() => setView('admin')} className="hover:text-gold transition-colors flex items-center gap-2"><Lock size={12} /> Admin Access</button></li>
                    </ul>
                  </div>
                </div>
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-sans uppercase tracking-wider">
                  <p>&copy; 2024 Dr. Smita Patil Ayurveda. All rights reserved.</p>
                  <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white">Instagram</a>
                    <a href="#" className="hover:text-white">Facebook</a>
                  </div>
                </div>
              </footer>
            </main>

            <CartDrawer 
              isOpen={isCartOpen} 
              onClose={() => setIsCartOpen(false)}
              cart={cart}
              onRemove={removeFromCart}
              onCheckout={handleCheckout}
            />

            <WishlistDrawer 
              isOpen={isWishlistOpen}
              onClose={() => setIsWishlistOpen(false)}
              wishlist={wishlist}
              onRemove={(id) => setWishlist(prev => prev.filter(p => p.id !== id))}
              onAddToCart={addToCart}
              onBuyNow={handleBuyNow}
            />

            <CategoryModal 
              category={selectedCategory} 
              onClose={() => setSelectedCategory(null)} 
              onAddToCart={addToCart}
              onQuickView={setQuickViewProduct}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
              onNavigateHome={() => {
                  setSelectedCategory(null);
                  setView('home');
              }}
              onBuyNow={handleBuyNow}
              onShare={handleShare}
            />

            <QuickViewModal 
              product={quickViewProduct}
              onClose={() => setQuickViewProduct(null)}
              onAddToCart={addToCart}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
              onBuyNow={handleBuyNow}
              onShare={handleShare}
              user={user}
              onLogin={() => setIsAuthOpen(true)}
            />

            <AuthModal 
              isOpen={isAuthOpen}
              onClose={() => {
                setIsAuthOpen(false);
                setPendingCheckout(false);
              }}
              onSuccess={handleAuthSuccess}
            />

            <ProfileModal 
              isOpen={isProfileOpen}
              user={user}
              onClose={handleProfileClose}
              onSave={handleProfileSave}
              isNewLogin={isNewLogin}
              forceCompletion={pendingCheckout}
            />

            <PaymentModal 
              isOpen={isPaymentOpen}
              onClose={() => setIsPaymentOpen(false)}
              amount={cartTotal}
              onPaymentSuccess={handlePaymentSuccess}
            />

            <ShareModal 
              product={shareProduct}
              onClose={() => setShareProduct(null)}
            />
          </div>
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <DataProvider>
      <MainApp />
    </DataProvider>
  );
}

export default App;