'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

// Product data
const products = [
  {
    id: 1,
    name: 'Spicy Mango Pickle',
    kannada_name: 'ಖಾರದ ಮಾವಿನಕಾಯಿ ಉಪ್ಪಿನಕಾಯಿ',
    description: 'Traditional spicy mango pickle with a perfect blend of spices that adds flavor to any dish.',
    kannada_description: 'ಯಾವುದೇ ಊಟಕ್ಕೆ ರುಚಿ ಸೇರಿಸುವ ಮಸಾಲೆಗಳ ಸಂಪೂರ್ಣ ಮಿಶ್ರಣದೊಂದಿಗೆ ಸಾಂಪ್ರದಾಯಿಕ ಖಾರದ ಮಾವಿನಕಾಯಿ.',
    image: '/images/product1.jpg',
    ingredients: 'Raw Mango, Red Chili, Salt, Mustard Seeds, Fenugreek, Asafoetida, Turmeric',
    size: '250g',
    category: 'pickle',
    price: '₹180',
    badge: 'Best Seller'
  },
  {
    id: 2,
    name: 'Lemon Pickle (Roasted Masala)',
    kannada_name: 'ನಿಂಬೆ ಉಪ್ಪಿನಕಾಯಿ (ಭರ್ಜಿಸಿದ ಮಸಾಲೆ)',
    description: 'Tangy lemon pickle prepared with special roasted spices blend for enhanced flavor.',
    kannada_description: 'ಹೆಚ್ಚಿನ ರುಚಿಗಾಗಿ ವಿಶೇಷ ಭರ್ಜಿಸಿದ ಮಸಾಲೆ ಮಿಶ್ರಣದೊಂದಿಗೆ ತಯಾರಿಸಿದ ಹುಳಿಯಾದ ನಿಂಬೆ ಉಪ್ಪಿನಕಾಯಿ.',
    image: '/images/product2.jpg',
    ingredients: 'Lemon, Salt, Red Chili, Fenugreek, Mustard, Asafoetida, Turmeric',
    size: '250g',
    category: 'pickle',
    price: '₹160',
    badge: 'Tangy'
  },
  {
    id: 3,
    name: 'Mixed Vegetable Pickle',
    kannada_name: 'ಮಿಶ್ರ ತರಕಾರಿ ಉಪ್ಪಿನಕಾಯಿ',
    description: 'A flavorful mix of seasonal vegetables pickled with aromatic spices and herbs.',
    kannada_description: 'ಸುಗಂಧಿತ ಮಸಾಲೆಗಳು ಮತ್ತು ಸೊಪ್ಪುಗಳೊಂದಿಗೆ ಉಪ್ಪಿನಕಾಯಿ ಮಾಡಿದ ಋತುವಿನ ತರಕಾರಿಗಳ ರುಚಿಕರ ಮಿಶ್ರಣ.',
    image: '/images/product3.jpg',
    ingredients: 'Carrot, Cauliflower, Green Chili, Ginger, Salt, Mustard Oil, Spices',
    size: '250g',
    category: 'pickle',
    price: '₹170',
    badge: 'Popular'
  },
  {
    id: 4,
    name: 'Garlic Pickle',
    kannada_name: 'ಬೆಳ್ಳುಳ್ಳಿ ಉಪ್ಪಿನಕಾಯಿ',
    description: 'Strong and aromatic garlic pickle that enhances the taste of any meal.',
    kannada_description: 'ಯಾವುದೇ ಊಟದ ರುಚಿಯನ್ನು ಹೆಚ್ಚಿಸುವ ಶಕ್ತಿಶಾಲಿ ಮತ್ತು ಸುಗಂಧಿತ ಬೆಳ್ಳುಳ್ಳಿ ಉಪ್ಪಿನಕಾಯಿ.',
    image: '/images/product4.jpg',
    ingredients: 'Garlic, Red Chili, Salt, Mustard Seeds, Fenugreek, Vinegar',
    size: '200g',
    category: 'pickle',
    price: '₹190',
    badge: 'New'
  },
  {
    id: 5,
    name: 'Green Chili Pickle',
    kannada_name: 'ಹಸಿರು ಮೆಣಸಿನಕಾಯಿ ಉಪ್ಪಿನಕಾಯಿ',
    description: 'Spicy green chili pickle for those who love a kick with their meals.',
    kannada_description: 'ತಮ್ಮ ಊಟದೊಂದಿಗೆ ಒಂದು ಕಿಕ್ ಅನ್ನು ಇಷ್ಟಪಡುವವರಿಗೆ ಖಾರವಾದ ಹಸಿರು ಮೆಣಸಿನಕಾಯಿ ಉಪ್ಪಿನಕಾಯಿ.',
    image: '/images/product5.jpg',
    ingredients: 'Green Chili, Salt, Mustard Seeds, Fenugreek, Asafoetida, Fennel Seeds',
    size: '200g',
    category: 'pickle',
    price: '₹150',
    badge: 'Spicy'
  },
  {
    id: 6,
    name: 'Sweet Lime Pickle',
    kannada_name: 'ಸಿಹಿ ಲಿಂಬೆ ಉಪ್ಪಿನಕಾಯಿ',
    description: 'A unique sweet and tangy lime pickle that balances flavor perfectly.',
    kannada_description: 'ರುಚಿಯನ್ನು ಪರಿಪೂರ್ಣವಾಗಿ ಸಮತೋಲನಗೊಳಿಸುವ ವಿಶಿಷ್ಟ ಸಿಹಿ ಮತ್ತು ಹುಳಿಯಾದ ಲಿಂಬೆ ಉಪ್ಪಿನಕಾಯಿ.',
    image: '/images/product6.jpg',
    ingredients: 'Sweet Lime, Sugar, Salt, Red Chili, Mustard Seeds, Spices',
    size: '250g',
    category: 'pickle',
    price: '₹165',
    badge: 'Sweet'
  },
  {
    id: 7,
    name: 'Tomato Pickle',
    kannada_name: 'ಟೊಮೇಟೊ ಉಪ್ಪಿನಕಾಯಿ',
    description: 'Traditional tomato pickle with a perfect balance of tangy, spicy, and sweet notes.',
    kannada_description: 'ಹುಳಿ, ಖಾರ ಮತ್ತು ಸಿಹಿ ಸ್ವರಗಳ ಪರಿಪೂರ್ಣ ಸಮತೋಲನದೊಂದಿಗೆ ಸಾಂಪ್ರದಾಯಿಕ ಟೊಮೇಟೊ ಉಪ್ಪಿನಕಾಯಿ.',
    image: '/images/product7.jpg',
    ingredients: 'Tomato, Salt, Red Chili, Jaggery, Mustard Seeds, Fenugreek, Curry Leaves',
    size: '250g',
    category: 'pickle',
    price: '₹155',
    badge: 'Favorite'
  },
  {
    id: 8,
    name: 'Amla Pickle',
    kannada_name: 'ಅಮ್ಲಾ ಉಪ್ಪಿನಕಾಯಿ',
    description: 'Nutritious gooseberry pickle full of vitamin C and traditional health benefits.',
    kannada_description: 'ವಿಟಮಿನ್ ಸಿ ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ಆರೋಗ್ಯ ಪ್ರಯೋಜನಗಳಿಂದ ತುಂಬಿರುವ ಪೌಷ್ಟಿಕ ನೆಲ್ಲಿಕಾಯಿ ಉಪ್ಪಿನಕಾಯಿ.',
    image: '/images/product8.jpg',
    ingredients: 'Amla (Indian Gooseberry), Salt, Red Chili, Mustard Seeds, Fenugreek, Turmeric',
    size: '200g',
    category: 'pickle',
    price: '₹195',
    badge: 'Healthy'
  },
  {
    id: 9,
    name: 'Raw Tamarind Pickle',
    kannada_name: 'ಕಚ್ಚಾ ಹುಣಸೆ ಉಪ್ಪಿನಕಾಯಿ',
    description: 'Delightful raw tamarind pickle with a perfect sour kick balanced with aromatic spices.',
    kannada_description: 'ಸುಗಂಧಿತ ಮಸಾಲೆಗಳೊಂದಿಗೆ ಸಮತೋಲನಗೊಂಡ ಪರಿಪೂರ್ಣ ಹುಳಿಯಾದ ಕಿಕ್ ಹೊಂದಿರುವ ಮನೋಹರ ಕಚ್ಚಾ ಹುಣಸೆ ಉಪ್ಪಿನಕಾಯಿ.',
    image: '/images/product9.jpg',
    ingredients: 'Raw Tamarind, Salt, Red Chili, Jaggery, Mustard Seeds, Fenugreek',
    size: '200g',
    category: 'pickle',
    price: '₹175',
    badge: 'Sour'
  },
  {
    id: 10,
    name: 'Karande Pickle',
    kannada_name: 'ಕರಂದೆ ಉಪ್ಪಿನಕಾಯಿ',
    description: 'Traditional pickle made with karande (a unique local fruit) and authentic spices.',
    kannada_description: 'ಕರಂದೆ (ಒಂದು ವಿಶಿಷ್ಟ ಸ್ಥಳೀಯ ಹಣ್ಣು) ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ಮಸಾಲೆಗಳೊಂದಿಗೆ ತಯಾರಿಸಿದ ಉಪ್ಪಿನಕಾಯಿ.',
    image: '/images/product10.jpg',
    ingredients: 'Karande, Salt, Red Chili, Fenugreek, Mustard, Asafoetida, Turmeric',
    size: '250g',
    category: 'pickle',
    price: '₹190',
    badge: 'Traditional'
  },
  {
    id: 11,
    name: 'Tender Mango Pickle',
    kannada_name: 'ಮೃದುವಾದ ಮಾವಿನ ಉಪ್ಪಿನಕಾಯಿ',
    description: 'Delicious pickle made with fresh, tender raw mangoes and a special blend of spices.',
    kannada_description: 'ತಾಜಾ, ಮೃದುವಾದ ಕಚ್ಚಾ ಮಾವಿನಕಾಯಿ ಮತ್ತು ವಿಶೇಷ ಮಸಾಲೆ ಮಿಶ್ರಣದಿಂದ ತಯಾರಿಸಿದ ರುಚಿಕರ ಉಪ್ಪಿನಕಾಯಿ.',
    image: '/images/product11.jpg',
    ingredients: 'Tender Mango, Salt, Red Chili, Fenugreek, Mustard, Asafoetida, Turmeric',
    size: '250g',
    category: 'pickle',
    price: '₹185',
    badge: 'Seasonal'
  },
  {
    id: 12,
    name: 'Cut Mango Pickle',
    kannada_name: 'ಕತ್ತರಿಸಿದ ಮಾವಿನ ಉಪ್ಪಿನಕಾಯಿ',
    description: 'Premium pickle made with diced ripe mangoes, carefully prepared with traditional spices.',
    kannada_description: 'ಕತ್ತರಿಸಿದ ಹಣ್ಣಾದ ಮಾವಿನಕಾಯಿಯಿಂದ ತಯಾರಿಸಿದ ಪ್ರೀಮಿಯಂ ಉಪ್ಪಿನಕಾಯಿ, ಸಾಂಪ್ರದಾಯಿಕ ಮಸಾಲೆಗಳೊಂದಿಗೆ ಎಚ್ಚರಿಕೆಯಿಂದ ತಯಾರಿಸಲಾಗಿದೆ.',
    image: '/images/product12.jpg',
    ingredients: 'Cut Mango, Salt, Red Chili, Fenugreek, Mustard, Asafoetida, Turmeric',
    size: '250g',
    category: 'pickle',
    price: '₹180',
    badge: 'Premium'
  },
  {
    id: 13,
    name: 'Ginger Pickle',
    kannada_name: 'ಶುಂಠಿ ಉಪ್ಪಿನಕಾಯಿ',
    description: 'Spicy ginger pickle that adds zing to your meals and has digestive benefits.',
    kannada_description: 'ನಿಮ್ಮ ಊಟಕ್ಕೆ ಜಿಂಗ್ ಸೇರಿಸುವ ಮತ್ತು ಜೀರ್ಣಕ್ರಿಯೆಯ ಪ್ರಯೋಜನಗಳನ್ನು ಹೊಂದಿರುವ ಖಾರದ ಶುಂಠಿ ಉಪ್ಪಿನಕಾಯಿ.',
    image: '/images/product13.jpg',
    ingredients: 'Ginger, Salt, Red Chili, Mustard Seeds, Fenugreek, Vinegar, Lemon Juice',
    size: '200g',
    category: 'pickle',
    price: '₹170',
    badge: 'Digestive'
  },
  {
    id: 14,
    name: 'Brinjal Pickle',
    kannada_name: 'ಬದನೆಕಾಯಿ ಉಪ್ಪಿನಕಾಯಿ',
    description: 'Unique brinjal pickle with a complex flavor profile and aromatic spices.',
    kannada_description: 'ಸಂಕೀರ್ಣ ರುಚಿ ಪ್ರೊಫೈಲ್ ಮತ್ತು ಸುಗಂಧಿತ ಮಸಾಲೆಗಳೊಂದಿಗೆ ಅನನ್ಯ ಬದನೆಕಾಯಿ ಉಪ್ಪಿನಕಾಯಿ.',
    image: '/images/product14.jpg',
    ingredients: 'Brinjal, Salt, Red Chili, Mustard Seeds, Fenugreek, Sesame Oil, Curry Leaves',
    size: '200g',
    category: 'pickle',
    price: '₹175',
    badge: 'Rare'
  },
  {
    id: 15,
    name: 'Red Chili Pickle',
    kannada_name: 'ಕೆಂಪು ಮೆಣಸಿನಕಾಯಿ ಉಪ್ಪಿನಕಾಯಿ',
    description: 'Intensely hot red chili pickle for spice lovers and adventurous palates.',
    kannada_description: 'ಸಾಂಬಾರ ಪ್ರೇಮಿಗಳಿಗೆ ಮತ್ತು ಸಾಹಸಿ ರುಚಿಗಳಿಗಾಗಿ ತೀವ್ರವಾಗಿ ಬಿಸಿಯಾದ ಕೆಂಪು ಮೆಣಸಿನಕಾಯಿ ಉಪ್ಪಿನಕಾಯಿ.',
    image: '/images/product15.jpg',
    ingredients: 'Red Chili, Salt, Mustard Seeds, Fenugreek, Garlic, Vinegar',
    size: '200g',
    category: 'pickle',
    price: '₹160',
    badge: 'Extra Hot'
  },
  {
    id: 16,
    name: 'Bitter Gourd Pickle',
    kannada_name: 'ಹಾಗಲಕಾಯಿ ಉಪ್ಪಿನಕಾಯಿ',
    description: 'Distinctive bitter gourd pickle that transforms bitterness into a delightful taste.',
    kannada_description: 'ಕಹಿಯನ್ನು ಮನೋಹರ ರುಚಿಯಾಗಿ ಪರಿವರ್ತಿಸುವ ವಿಶಿಷ್ಟ ಹಾಗಲಕಾಯಿ ಉಪ್ಪಿನಕಾಯಿ.',
    image: '/images/product16.jpg',
    ingredients: 'Bitter Gourd, Salt, Red Chili, Mustard Seeds, Fenugreek, Jaggery, Spices',
    size: '200g',
    category: 'pickle',
    price: '₹165',
    badge: 'Medicinal'
  },
];

const FeaturedProducts = () => {
  const { language, translations } = useLanguage();
  const t = translations[language];
  const [selectedTab, setSelectedTab] = useState('all');
  const [viewAll, setViewAll] = useState(false);
  
  // Refs for GSAP animations
  const titleRef = useRef(null);
  const tabsRef = useRef(null);
  const productsContainerRef = useRef(null);
  const productsRef = useRef([]);
  
  // Load GSAP plugins
  useEffect(() => {
    const loadGsapPlugins = async () => {
      const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
      gsap.registerPlugin(ScrollTrigger);
      
      // Now that ScrollTrigger is loaded, create animations
      setupAnimations();
    };
    
    loadGsapPlugins();
    
    return () => {
      // Cleanup will happen in the setupAnimations function
    };
  }, []);
  
  // Setup animations in a separate function
  const setupAnimations = () => {
    // Reset refs array when products change
    productsRef.current = productsRef.current.slice(0, products.length);
    
    // Create GSAP animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#products',
        start: 'top 70%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    });
    
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 }
    )
    .fromTo(tabsRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 },
      '-=0.5'
    )
    .fromTo(productsRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.6 },
      '-=0.3'
    );
    
    return () => {
      // Cleanup animation
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  };
  
  // Effect for when selectedTab changes
  useEffect(() => {
    // If ScrollTrigger is already registered, re-run animations
    if (typeof window !== 'undefined' && gsap.plugins && gsap.plugins.ScrollTrigger) {
      setupAnimations();
    }
  }, [selectedTab, viewAll]);

  const filteredProducts = products.filter(product => selectedTab === 'all' || product.category === selectedTab);
  
  // Display only first 8 products if viewAll is false
  const displayedProducts = viewAll ? filteredProducts : filteredProducts.slice(0, 8);

  // Setup background animation
  useEffect(() => {
    const animateBackground = () => {
      gsap.to(".bg-pattern-1", {
        y: 50,
        x: 30,
        rotation: 10,
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      gsap.to(".bg-pattern-2", {
        y: -40,
        x: -20,
        rotation: -5,
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      gsap.to(".bg-pattern-3", {
        y: 30,
        x: -30,
        rotation: 8,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    };
    
    animateBackground();
    
    return () => {
      gsap.killTweensOf(".bg-pattern-1");
      gsap.killTweensOf(".bg-pattern-2");
      gsap.killTweensOf(".bg-pattern-3");
    };
  }, []);

  return (
    <section id="products" className="py-16 relative overflow-hidden">
      {/* Animated background patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-yellow-100 opacity-90 z-0"></div>
      <div className="bg-pattern-1 absolute top-0 left-0 w-96 h-96 rounded-full bg-gradient-to-br from-amber-200/20 to-yellow-200/20 blur-3xl -z-10 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="bg-pattern-2 absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-to-tl from-amber-200/20 to-orange-200/20 blur-3xl -z-10 transform translate-x-1/3 translate-y-1/3"></div>
      <div className="bg-pattern-3 absolute bottom-1/2 left-1/2 w-80 h-80 rounded-full bg-gradient-to-tr from-orange-200/20 to-amber-200/20 blur-3xl -z-10 transform -translate-x-1/2 translate-y-1/4"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-12">
          <div className="relative h-16 w-48 mb-6">
            <Image
              src="/images/company.jpg"
              alt="Bhatramane Logo"
              fill
              style={{ objectFit: 'contain' }}
              className="rounded shadow-md"
            />
          </div>
          
          <h2 
            ref={titleRef} 
            className="text-4xl font-bold text-center text-amber-800 mb-4 relative"
          >
            <span className="absolute -top-6 -left-2 w-12 h-12 rounded-full bg-yellow-200 opacity-70 animate-pulse hidden md:block"></span>
            {t.featuredProducts}
            <span className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-amber-200 opacity-70 animate-pulse hidden md:block" style={{ animationDelay: "0.5s" }}></span>
          </h2>
          
          <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
            Authentic, preservative-free traditional pickles made with love using family recipes
          </p>
          
          <div ref={tabsRef} className="flex flex-wrap justify-center gap-4 mb-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-100/50 to-yellow-100/50 rounded-full blur-xl -z-10"></div>
            <button
              onClick={() => setSelectedTab('all')}
              className={`px-5 py-2 rounded-full transition-all duration-300 ${
                selectedTab === 'all'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-md'
                  : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
              }`}
            >
              {t.allProducts}
            </button>
            <button
              onClick={() => setSelectedTab('pickle')}
              className={`px-5 py-2 rounded-full transition-all duration-300 ${
                selectedTab === 'pickle'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-md'
                  : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
              }`}
            >
              {t.pickles}
            </button>
          </div>
        </div>
        
        <div 
          ref={productsContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {displayedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              ref={el => (productsRef.current[index] = el)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-100"
            >
              <div className="relative h-64 overflow-hidden group">
                <Image
                  src={product.image}
                  alt={language === 'english' ? product.name : product.kannada_name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-700 group-hover:scale-110"
                />
                {product.badge && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {product.badge}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                  <p className="text-white text-sm font-medium">
                    {language === 'english' ? product.ingredients : 'ಮಸಾಲೆಗಳು'}
                  </p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {language === 'english' ? product.name : product.kannada_name}
                </h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-2 h-10">
                  {language === 'english' ? product.description : product.kannada_description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-amber-700 font-bold">{product.price}</span>
                    <span className="text-gray-500 text-xs">{product.size}</span>
                  </div>
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white px-4 py-2 rounded text-sm transition-colors shadow-md"
                  >
                    {t.inquireNow}
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <motion.button
            onClick={() => setViewAll(!viewAll)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-800 hover:to-amber-700 text-white px-8 py-3 rounded-full font-medium transition-all shadow-lg inline-flex items-center gap-2"
          >
            {viewAll ? 'Show Less' : 'View All Products'}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {viewAll ? (
                <path d="M18 15l-6-6-6 6"/>
              ) : (
                <path d="M6 9l6 6 6-6"/>
              )}
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts; 