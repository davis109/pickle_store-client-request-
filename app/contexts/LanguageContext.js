'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the language context
export const LanguageContext = createContext();

// Translations object
export const translations = {
  english: {
    // Navbar
    home: 'Home',
    products: 'Products',
    about: 'About',
    contact: 'Contact',
    
    // Hero section
    tagline1: 'Pure Food',
    tagline2: 'Perfect Taste',
    premiumPickles: 'Premium handcrafted pickles with no preservatives, no artificial colors, and no chemical taste enhancers',
    ourProducts: 'Our Products',
    contactUs: 'Contact Us',
    
    // Features
    noPreservatives: 'No Chemical Preservatives',
    naturalPreservation: '100% natural preservation methods',
    noColors: 'No Artificial Color',
    naturalColors: 'Only natural colors from ingredients',
    noTasteEnhancers: 'No Taste Enhancers',
    authenticFlavors: 'Authentic flavors from premium spices',
    noOil: 'No Oil',
    healthier: 'Healthier alternative to traditional pickles',
    
    // Featured Products
    premiumPicklesHeading: 'Our Premium Pickles',
    handcrafted: 'Handcrafted with love using traditional recipes and the finest ingredients. No preservatives, no artificial colors, just pure authentic taste.',
    viewDetails: 'View Details',
    viewAllProducts: 'View All Products',
    featuredProducts: 'Featured Products',
    allProducts: 'All Products',
    pickles: 'Pickles',
    powders: 'Powders',
    pastes: 'Pastes',
    inquireNow: 'Inquire Now',
    
    // About Section
    aboutHeading: 'About Bhatramane Foods',
    learnMore: 'Learn More About Us',
    
    // Contact Section
    sendMessage: 'Send us a message',
    yourName: 'Your Name',
    emailAddress: 'Email Address',
    phoneNumber: 'Phone Number',
    yourMessage: 'Your Message',
    send: 'Send Message',
    phone: 'Phone',
    phoneHours: 'Mon-Sat, 9:00 AM - 6:00 PM',
    email: 'Email',
    emailResponse: 'We respond within 24 hours',
    whatsapp: 'WhatsApp',
    whatsappResponse: 'Quick responses via WhatsApp',
    address: 'Address',
    officeAddress: 'Bhatramane Foods, Saravu, Kasaragod, Kerala - 671124',
    
    // Footer
    quickLinks: 'Quick Links',
    allRightsReserved: 'All rights reserved.',
  },
  kannada: {
    // Navbar
    home: 'ಮುಖಪುಟ',
    products: 'ಉತ್ಪನ್ನಗಳು',
    about: 'ನಮ್ಮ ಬಗ್ಗೆ',
    contact: 'ಸಂಪರ್ಕಿಸಿ',
    
    // Hero section
    tagline1: 'ಪರಿಶುದ್ಧ ಆಹಾರ',
    tagline2: 'ಪರಿಪೂರ್ಣ ರುಚಿ',
    premiumPickles: 'ಯಾವುದೇ ರಾಸಾಯನಿಕ ಸಂರಕ್ಷಕಗಳು, ಕೃತಕ ಬಣ್ಣ ಮತ್ತು ರುಚಿ ಹೆಚ್ಚಿಸುವಿಕೆಗಳಿಲ್ಲದ ಪ್ರೀಮಿಯಂ ಉಪ್ಪಿನಕಾಯಿಗಳು',
    ourProducts: 'ನಮ್ಮ ಉತ್ಪನ್ನಗಳು',
    contactUs: 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ',
    
    // Features
    noPreservatives: 'ರಾಸಾಯನಿಕ ಸಂರಕ್ಷಕಗಳಿಲ್ಲ',
    naturalPreservation: '100% ನೈಸರ್ಗಿಕ ಸಂರಕ್ಷಣಾ ವಿಧಾನಗಳು',
    noColors: 'ಕೃತಕ ಬಣ್ಣವಿಲ್ಲ',
    naturalColors: 'ಕೇವಲ ಪದಾರ್ಥಗಳಿಂದ ನೈಸರ್ಗಿಕ ಬಣ್ಣಗಳು',
    noTasteEnhancers: 'ರುಚಿ ಹೆಚ್ಚಿಸುವಿಕೆಗಳಿಲ್ಲ',
    authenticFlavors: 'ಪ್ರೀಮಿಯಂ ಮಸಾಲೆಗಳಿಂದ ಅಸಲಿ ರುಚಿಗಳು',
    noOil: 'ಎಣ್ಣೆ ಇಲ್ಲ',
    healthier: 'ಸಾಂಪ್ರದಾಯಿಕ ಉಪ್ಪಿನಕಾಯಿಗಳಿಗೆ ಆರೋಗ್ಯಕರ ಪರ್ಯಾಯ',
    
    // Featured Products
    premiumPicklesHeading: 'ನಮ್ಮ ಪ್ರೀಮಿಯಂ ಉಪ್ಪಿನಕಾಯಿಗಳು',
    handcrafted: 'ಸಾಂಪ್ರದಾಯಿಕ ರೆಸಿಪಿಗಳು ಮತ್ತು ಉತ್ತಮ ಪದಾರ್ಥಗಳನ್ನು ಬಳಸಿ ಪ್ರೀತಿಯಿಂದ ಕೈಮಾಡಿದ. ಯಾವುದೇ ಸಂರಕ್ಷಕಗಳು, ಕೃತಕ ಬಣ್ಣಗಳಿಲ್ಲ, ಕೇವಲ ಶುದ್ಧ ಸಹಜ ರುಚಿ.',
    viewDetails: 'ಹೆಚ್ಚಿನ ಮಾಹಿತಿ ನೋಡಿ',
    viewAllProducts: 'ಎಲ್ಲಾ ಉತ್ಪನ್ನಗಳನ್ನು ನೋಡಿ',
    featuredProducts: 'ಪ್ರಮುಖ ಉತ್ಪನ್ನಗಳು',
    allProducts: 'ಎಲ್ಲಾ ಉತ್ಪನ್ನಗಳು',
    pickles: 'ಉಪ್ಪಿನಕಾಯಿಗಳು',
    powders: 'ಪುಡಿಗಳು',
    pastes: 'ಪೇಸ್ಟ್‌ಗಳು',
    inquireNow: 'ಈಗ ವಿಚಾರಿಸಿ',
    
    // About Section
    aboutHeading: 'ಭಟ್ರಮನೆ ಫುಡ್ಸ್ ಬಗ್ಗೆ',
    learnMore: 'ನಮ್ಮ ಬಗ್ಗೆ ಹೆಚ್ಚು ತಿಳಿಯಿರಿ',
    
    // Contact Section
    sendMessage: 'ನಮಗೆ ಸಂದೇಶವನ್ನು ಕಳುಹಿಸಿ',
    yourName: 'ನಿಮ್ಮ ಹೆಸರು',
    emailAddress: 'ಇಮೇಲ್ ವಿಳಾಸ',
    phoneNumber: 'ಫೋನ್ ನಂಬರ್',
    yourMessage: 'ನಿಮ್ಮ ಸಂದೇಶ',
    send: 'ಸಂದೇಶ ಕಳುಹಿಸಿ',
    phone: 'ಫೋನ್',
    phoneHours: 'ಸೋಮ-ಶನಿ, ಬೆಳಗ್ಗೆ 9:00 - ಸಂಜೆ 6:00',
    email: 'ಇಮೇಲ್',
    emailResponse: 'ನಾವು 24 ಗಂಟೆಗಳೊಳಗೆ ಪ್ರತಿಕ್ರಿಯಿಸುತ್ತೇವೆ',
    whatsapp: 'ವಾಟ್ಸಾಪ್',
    whatsappResponse: 'ವಾಟ್ಸಾಪ್ ಮೂಲಕ ತ್ವರಿತ ಪ್ರತಿಕ್ರಿಯೆಗಳು',
    address: 'ವಿಳಾಸ',
    officeAddress: 'ಭಟ್ರಮನೆ ಫುಡ್ಸ್, ಸಾರವು, ಕಾಸರಗೋಡು, ಕೇರಳ - 671124',
    
    // Footer
    quickLinks: 'ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು',
    allRightsReserved: 'ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.',
  }
};

// Language provider component
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('english');
  
  const toggleLanguage = () => {
    const newLanguage = language === 'english' ? 'kannada' : 'english';
    setLanguage(newLanguage);
    localStorage.setItem('preferredLanguage', newLanguage);
  };
  
  // Load saved language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && (savedLanguage === 'english' || savedLanguage === 'kannada')) {
      setLanguage(savedLanguage);
    }
  }, []);
  
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 