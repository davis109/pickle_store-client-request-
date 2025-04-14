'use client';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '../contexts/LanguageContext';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const testimonials = [
  {
    id: '01',
    name: 'Rahul Sharma',
    location: 'Bangalore',
    text: 'My family has been enjoying Grandma\'s Pickles for generations. The authentic taste brings back childhood memories!',
    rating: 5,
    image: '/images/testimonial1.jpg'
  },
  {
    id: '02',
    name: 'Priya Patel',
    location: 'Mumbai',
    text: 'The Mixed Vegetable Pickle is absolutely delicious. It has the perfect balance of spices, just like my mother used to make.',
    rating: 5,
    image: '/images/testimonial2.jpg'
  },
  {
    id: '03',
    name: 'Arjun Reddy',
    location: 'Hyderabad',
    text: 'I gifted their Premium Pickle Box to my relatives abroad, and they were amazed by the authentic flavors. Great way to share our culture!',
    rating: 4,
    image: '/images/testimonial3.jpg'
  },
  {
    id: '04',
    name: 'Lakshmi Iyer',
    location: 'Chennai',
    text: 'The Mango Thokku is incredible! It has the perfect blend of tangy and spicy notes. I recommend it with curd rice.',
    rating: 5,
    image: '/images/testimonial4.jpg'
  },
  {
    id: '05',
    name: 'Kiran Nair',
    location: 'Kochi',
    text: 'Their Lemon Pickle has been my favorite for years. It\'s fresh, tangy, and adds the perfect zing to any meal.',
    rating: 5,
    image: '/images/testimonial5.jpg'
  },
  {
    id: '06',
    name: 'Anjali Desai',
    location: 'Ahmedabad',
    text: 'I love that they use traditional recipes but package them in such convenient, modern ways. The quality is consistently excellent.',
    rating: 4,
    image: '/images/testimonial6.jpg'
  },
  {
    id: '07',
    name: 'Vijay Krishnan',
    location: 'Mysore',
    text: 'The Garlic Pickle is exceptional! It has the perfect pungency and flavor that complements our daily meals perfectly.',
    rating: 5,
    image: '/images/testimonial7.jpg'
  },
  {
    id: '08',
    name: 'Meera Kapoor',
    location: 'Delhi',
    text: 'I appreciate that they don\'t use any artificial preservatives. You can taste the difference in quality and freshness.',
    rating: 5,
    image: '/images/testimonial8.jpg'
  },
  {
    id: '09',
    name: 'Rajesh Kulkarni',
    location: 'Pune',
    text: 'Their pickle subscription box is amazing! I get to try new varieties every month, and they\'re all delicious.',
    rating: 4,
    image: '/images/testimonial9.jpg'
  }
];

const trendingProducts = [
  {
    id: 1,
    name: 'Spicy Mango Pickle',
    image: '/images/product8.jpg',
    badge: 'Best Seller',
    color: 'bg-red-500'
  },
  {
    id: 2,
    name: 'Lemon Pickle (Roasted Masala)',
    image: '/images/product9.jpg',
    badge: 'New',
    color: 'bg-yellow-500'
  },
  {
    id: 3,
    name: 'Garlic Pickle',
    image: '/images/product8.jpg',
    badge: 'Trending',
    color: 'bg-orange-500'
  },
  {
    id: 4,
    name: 'Mixed Vegetable Pickle',
    image: '/images/product9.jpg',
    badge: 'Limited Edition',
    color: 'bg-rose-500'
  },
  {
    id: 5,
    name: 'Ginger Garlic Paste',
    image: '/images/product8.jpg',
    badge: 'Popular',
    color: 'bg-red-600'
  },
  {
    id: 6,
    name: 'Tomato Pickle',
    image: '/images/product9.jpg',
    badge: 'Spicy',
    color: 'bg-orange-600'
  },
  {
    id: 7,
    name: 'Green Chili Pickle',
    image: '/images/product8.jpg',
    badge: 'Hot',
    color: 'bg-amber-500'
  },
  {
    id: 8,
    name: 'Sweet Lime Pickle',
    image: '/images/product9.jpg',
    badge: 'Tangy',
    color: 'bg-yellow-600'
  }
];

// Gallery images for colorful display
const galleryImages = [
  {
    id: 1,
    src: '/images/product8.jpg',
    alt: 'Various pickle jars arranged artistically'
  },
  {
    id: 2,
    src: '/images/product9.jpg',
    alt: 'Fresh ingredients used in pickle making'
  },
  {
    id: 3,
    src: '/images/product8.jpg',
    alt: 'Traditional pickle making process'
  },
  {
    id: 4,
    src: '/images/product9.jpg',
    alt: 'Colorful array of different pickle varieties'
  },
  {
    id: 5,
    src: '/images/product8.jpg',
    alt: 'Family enjoying meals with our pickles'
  },
  {
    id: 6,
    src: '/images/product9.jpg',
    alt: 'Pickle gift boxes for special occasions'
  },
  {
    id: 7,
    src: '/images/product8.jpg',
    alt: 'Close-up of our mango pickle specialty'
  },
  {
    id: 8,
    src: '/images/product9.jpg',
    alt: 'Organic spices used in our recipes'
  },
  {
    id: 9,
    src: '/images/product8.jpg',
    alt: 'Traditional clay pots used for pickle fermentation'
  },
  {
    id: 10,
    src: '/images/product9.jpg',
    alt: 'Pickle tasting event at our store'
  }
];

export default function MarqueeSection() {
  const { language, translations } = useLanguage();
  const t = translations[language];
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const galleryRef = useRef(null);
  const testimonialRef = useRef(null);
  const productsRef = useRef(null);
  const bgPatternsRef = useRef([]);
  
  useEffect(() => {
    const loadGsapPlugins = async () => {
      const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
      gsap.registerPlugin(ScrollTrigger);
      
      // Animate heading
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
      
      // Animate testimonials container
      gsap.fromTo(
        testimonialRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: testimonialRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
      
      // Animate products container
      gsap.fromTo(
        productsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: productsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
      
      // Animate gallery images
      const galleryImages = galleryRef.current.querySelectorAll('.gallery-image');
      gsap.fromTo(
        galleryImages,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: galleryRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
      
      // Create continuous floating animation for gallery images
      galleryImages.forEach((image) => {
        const randomDuration = 2 + Math.random() * 2;
        const randomY = 5 + Math.random() * 10;
        
        gsap.to(image, {
          y: randomY,
          duration: randomDuration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });
      
      // Animate background patterns
      bgPatternsRef.current.forEach((pattern, index) => {
        if (!pattern) return;
        
        const direction = index % 2 === 0 ? 1 : -1;
        const duration = 20 + (index * 5);
        const delay = index * 2;
        
        gsap.to(pattern, {
          x: 50 * direction,
          y: 30 * direction,
          rotation: 10 * direction,
          duration: duration,
          delay: delay,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });
    };
    
    loadGsapPlugins();
    
    return () => {
      // Cleanup animations
      bgPatternsRef.current.forEach(pattern => {
        if (pattern) gsap.killTweensOf(pattern);
      });
    };
  }, []);

  // Translate testimonial based on language
  const getTranslatedTestimonial = (text) => {
    // This is a simplification. In a real app, you'd have proper translations
    return language === 'english' ? text : 
      `ಭಟ್ರಮನೆ ಫುಡ್ಸ್‌ನಿಂದ ಉತ್ತಮ ಗುಣಮಟ್ಟದ ಉಪ್ಪಿನಕಾಯಿಗಳು. ಪರಂಪರಾಗತ ರುಚಿ ಮತ್ತು ಯಾವುದೇ ಸಂರಕ್ಷಕಗಳಿಲ್ಲ.`;
  };
  
  // Animation variants for framer-motion
  const cardVariants = {
    initial: { opacity: 0, scale: 0.8 },
    hover: { 
      scale: 1.05, 
      boxShadow: "0px 10px 25px -5px rgba(0,0,0,0.2)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.98 }
  };
  
  // Gallery item animation variants
  const galleryItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * index,
        duration: 0.5
      }
    })
  };
  
  // Check if elements are in view
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }
    
    return () => {
      if (galleryRef.current) {
        observer.unobserve(galleryRef.current);
      }
    };
  }, []);
  
  return (
    <section ref={sectionRef} className="py-16 relative overflow-hidden bg-amber-50">
      {/* Animated background patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-yellow-50 opacity-90 z-0"></div>
      
      <div 
        ref={el => (bgPatternsRef.current[0] = el)} 
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-amber-100/30 to-yellow-100/30 blur-3xl -z-10 transform -translate-x-1/2 -translate-y-1/2"
      ></div>
      <div 
        ref={el => (bgPatternsRef.current[1] = el)} 
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-orange-100/30 to-amber-100/30 blur-3xl -z-10 transform translate-x-1/3 translate-y-1/3"
      ></div>
      <div 
        ref={el => (bgPatternsRef.current[2] = el)} 
        className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-yellow-100/30 to-amber-100/30 blur-3xl -z-10 transform -translate-x-1/2 -translate-y-1/2"
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-10">
          <div className="relative h-16 w-48 mb-6">
            <Image
              src="/images/company.jpg"
              alt="Bhatramane Logo"
              fill
              style={{ objectFit: 'contain' }}
              className="rounded shadow-md"
            />
          </div>
          
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-amber-100/60 rounded-lg blur-md -z-10 transform scale-110"></div>
            <h2 
              ref={headingRef} 
              className="text-4xl md:text-5xl font-bold text-amber-800 mb-2 relative inline-block px-8 py-2"
            >
              <span className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-yellow-200 opacity-70 animate-pulse"></span>
              {language === 'english' ? '🌟 Loved by Customers 🌟' : '🌟 ಗ್ರಾಹಕರು ಮೆಚ್ಚಿದ 🌟'}
              <span className="absolute -bottom-3 -right-6 w-10 h-10 rounded-full bg-amber-200 opacity-70 animate-pulse" style={{ animationDelay: "0.5s" }}></span>
            </h2>
          </div>
          
          <p className="text-gray-700 max-w-2xl mx-auto text-center mb-8 text-lg">
            {language === 'english' 
              ? 'See what people are saying about our authentic, preservative-free pickles' 
              : 'ನಮ್ಮ ಸಹಜವಾದ, ಸಂರಕ್ಷಕವಿಲ್ಲದ ಉಪ್ಪಿನಕಾಯಿಗಳ ಬಗ್ಗೆ ಜನರು ಏನು ಹೇಳುತ್ತಿದ್ದಾರೆ ಎಂಬುದನ್ನು ನೋಡಿ'}
          </p>
        </div>
        
        {/* Testimonials Marquee */}
        <div ref={testimonialRef} className="mb-16 relative bg-white p-6 rounded-xl shadow-lg">
          <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-amber-100 opacity-70 animate-ping" style={{ animationDuration: "3s" }}></div>
          <div className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-yellow-100 opacity-70 animate-ping" style={{ animationDuration: "4s", animationDelay: "1s" }}></div>
          
          {/* Static testimonial display rather than marquee for better visibility */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
            {testimonials.slice(0, 6).map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-xl shadow-md border-4 border-amber-300 relative overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="absolute -right-12 -top-12 w-24 h-24 rounded-full bg-amber-50 opacity-50"></div>
                <div className="absolute -left-12 -bottom-12 w-24 h-24 rounded-full bg-yellow-50 opacity-50"></div>
                
                <div className="flex items-center mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-amber-500">
                    <Image
                      src={testimonial.id % 2 === 0 ? '/images/product8.jpg' : '/images/product9.jpg'}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`${
                          i < testimonial.rating ? 'text-amber-500' : 'text-gray-300'
                        } text-xl`}
                      />
                    ))}
                  </div>
                </div>
                <div className="relative z-10 bg-amber-50 p-4 rounded-lg">
                  <FaQuoteLeft className="absolute -top-2 -left-2 text-amber-400 text-2xl" />
                  <p className="text-gray-800 text-base italic px-5 py-2 font-medium">
                    {testimonial.text}
                  </p>
                  <FaQuoteRight className="absolute -bottom-2 -right-2 text-amber-400 text-2xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Gallery Section */}
        <div ref={galleryRef} className="mb-16 bg-white p-6 rounded-xl shadow-lg">
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-amber-100/60 rounded-lg blur-md -z-10 transform scale-110"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-2 relative inline-block px-8 py-2">
                <span className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-orange-200 opacity-70 animate-ping" style={{ animationDuration: "2.5s" }}></span>
                {language === 'english' ? '📸 Pickle Gallery 📸' : '📸 ಉಪ್ಪಿನಕಾಯಿ ಗ್ಯಾಲರಿ 📸'}
                <span className="absolute -bottom-2 -right-4 w-8 h-8 rounded-full bg-amber-200 opacity-70 animate-ping" style={{ animationDuration: "3.5s", animationDelay: "0.7s" }}></span>
              </h2>
            </div>
          </div>
          
          <div className="gallery-container overflow-hidden">
            <div className="gallery-images flex gap-6 p-4 overflow-x-auto pb-6">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  className="gallery-image-container relative w-[300px] h-[200px] rounded overflow-hidden flex-shrink-0 shadow-lg border border-amber-100"
                  variants={galleryItemVariants}
                  custom={index}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                >
                  <Image 
                    src={image.src} 
                    alt={image.alt} 
                    fill 
                    className="object-cover rounded transition-transform duration-500 hover:scale-110"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Trending Products Heading */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-amber-100/60 rounded-lg blur-md -z-10 transform scale-110"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-2 relative inline-block px-8 py-2">
              <span className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-yellow-200 opacity-70 animate-pulse" style={{ animationDuration: "3s" }}></span>
              {language === 'english' ? '🔥 Trending Products 🔥' : '🔥 ಟ್ರೆಂಡಿಂಗ್ ಉತ್ಪನ್ನಗಳು 🔥'}
              <span className="absolute -bottom-4 -right-6 w-10 h-10 rounded-full bg-orange-200 opacity-70 animate-pulse" style={{ animationDuration: "2.5s", animationDelay: "0.8s" }}></span>
            </h2>
          </div>
          <p className="text-gray-700 max-w-2xl mx-auto mb-4 text-lg">
            {language === 'english' 
              ? 'Our most popular pickles that customers are loving right now' 
              : 'ಗ್ರಾಹಕರು ಈಗ ಇಷ್ಟಪಡುತ್ತಿರುವ ನಮ್ಮ ಅತ್ಯಂತ ಜನಪ್ರಿಯ ಉಪ್ಪಿನಕಾಯಿಗಳು'}
          </p>
        </div>
        
        {/* Trending Products Marquee */}
        <div ref={productsRef} className="relative bg-white p-6 rounded-xl shadow-lg mb-8">
          <div className="absolute -top-8 -right-8 w-16 h-16 rounded-full bg-amber-100 opacity-70 animate-ping" style={{ animationDuration: "4s" }}></div>
          <div className="absolute -bottom-10 -left-10 w-20 h-20 rounded-full bg-orange-100 opacity-70 animate-ping" style={{ animationDuration: "3.5s", animationDelay: "1.2s" }}></div>
          
          <Marquee 
            gradient={true} 
            gradientColor={[254, 252, 232]} 
            speed={30} 
            pauseOnHover={true}
            direction="right"
          >
            <div className="flex space-x-8 py-4">
              {trendingProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    y: -10
                  }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="relative w-52 h-64 rounded-lg overflow-hidden shadow-md flex-shrink-0 bg-white border border-amber-100"
                >
                  <div className={`absolute top-3 left-3 z-10 ${product.color} text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse`}>
                    {product.badge}
                  </div>
                  <div className="w-full h-40 relative overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-4 bg-white relative">
                    <span className="absolute -top-3 right-3 w-5 h-5 rounded-full bg-yellow-100 animate-ping opacity-70" style={{ animationDuration: "2s" }}></span>
                    <h3 className="font-bold text-gray-800 mb-1">{product.name}</h3>
                    <motion.a
                      href="#products"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-block bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white px-3 py-1 rounded text-sm transition-colors mt-2"
                    >
                      {language === 'english' ? 'View Details' : 'ವಿವರಗಳನ್ನು ನೋಡಿ'}
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </section>
  );
} 