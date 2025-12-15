export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  description: string[];
  image: string;
}

export interface Ingredient {
  id: string;
  name: string;
  benefit: string;
  position: { top: string; left: string };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  phoneNumber: string;
  name?: string;
  email?: string;
  address?: string;
  profilePic?: string;
  joinedAt?: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  image: string;
  products: Product[];
}

// New Interface for managing all static site content
export interface SiteContent {
  brandLogos: string[];
  about: {
    image: string;
    badgeVal: string;
    badgeLabel: string;
    tag: string;
    title: string;
    highlight: string;
    p1: string;
    p2: string;
  };
  process: {
    title: string;
    desc: string;
    steps: { title: string; desc: string }[];
  };
  stats: { label: string; val: string }[];
  testimonials: { text: string; name: string; loc: string }[];
  faqs: { q: string; a: string }[];
  cta: {
    image: string;
    title: string;
    highlight: string;
    text: string;
  };
}