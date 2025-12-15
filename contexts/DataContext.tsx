import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { HERO_PHRASES, CATEGORIES, MAIN_PRODUCT, HERO_IMAGES as DEFAULT_HERO_IMAGES, DEFAULT_SITE_CONTENT } from '../constants';
import { Category, Product, SiteContent, User } from '../types';

// Define the shape of our CMS data
interface DataContextType {
  heroPhrases: string[];
  updateHeroPhrases: (phrases: string[]) => void;
  heroImages: string[];
  updateHeroImages: (images: string[]) => void;
  categories: Category[];
  updateCategories: (categories: Category[]) => void;
  deleteProduct: (catId: string, prodId: string) => void;
  siteContent: SiteContent;
  updateSiteContent: (content: SiteContent) => void;
  // User Management
  registeredUsers: User[];
  registerUser: (user: User) => void;
  updateUserRecord: (user: User) => void;
  deleteUserRecord: (userId: string) => void;
  resetToDefaults: () => void;
}

// Fallback images if not in constants (handling the previous file structure)
const INITIAL_HERO_IMAGES = [
  MAIN_PRODUCT.image,
  "https://images.unsplash.com/photo-1612817288484-96916a0816a9?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop"
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from LocalStorage or fall back to Constants
  const [heroPhrases, setHeroPhrases] = useState<string[]>(() => {
    const saved = localStorage.getItem('site_hero_phrases');
    return saved ? JSON.parse(saved) : HERO_PHRASES;
  });

  const [heroImages, setHeroImages] = useState<string[]>(() => {
    const saved = localStorage.getItem('site_hero_images');
    return saved ? JSON.parse(saved) : INITIAL_HERO_IMAGES;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('site_categories');
    return saved ? JSON.parse(saved) : CATEGORIES;
  });

  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    const saved = localStorage.getItem('site_content_full');
    return saved ? JSON.parse(saved) : DEFAULT_SITE_CONTENT;
  });

  const [registeredUsers, setRegisteredUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('site_users');
    return saved ? JSON.parse(saved) : [];
  });

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('site_hero_phrases', JSON.stringify(heroPhrases));
  }, [heroPhrases]);

  useEffect(() => {
    localStorage.setItem('site_hero_images', JSON.stringify(heroImages));
  }, [heroImages]);

  useEffect(() => {
    localStorage.setItem('site_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('site_content_full', JSON.stringify(siteContent));
  }, [siteContent]);

  useEffect(() => {
    localStorage.setItem('site_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  const updateHeroPhrases = (phrases: string[]) => setHeroPhrases(phrases);
  const updateHeroImages = (images: string[]) => setHeroImages(images);
  const updateCategories = (cats: Category[]) => setCategories(cats);
  
  const deleteProduct = (catId: string, prodId: string) => {
    setCategories(prevCats => {
      return prevCats.map(cat => {
        if (cat.id !== catId) return cat;
        return {
          ...cat,
          products: cat.products.filter(p => p.id !== prodId)
        };
      });
    });
  };

  const updateSiteContent = (content: SiteContent) => setSiteContent(content);
  
  // User Actions
  const registerUser = (user: User) => {
    setRegisteredUsers(prev => {
      // Check duplicate by phone number to be safe
      if (prev.some(u => u.phoneNumber === user.phoneNumber)) return prev;
      return [...prev, user];
    });
  };

  const updateUserRecord = (updatedUser: User) => {
    setRegisteredUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
  };

  const deleteUserRecord = (userId: string) => {
    setRegisteredUsers(prev => prev.filter(u => u.id !== userId));
  };
  
  const resetToDefaults = () => {
    if(window.confirm("Are you sure? This will wipe all your custom changes.")) {
        setHeroPhrases(HERO_PHRASES);
        setHeroImages(INITIAL_HERO_IMAGES);
        setCategories(CATEGORIES);
        setSiteContent(DEFAULT_SITE_CONTENT);
        // We usually don't wipe users on CMS reset, but if requested:
        // setRegisteredUsers([]); 
        localStorage.clear();
        window.location.reload();
    }
  };

  return (
    <DataContext.Provider value={{ 
      heroPhrases, updateHeroPhrases, 
      heroImages, updateHeroImages,
      categories, updateCategories,
      deleteProduct,
      siteContent, updateSiteContent,
      registeredUsers, registerUser, updateUserRecord, deleteUserRecord,
      resetToDefaults
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};