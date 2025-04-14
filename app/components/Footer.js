'use client';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaArrowUp } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

export default function Footer() {
  const { language, translations } = useLanguage();
  const t = translations[language];
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Scroll to top functionality
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      // Use GSAP if available, otherwise use native scrolling
      if (gsap.plugins && gsap.plugins.scrollTo) {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: 0 },
          ease: 'power3.inOut'
        });
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  };
  
  // Smooth scroll function for anchor links
  const scrollToSection = (e, id) => {
    e.preventDefault();
    
    const element = document.getElementById(id);
    if (element) {
      // Use GSAP if available
      if (gsap.plugins && gsap.plugins.scrollTo) {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: element,
            offsetY: 80
          },
          ease: 'power3.inOut'
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
    <footer className="bg-green-800 text-white py-8 relative">
      {/* Scroll to top button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="absolute right-8 -top-6 bg-green-700 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-colors z-10"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Bhatramane Foods</h3>
            <p className="mb-2">{t.tagline1}</p>
            <p className="mb-2">{t.tagline2}</p>
            <div className="mt-4">
              <p className="text-green-200">
                {t.noPreservatives}<br />
                {t.noColors}<br />
                {t.noTasteEnhancers}<br />
                {t.noOil}
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">{t.contactUs}</h3>
            <address className="not-italic">
              <div className="flex items-start mb-2">
                <FaMapMarkerAlt className="mt-1 mr-2" />
                <p>
                  Bhatramane Foods<br />
                  No 61/D, Saravu<br />
                  Beripadavu Post<br />
                  Manjeshwar Taluk<br />
                  Kasaragod, Kerala<br />
                  671322
                </p>
              </div>
              <div className="flex items-center mb-2">
                <FaPhone className="mr-2" />
                <p>+91 98765 43210</p>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-2" />
                <p>info@bhatramanefoods.com</p>
              </div>
            </address>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">{t.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#hero" 
                  onClick={(e) => scrollToSection(e, 'hero')} 
                  className="hover:text-green-200"
                >
                  {t.home}
                </a>
              </li>
              <li>
                <a 
                  href="#products" 
                  onClick={(e) => scrollToSection(e, 'products')} 
                  className="hover:text-green-200"
                >
                  {t.products}
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  onClick={(e) => scrollToSection(e, 'about')} 
                  className="hover:text-green-200"
                >
                  {t.about}
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => scrollToSection(e, 'contact')} 
                  className="hover:text-green-200"
                >
                  {t.contact}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-green-700 mt-8 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} Bhatramane Foods. {t.allRightsReserved}</p>
        </div>
      </div>
    </footer>
  );
} 