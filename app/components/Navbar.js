'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaHome, FaShoppingCart, FaInfoCircle, FaBars, FaTimes, FaGlobe, FaPhoneAlt } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { gsap } from 'gsap';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, toggleLanguage, translations } = useLanguage();
  const t = translations[language];

  // Handle scroll event for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Dynamically import ScrollToPlugin
  useEffect(() => {
    const loadScrollToPlugin = async () => {
      const ScrollToPlugin = (await import('gsap/ScrollToPlugin')).default;
      gsap.registerPlugin(ScrollToPlugin);
    };
    
    loadScrollToPlugin();
  }, []);

  // Smooth scroll function
  const scrollToSection = (e, id) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    const element = document.getElementById(id);
    if (element) {
      // Use simple window scrolling as a fallback if GSAP ScrollToPlugin isn't loaded
      if (gsap.plugins && gsap.plugins.scrollTo) {
        gsap.to(window, {
          duration: 1, 
          scrollTo: {
            y: element,
            offsetY: 80
          },
          ease: "power3.inOut"
        });
      } else {
        // Fallback scrolling
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Add some offset
        setTimeout(() => {
          window.scrollBy(0, -80);
        }, 100);
      }
    }
  };

  return (
    <nav className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-amber-50 shadow-md py-2' 
        : 'bg-amber-50 py-3'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="#hero" onClick={(e) => scrollToSection(e, 'hero')} className="flex items-center">
              <div className="relative h-16 w-44 mr-2 overflow-hidden">
                <Image
                  src="/images/company.jpg"
                  alt="Bhatramane Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                  className="rounded"
                />
              </div>
            </a>
          </div>
          
          {/* Navigation Tabs - Desktop */}
          <div className="hidden lg:flex items-center space-x-8">
            <a 
              href="#hero" 
              onClick={(e) => scrollToSection(e, 'hero')} 
              className="text-amber-800 hover:text-amber-600 font-medium transition-colors"
            >
              {t.home}
            </a>
            <a 
              href="#products" 
              onClick={(e) => scrollToSection(e, 'products')} 
              className="text-amber-800 hover:text-amber-600 font-medium transition-colors"
            >
              {t.products}
            </a>
            <a 
              href="#about" 
              onClick={(e) => scrollToSection(e, 'about')} 
              className="text-amber-800 hover:text-amber-600 font-medium transition-colors"
            >
              {t.about}
            </a>
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, 'contact')} 
              className="text-amber-800 hover:text-amber-600 font-medium transition-colors"
            >
              {t.contact}
            </a>
          </div>
          
          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="text-amber-800 hover:text-amber-600 flex items-center gap-1"
            >
              <FaGlobe className="text-amber-600" />
              <span>{language === 'english' ? 'ಕನ್ನಡ' : 'English'}</span>
            </button>
            <a href="#cart" className="text-amber-800 hover:text-amber-600 relative">
              <FaShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-amber-500 text-white rounded-full text-xs flex items-center justify-center font-bold">0</span>
            </a>
          </div>
        
          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleLanguage}
              className="mr-4 text-amber-800 hover:text-amber-600 flex items-center gap-1"
            >
              <FaGlobe />
              <span className="text-sm">{language === 'english' ? 'ಕನ್ನಡ' : 'English'}</span>
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none text-amber-800 hover:text-amber-600 p-2 transition-all"
            >
              {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-3 pb-2 animate-fadeIn">
            <div className="flex flex-col space-y-1 text-amber-800 bg-amber-50 border border-amber-200 rounded-xl p-3 shadow-lg">
              <a 
                href="#hero" 
                onClick={(e) => scrollToSection(e, 'hero')}
                className="hover:text-amber-600 py-3 px-4 rounded-lg hover:bg-amber-100 transition-all flex items-center gap-2"
              >
                <FaHome /> {t.home}
              </a>
              <a 
                href="#products" 
                onClick={(e) => scrollToSection(e, 'products')}
                className="hover:text-amber-600 py-3 px-4 rounded-lg hover:bg-amber-100 transition-all flex items-center gap-2"
              >
                <FaShoppingCart /> {t.products}
              </a>
              <a 
                href="#about" 
                onClick={(e) => scrollToSection(e, 'about')}
                className="hover:text-amber-600 py-3 px-4 rounded-lg hover:bg-amber-100 transition-all flex items-center gap-2"
              >
                <FaInfoCircle /> {t.about}
              </a>
              <a 
                href="#contact" 
                onClick={(e) => scrollToSection(e, 'contact')}
                className="hover:text-amber-600 py-3 px-4 rounded-lg hover:bg-amber-100 transition-all flex items-center gap-2"
              >
                <FaPhoneAlt /> {t.contact}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 