'use client';
import Image from 'next/image';
import { useLanguage } from '../contexts/LanguageContext';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FaLeaf, FaPepperHot } from 'react-icons/fa';

export default function Hero() {
  const { language, translations } = useLanguage();
  const t = translations[language];
  
  // Refs for GSAP animations
  const titleRef = useRef(null);
  const taglineRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageRef = useRef(null);
  const featuresRef = useRef(null);
  const spicesWrapperRef = useRef(null);
  const patternRef = useRef(null);
  
  // For spice animation
  const [spices, setSpices] = useState([]);
  
  // Generate random spices animation elements
  useEffect(() => {
    const generateSpices = () => {
      // Simplify to just use a couple of reliable icons
      const spiceIcons = [FaLeaf, FaPepperHot];
      const spiceColors = ['text-amber-600', 'text-red-600', 'text-green-700', 'text-yellow-600', 'text-amber-800'];
      
      const newSpices = Array.from({ length: 20 }, (_, i) => {
        const Icon = spiceIcons[Math.floor(Math.random() * spiceIcons.length)];
        const color = spiceColors[Math.floor(Math.random() * spiceColors.length)];
        const size = 10 + Math.random() * 20; // Random size between 10px and 30px
        const left = Math.random() * 100; // Random position
        const delay = Math.random() * 15; // Random delay
        const duration = 7 + Math.random() * 10; // Random duration between 7-17s
        
        return {
          id: i,
          Icon,
          color,
          style: {
            left: `${left}%`,
            fontSize: `${size}px`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`
          }
        };
      });
      
      setSpices(newSpices);
    };
    
    generateSpices();
  }, []);
  
  useEffect(() => {
    // Create GSAP timeline for hero animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Animate pattern
    gsap.to(patternRef.current, {
      backgroundPosition: '100% 100%',
      duration: 20,
      repeat: -1,
      ease: "none"
    });
    
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
    .fromTo(imageRef.current, 
      { scale: 0.9, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 1.2 }, 
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
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-amber-50 to-yellow-50 pt-16">
      {/* Background Pattern */}
      <div 
        ref={patternRef} 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(217, 119, 6, 0.2) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(217, 119, 6, 0.2) 1px, transparent 1px),
            linear-gradient(rgba(217, 119, 6, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(217, 119, 6, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px, 60px 60px, 30px 30px, 30px 30px',
        }}
      ></div>
      
      {/* Animated Spices */}
      <div ref={spicesWrapperRef} className="absolute inset-0 overflow-hidden z-0">
        {spices.map(spice => (
          <div 
            key={spice.id} 
            className={`absolute spice-fall ${spice.color}`}
            style={spice.style}
          >
            <spice.Icon />
          </div>
        ))}
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-5 w-40 h-40 rounded-full bg-amber-500 opacity-5 z-0 float-animation"></div>
      <div className="absolute bottom-40 right-5 w-32 h-32 rounded-full bg-amber-700 opacity-5 z-0 float-animation" style={{ animationDelay: '2s' }}></div>
      
      {/* Mandala-like decorative circles */}
      <div className="absolute top-1/4 right-10 opacity-5 z-0">
        <div className="w-60 h-60 border-4 border-amber-600 rounded-full"></div>
        <div className="w-40 h-40 border-4 border-amber-600 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="w-20 h-20 border-4 border-amber-600 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative min-h-[85vh] w-full overflow-hidden">
        {/* Overlay content */}
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full py-16 px-4 z-10 relative">
          <div className="flex flex-col items-start justify-center">
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
            <div className="mt-2">
              <a 
                href="#products" 
                className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white px-8 py-3 rounded-full font-medium transition-all shadow-lg inline-flex items-center gap-2"
              >
                {t.exploreProducts || 'Explore Our Products'}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div ref={imageRef} className="flex justify-center items-center">
            <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-2xl shadow-2xl">
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-amber-500 rounded-full opacity-70 z-0"></div>
              <div className="absolute -left-4 -bottom-4 w-16 h-16 bg-amber-600 rounded-full opacity-70 z-0"></div>
              <Image 
                src="/images/product11.jpg" 
                alt="Bhatramane Foods Product Showcase" 
                fill
                className="object-cover z-10 relative rounded-xl"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-800/40 to-transparent z-20"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Banner */}
      <div className="bg-amber-700 text-white py-8 relative z-10">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px),
            radial-gradient(circle, rgba(255,255,255,0.15) 2px, transparent 2px)
          `,
          backgroundSize: '30px 30px, 90px 90px'
        }}></div>
        <div ref={featuresRef} className="container mx-auto px-4 relative z-20">
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
      
      {/* CSS for animated spices */}
      <style jsx>{`
        .spice-fall {
          animation: spice-fall linear infinite;
          will-change: transform;
        }
        
        .float-animation {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
} 