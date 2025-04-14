'use client';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function Home() {
  // Register GSAP plugins at the page level
  useEffect(() => {
    // Import and register GSAP plugins
    const setupGSAP = async () => {
      const { gsap } = await import('gsap');
      const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
      const ScrollToPlugin = (await import('gsap/ScrollToPlugin')).default;
      
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    };
    
    setupGSAP();
    
    return () => {
      // Clean up ScrollTrigger instances when component unmounts
      if (typeof window !== 'undefined') {
        const cleanup = async () => {
          const { ScrollTrigger } = await import('gsap/ScrollTrigger');
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
        cleanup();
      }
    };
  }, []);
  
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedProducts />
      <MarqueeSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
