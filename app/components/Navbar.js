'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaHome, FaShoppingCart, FaInfoCircle, FaBars, FaTimes, FaGlobe, FaPhoneAlt, FaTruck, FaGift } from 'react-icons/fa';
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

  // Add animation for banner elements
  useEffect(() => {
    const bannerTl = gsap.timeline({ repeat: -1 });
    bannerTl.to('.banner-pulse', { 
      scale: 1.05, 
      duration: 0.8, 
      ease: 'power1.inOut',
      stagger: 0.2
    })
    .to('.banner-pulse', { 
      scale: 1, 
      duration: 0.8, 
      ease: 'power1.inOut',
      stagger: 0.2
    });

    return () => bannerTl.kill();
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
    <>
      {/* Top Banner */}
      <div className="bg-amber-900 text-white py-2 overflow-hidden relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-6 text-center">
            <div className="flex items-center banner-pulse">
              <span className="bg-amber-500 rounded-full px-3 py-1 text-xs text-amber-900 font-bold mr-2">COMBO SALE!</span>
              <span className="text-sm">Special Offer <span className="font-bold underline">Click Here</span></span>
            </div>
            <div className="hidden md:flex items-center banner-pulse">
              <FaTruck className="text-amber-300 mr-2" />
              <span className="text-sm">Delivery all over India & Abroad</span>
            </div>
            <div className="flex items-center banner-pulse">
              <FaGift className="text-amber-300 mr-2" />
              <span className="text-sm">Season&apos;s Fresh Delight: <span className="font-bold underline">Explore Now</span></span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Navbar */}
      <nav className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-amber-800/95 shadow-lg py-2' 
          : 'bg-amber-700 py-3'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <a href="#hero" onClick={(e) => scrollToSection(e, 'hero')} className="flex items-center">
                <div className="relative h-14 w-40 mr-2 overflow-hidden">
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
            <div className="hidden lg:flex items-center bg-amber-600/80 rounded-full px-2 py-1">
              <a 
                href="#hero" 
                onClick={(e) => scrollToSection(e, 'hero')} 
                className="text-white hover:text-yellow-200 px-4 py-2 rounded-full hover:bg-amber-700/80 transition-all flex items-center gap-1 text-sm font-medium"
              >
                <FaHome className="text-yellow-300" /> {t.home}
              </a>
              <a 
                href="#bestsellers" 
                className="text-white hover:text-yellow-200 px-4 py-2 rounded-full hover:bg-amber-700/80 transition-all flex items-center gap-1 text-sm font-medium"
              >
                <span className="text-xs font-bold bg-amber-500 text-amber-900 px-2 py-0.5 rounded-full mr-1">Top Selling</span> Best Sellers
              </a>
              <a 
                href="#products" 
                onClick={(e) => scrollToSection(e, 'products')} 
                className="text-white hover:text-yellow-200 px-4 py-2 rounded-full hover:bg-amber-700/80 transition-all flex items-center gap-1 text-sm font-medium"
              >
                <span className="text-xs font-bold bg-amber-500 text-amber-900 px-2 py-0.5 rounded-full mr-1">Sale</span> Combo Products
              </a>
              <a 
                href="#spicy" 
                className="text-white hover:text-yellow-200 px-4 py-2 rounded-full hover:bg-amber-700/80 transition-all flex items-center gap-1 text-sm font-medium"
              >
                Spicy Powders
              </a>
              <a 
                href="#summer" 
                className="text-white hover:text-yellow-200 px-4 py-2 rounded-full hover:bg-amber-700/80 transition-all flex items-center gap-1 text-sm font-medium"
              >
                <span className="text-xs font-bold bg-amber-500 text-amber-900 px-2 py-0.5 rounded-full mr-1">New</span> Summer Specials
              </a>
              <div className="relative group">
                <button className="text-white hover:text-yellow-200 px-4 py-2 rounded-full hover:bg-amber-700/80 transition-all flex items-center gap-1 text-sm font-medium">
                  Categories <span className="ml-1">▼</span>
                </button>
                <div className="absolute left-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="py-2 px-3">
                    <a href="#pickles" className="block py-2 text-amber-900 hover:text-amber-600">Pickles</a>
                    <a href="#powders" className="block py-2 text-amber-900 hover:text-amber-600">Spice Powders</a>
                    <a href="#pastes" className="block py-2 text-amber-900 hover:text-amber-600">Pastes</a>
                    <a href="#combos" className="block py-2 text-amber-900 hover:text-amber-600">Combo Packs</a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-white hover:text-yellow-200" aria-label="Search">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
              <button
                onClick={toggleLanguage}
                className="text-white hover:text-yellow-200 flex items-center gap-1 py-1 px-3 rounded-full border border-yellow-400/50 hover:bg-amber-600/50 transition-all"
              >
                <FaGlobe className="text-yellow-300" />
                <span className="text-sm">{language === 'english' ? 'ಕನ್ನಡ' : 'English'}</span>
              </button>
              <a href="#account" className="text-white hover:text-yellow-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </a>
              <a href="#cart" className="text-white hover:text-yellow-200 relative">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-amber-500 text-amber-900 rounded-full text-xs flex items-center justify-center font-bold">0</span>
              </a>
            </div>
          
            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={toggleLanguage}
                className="mr-4 text-white hover:text-yellow-200 flex items-center gap-1"
              >
                <FaGlobe />
                <span className="text-sm">{language === 'english' ? 'ಕನ್ನಡ' : 'English'}</span>
              </button>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="focus:outline-none text-white hover:text-yellow-200 bg-amber-600 hover:bg-amber-700 p-2 rounded-full transition-all"
              >
                {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden mt-3 pb-2 animate-fadeIn">
              <div className="flex flex-col space-y-1 text-white bg-amber-700/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                <a 
                  href="#hero" 
                  onClick={(e) => scrollToSection(e, 'hero')}
                  className="hover:text-yellow-200 py-3 px-4 rounded-lg hover:bg-amber-600/70 transition-all flex items-center gap-2"
                >
                  <FaHome className="text-yellow-300" /> {t.home}
                </a>
                <a 
                  href="#products" 
                  onClick={(e) => scrollToSection(e, 'products')}
                  className="hover:text-yellow-200 py-3 px-4 rounded-lg hover:bg-amber-600/70 transition-all flex items-center gap-2"
                >
                  <FaShoppingCart className="text-yellow-300" /> {t.products}
                </a>
                <a 
                  href="#about" 
                  onClick={(e) => scrollToSection(e, 'about')}
                  className="hover:text-yellow-200 py-3 px-4 rounded-lg hover:bg-amber-600/70 transition-all flex items-center gap-2"
                >
                  <FaInfoCircle className="text-yellow-300" /> {t.about}
                </a>
                <a 
                  href="#contact" 
                  onClick={(e) => scrollToSection(e, 'contact')}
                  className="hover:text-yellow-200 py-3 px-4 rounded-lg hover:bg-amber-600/70 transition-all flex items-center gap-2"
                >
                  <FaPhoneAlt className="text-yellow-300" /> {t.contact}
                </a>

                {/* Mobile menu cart and account buttons */}
                <div className="flex justify-around pt-2 border-t border-amber-600/50">
                  <a href="#account" className="text-white hover:text-yellow-200 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </a>
                  <a href="#cart" className="text-white hover:text-yellow-200 p-2 relative">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-amber-500 text-amber-900 rounded-full text-xs flex items-center justify-center font-bold">0</span>
                  </a>
                  <button className="text-white hover:text-yellow-200 p-2" aria-label="Search">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
} 