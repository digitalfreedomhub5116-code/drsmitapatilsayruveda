import { Product, Ingredient, Category, SiteContent } from './types';

// Using a placeholder that resembles the provided jar image
export const PRODUCT_IMAGE_URL = "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop"; 

export const MAIN_PRODUCT: Product = {
  id: 'mm-001',
  name: 'Multani Mitti',
  subtitle: 'Dr. Smita Patil\'s Ayurveda',
  price: 499,
  description: [
    'Deep Cleansing & Oil Control',
    'Brightens Skin Tone',
    'Cooling & Soothing',
    'Removes Tan & Impurities',
    'Promotes Radiant Glow'
  ],
  image: PRODUCT_IMAGE_URL
};

export const INGREDIENTS: Ingredient[] = [
  {
    id: 'ing-1',
    name: 'Multani Mitti',
    benefit: 'Absorbs excess oil and removes deep-seated impurities.',
    position: { top: '30%', left: '20%' }
  },
  {
    id: 'ing-2',
    name: 'Dried Rose Petals',
    benefit: 'Natural toner that hydrates and adds a soft glow.',
    position: { top: '60%', left: '80%' }
  }
];

export const HERO_PHRASES = [
  "Ancient Wisdom, Modern Glow",
  "100% Organic Rose Petals",
  "The Secret to Radiant Skin"
];

export const HERO_IMAGES = [
  PRODUCT_IMAGE_URL,
  'https://images.unsplash.com/photo-1612817288484-96916a0816a9?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop'
];

export const CATEGORIES: Category[] = [
  {
    id: 'cat-hair',
    title: 'Hair Care',
    description: 'Nourish your crown with nature’s finest herbs.',
    image: 'https://images.unsplash.com/photo-1522337360705-8b13d5204369?q=80&w=1000&auto=format&fit=crop', // Hair/Spa image
    products: [
      {
        id: 'hc-1',
        name: 'Healthy Hair Heena Powder',
        subtitle: 'Natural Conditioning',
        price: 299,
        description: ['Promotes growth', 'Natural cooling', 'Rich color'],
        image: 'https://images.unsplash.com/photo-1590156546946-ce55a12a6a5d?q=80&w=1000&auto=format&fit=crop' // Powder/Bowl
      },
      {
        id: 'hc-2',
        name: 'Anti Dandruff Oil',
        subtitle: 'Scalp Therapy',
        price: 499,
        description: ['Eliminates dandruff', 'Soothes itchiness', 'Strengthens roots'],
        image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?q=80&w=1000&auto=format&fit=crop' // Oil bottle
      }
    ]
  },
  {
    id: 'cat-skin',
    title: 'Skin Care',
    description: 'Radiant, breathing skin with organic purity.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000&auto=format&fit=crop', // Skincare setup
    products: [
      {
        id: 'sc-1',
        name: 'Aloe Vera Gel with Tulsi',
        subtitle: 'Hydrating & Healing',
        price: 349,
        description: ['Soothes inflammation', 'Hydrates deeply', 'Antibacterial'],
        image: 'https://images.unsplash.com/photo-1615396899839-c99c121888b0?q=80&w=1000&auto=format&fit=crop' // Aloe
      },
      {
        id: 'sc-2',
        name: 'Aloe Vera Powder',
        subtitle: 'Pure Extract',
        price: 199,
        description: ['Versatile mix', 'Rich in vitamins', 'Detoxifying'],
        image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=1000&auto=format&fit=crop' // Green Powder
      },
      {
        id: 'sc-3',
        name: 'Body Scrub Ubtan',
        subtitle: 'Traditional Exfoliation',
        price: 399,
        description: ['Removes dead skin', 'Brightens complexion', 'Softens texture'],
        image: 'https://images.unsplash.com/photo-1601055903647-87e16f36d217?q=80&w=1000&auto=format&fit=crop' // Ubtan
      },
      {
        id: 'sc-4',
        name: 'Multani Mitti with Rose Petal',
        subtitle: 'Signature Blend',
        price: 499,
        description: ['Oil control', 'Cooling effect', 'Natural glow'],
        image: PRODUCT_IMAGE_URL
      }
    ]
  },
  {
    id: 'cat-veg',
    title: 'Veggies Powder',
    description: 'Concentrated nutrition for health and beauty.',
    image: 'https://images.unsplash.com/photo-1615485925763-86786278078a?q=80&w=1000&auto=format&fit=crop', // Spices/Powders
    products: [
      {
        id: 'vp-1',
        name: 'Beetroot Powder',
        subtitle: 'Natural Blush',
        price: 249,
        description: ['Rich in iron', 'Natural coloring', 'Antioxidant boost'],
        image: 'https://images.unsplash.com/photo-1601386629988-6644d6db5288?q=80&w=1000&auto=format&fit=crop' // Red powder
      },
      {
        id: 'vp-2',
        name: 'Onion Powder',
        subtitle: 'Hair Regrowth',
        price: 249,
        description: ['Sulfur rich', 'Boosts collagen', 'Prevents breakage'],
        image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?q=80&w=1000&auto=format&fit=crop' // Onion
      },
      {
        id: 'vp-3',
        name: 'Carrot Powder',
        subtitle: 'Vitamin A Boost',
        price: 249,
        description: ['Sun protection', 'Anti-aging', 'Skin repair'],
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1000&auto=format&fit=crop' // Carrot
      },
      {
        id: 'vp-4',
        name: 'Tomato Powder',
        subtitle: 'Tan Removal',
        price: 249,
        description: ['Brightening', 'Pore tightening', 'Oil balance'],
        image: 'https://images.unsplash.com/photo-1606923829571-0f26364996e3?q=80&w=1000&auto=format&fit=crop' // Tomato
      }
    ]
  },
  {
    id: 'cat-gen',
    title: 'General Care',
    description: 'Holistic wellness for daily vitality.',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1000&auto=format&fit=crop', // Medicine/Herbs
    products: [
      {
        id: 'gc-1',
        name: 'Virechak Vati',
        subtitle: 'Digestive Health',
        price: 199,
        description: ['Detoxification', 'Relieves constipation', 'Improves digestion'],
        image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1000&auto=format&fit=crop' // Pills
      },
      {
        id: 'gc-2',
        name: 'Diabom',
        subtitle: 'Blood Sugar Support',
        price: 599,
        description: ['Regulates sugar', 'Boosts immunity', 'Natural ingredients'],
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000&auto=format&fit=crop' // Bottle
      }
    ]
  }
];

export const DEFAULT_SITE_CONTENT: SiteContent = {
  brandLogos: ["Vogue", "Elle", "Harper's Bazaar", "Femina", "Ayurveda Today", "Organic Life"],
  about: {
    image: "https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=2070&auto=format&fit=crop",
    badgeVal: "15+",
    badgeLabel: "Years of Healing",
    tag: "The Vision",
    title: "Bridging Ancient Wisdom & Modern Science",
    highlight: "Ancient Wisdom",
    p1: "\"Ayurveda is not just about herbs; it is about harmony. For over 15 years, I have dedicated my life to decoding the ancient texts to create formulations that work for the modern lifestyle.\"",
    p2: "Every jar that leaves our clinic is hand-blended, mantra-infused, and chemically tested to ensure purity. We believe in slow beauty—skincare that takes its time to work, but stays forever."
  },
  process: {
    title: "The Ritual",
    desc: "Four simple steps to eternal radiance, crafted for your evening calm.",
    steps: [
      { title: "Cleanse", desc: "Remove impurities with our gentle earth-based cleanser." },
      { title: "Activate", desc: "Mix the powder with rose water to activate the botanicals." },
      { title: "Apply", desc: "Apply a thin layer and let the cooling sensation take over." },
      { title: "Glow", desc: "Rinse to reveal skin that breathes, shines, and smiles." }
    ]
  },
  stats: [
    { label: "Happy Clients", val: "10k+" },
    { label: "Years Experience", val: "15+" },
    { label: "Natural Ingredients", val: "100%" },
    { label: "Cities Reached", val: "50+" },
  ],
  testimonials: [
    { text: "I have tried everything for my acne, but nothing worked like Dr. Smita's Multani Mitti. It's magic in a jar!", name: "Priya Sharma", loc: "Mumbai" },
    { text: "The texture is so fine and the rose fragrance is divine. My skin feels so tight and bright after just one use.", name: "Anjali Gupta", loc: "Delhi" },
    { text: "Finally an authentic Ayurvedic brand that I can trust. The packaging is beautiful and the product is pure gold.", name: "Sarah Jenkins", loc: "London" }
  ],
  faqs: [
    { q: "Is this suitable for sensitive skin?", a: "Yes! Our formula is dermatologist tested and uses cooling ingredients specifically designed to soothe sensitive skin types. However, we always recommend a patch test behind the ear." },
    { q: "How often should I use it?", a: "For best results, we recommend using the pack 2-3 times a week as part of your evening routine. Consistency is key to Ayurveda." },
    { q: "Are the ingredients 100% organic?", a: "Absolutely. We source our Multani Mitti from specific mineral-rich regions in Rajasthan and our roses from Kannauj. No synthetics, ever." },
    { q: "What is the shelf life?", a: "Since we use no artificial preservatives, the shelf life is 12 months from the date of manufacturing when kept in a cool, dry place." },
  ],
  cta: {
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop",
    title: "Ready to Glow?",
    highlight: "Glow?",
    text: "Join thousands who have rediscovered their natural radiance. First order? Get 10% OFF with code WELCOME10."
  }
};