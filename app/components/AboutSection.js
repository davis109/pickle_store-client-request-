'use client';
import Image from 'next/image';
import { useLanguage } from '../contexts/LanguageContext';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function AboutSection() {
  const { language, translations } = useLanguage();
  const t = translations[language];
  
  // Refs for GSAP animations
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const buttonRef = useRef(null);
  
  useEffect(() => {
    // Dynamically import ScrollTrigger
    const loadGsapPlugins = async () => {
      const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
      gsap.registerPlugin(ScrollTrigger);
      
      // Create GSAP timeline for animations after ScrollTrigger is loaded
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#about',
          start: 'top 70%',
          end: 'bottom 20%',
          toggleActions: 'play none none none'
        }
      });
      
      tl.fromTo(headingRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8 }
      )
      .fromTo(textRef.current.children, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.6 },
        '-=0.4'
      )
      .fromTo(buttonRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.2'
      )
      .fromTo(imageRef.current, 
        { opacity: 0, scale: 0.9 }, 
        { opacity: 1, scale: 1, duration: 0.8 },
        '-=0.6'
      );
      
      return () => {
        // Cleanup animation
        if (tl.scrollTrigger) {
          tl.scrollTrigger.kill();
        }
        tl.kill();
      };
    };
    
    loadGsapPlugins();
  }, []);
  
  return (
    <section id="about" className="py-16 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 ref={headingRef} className="text-3xl font-bold text-green-800 mb-6">{t.aboutHeading}</h2>
            <div ref={textRef} className="space-y-4 text-gray-700">
              <p>
                {language === 'english' ? 
                  'Bhatramane Foods is a family-owned business located in Saravu, Kasaragod, Kerala, specializing in traditional pickle making with authentic recipes passed down through generations.' :
                  'ಭಟ್ರಮನೆ ಫುಡ್ಸ್ ಕೇರಳದ ಕಾಸರಗೋಡಿನ ಸಾರವು ನಲ್ಲಿರುವ ಕುಟುಂಬದ ವ್ಯಾಪಾರವಾಗಿದ್ದು, ಪೀಳಿಗೆಗಳಿಂದ ಬಂದ ಅಸಲಿ ರೆಸಿಪಿಗಳೊಂದಿಗೆ ಸಾಂಪ್ರದಾಯಿಕ ಉಪ್ಪಿನಕಾಯಿ ತಯಾರಿಕೆಯಲ್ಲಿ ವಿಶೇಷಗೊಂಡಿದೆ.'
                }
              </p>
              <p>
                {language === 'english' ?
                  'Our pickles stand out with our commitment to natural ingredients and traditional methods. We use no chemical preservatives, no artificial colors, no chemical taste enhancers, and no oil in our products.' :
                  'ನಮ್ಮ ಉಪ್ಪಿನಕಾಯಿಗಳು ನೈಸರ್ಗಿಕ ಪದಾರ್ಥಗಳು ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ವಿಧಾನಗಳಿಗೆ ನಮ್ಮ ಬದ್ಧತೆಯೊಂದಿಗೆ ಎದ್ದು ಕಾಣುತ್ತವೆ. ನಾವು ನಮ್ಮ ಉತ್ಪನ್ನಗಳಲ್ಲಿ ಯಾವುದೇ ರಾಸಾಯನಿಕ ಸಂರಕ್ಷಕಗಳು, ಕೃತಕ ಬಣ್ಣಗಳು, ರಾಸಾಯನಿಕ ರುಚಿ ವರ್ಧಕಗಳು ಮತ್ತು ಎಣ್ಣೆ ಬಳಸುವುದಿಲ್ಲ.'
                }
              </p>
              <p>
                {language === 'english' ?
                  'Each pickle is carefully prepared with the finest quality ingredients, ensuring both ಪರಿಶುದ್ಧ ಆಹಾರ (pure food) and ಪರಿಪೂರ್ಣ ರುಚಿ (perfect taste) in every bite.' :
                  'ಪ್ರತಿಯೊಂದು ಉಪ್ಪಿನಕಾಯಿಯನ್ನು ಅತ್ಯುತ್ತಮ ಗುಣಮಟ್ಟದ ಪದಾರ್ಥಗಳೊಂದಿಗೆ ಜಾಗರೂಕತೆಯಿಂದ ತಯಾರಿಸಲಾಗಿದೆ, ಪ್ರತಿಯೊಂದು ತುತ್ತಿನಲ್ಲೂ ಪರಿಶುದ್ಧ ಆಹಾರ ಮತ್ತು ಪರಿಪೂರ್ಣ ರುಚಿ ಖಚಿತಪಡಿಸುತ್ತದೆ.'
                }
              </p>
              <p>
                {language === 'english' ?
                  'We take pride in preserving the authentic taste of traditional pickles while ensuring they meet modern health standards and dietary preferences.' :
                  'ಆಧುನಿಕ ಆರೋಗ್ಯ ಮಾನದಂಡಗಳು ಮತ್ತು ಆಹಾರ ಆದ್ಯತೆಗಳನ್ನು ಪೂರೈಸುತ್ತಿರುವಾಗಲೇ ಸಾಂಪ್ರದಾಯಿಕ ಉಪ್ಪಿನಕಾಯಿಗಳ ಅಸಲಿ ರುಚಿಯನ್ನು ಕಾಪಾಡುವುದರಲ್ಲಿ ನಾವು ಹೆಮ್ಮೆಪಡುತ್ತೇವೆ.'
                }
              </p>
            </div>
            <div ref={buttonRef} className="mt-8">
              <a 
                href="#contact" 
                className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-md font-medium transition-colors inline-block"
              >
                {t.learnMore}
              </a>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div ref={imageRef} className="relative h-96 rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500">
              <Image
                src="/images/IMG-20250414-WA0077.jpg"
                alt="Bhatramane Foods Production"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 