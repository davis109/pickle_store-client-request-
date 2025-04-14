'use client';
import Image from 'next/image';
import { useLanguage } from '../contexts/LanguageContext';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import dynamic from 'next/dynamic';

// Dynamically import ThreeJsPickleJars with no SSR
const ThreeJsPickleJars = dynamic(() => import('./ThreeJsPickleJars'), { ssr: false });

export default function Hero() {
  const { language, translations } = useLanguage();
  const t = translations[language];
  
  // Refs for GSAP animations
  const titleRef = useRef(null);
  const taglineRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);
  const featuresRef = useRef(null);
  
  useEffect(() => {
    // Create GSAP timeline for hero animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.fromTo(titleRef.current, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.2 }
    )
    .fromTo(taglineRef.current, 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1 }, 
      "-=0.8"
    )
    .fromTo(descriptionRef.current, 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1 }, 
      "-=0.7"
    )
    .fromTo(ctaRef.current.children, 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, stagger: 0.2, duration: 0.8 }, 
      "-=0.7"
    )
    .fromTo(featuresRef.current.children, 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, stagger: 0.15, duration: 0.7 }, 
      "-=0.5"
    );
    
    return () => {
      // Cleanup animation
      tl.kill();
    };
  }, []);
  
  return (
    <section id="hero" className="relative bg-gradient-to-b from-amber-50 to-yellow-50 pt-16">
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0">
        <ThreeJsPickleJars />
      </div>
      
      {/* Hero Content */}
      <div className="relative h-[85vh] w-full overflow-hidden">
        {/* Overlay content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <h1 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-amber-800 drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">
            Bhatramane Foods
          </h1>
          <div ref={taglineRef} className="mb-8 text-2xl md:text-3xl font-bold text-amber-700">
            <p className="mb-3">{t.tagline1}</p>
            <p>{t.tagline2}</p>
          </div>
          <p ref={descriptionRef} className="mb-10 max-w-xl text-lg font-medium border-2 border-amber-300 bg-amber-50/80 text-amber-800 p-4 rounded-lg backdrop-blur-sm shadow-lg">
            {t.premiumPickles}
          </p>
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#products" 
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-md font-medium transition-colors shadow-lg"
            >
              {t.ourProducts}
            </a>
            <a 
              href="#contact" 
              className="bg-white hover:bg-gray-100 text-amber-700 border border-amber-300 px-6 py-3 rounded-md font-medium transition-colors shadow-lg"
            >
              {t.contactUs}
            </a>
          </div>
        </div>
      </div>
      
      {/* Features Banner */}
      <div className="bg-amber-700 text-white py-8">
        <div ref={featuresRef} className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-amber-800/50 rounded-lg backdrop-blur-sm shadow-md transform hover:scale-105 transition-transform duration-300">
              <h3 className="font-bold mb-2">{t.noPreservatives}</h3>
              <p>{t.naturalPreservation}</p>
            </div>
            <div className="p-4 bg-amber-800/50 rounded-lg backdrop-blur-sm shadow-md transform hover:scale-105 transition-transform duration-300">
              <h3 className="font-bold mb-2">{t.noColors}</h3>
              <p>{t.naturalColors}</p>
            </div>
            <div className="p-4 bg-amber-800/50 rounded-lg backdrop-blur-sm shadow-md transform hover:scale-105 transition-transform duration-300">
              <h3 className="font-bold mb-2">{t.noTasteEnhancers}</h3>
              <p>{t.authenticFlavors}</p>
            </div>
            <div className="p-4 bg-amber-800/50 rounded-lg backdrop-blur-sm shadow-md transform hover:scale-105 transition-transform duration-300">
              <h3 className="font-bold mb-2">{t.noOil}</h3>
              <p>{t.healthier}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 