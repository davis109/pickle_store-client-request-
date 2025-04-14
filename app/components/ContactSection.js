'use client';
import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { gsap } from 'gsap';
import { FaPhoneAlt, FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaPaperPlane, FaUser, FaHeadset } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const { language, translations } = useLanguage();
  const t = translations[language];
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const contactInfoRef = useRef(null);
  const mapRef = useRef(null);
  const formWrapperRef = useRef(null);
  const successRef = useRef(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormState({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 1500);
  };
  
  useEffect(() => {
    const loadGsapPlugins = async () => {
      const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
      gsap.registerPlugin(ScrollTrigger);
      
      // Create GSAP timeline for animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#contact',
          start: 'top 70%',
          end: 'bottom 20%',
          toggleActions: 'play none none none'
        }
      });
      
      tl.fromTo(titleRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8 }
      )
      .fromTo(formWrapperRef.current, 
        { opacity: 0, x: -50, scale: 0.95 }, 
        { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "back.out(1.2)" },
        '-=0.4'
      )
      .fromTo(contactInfoRef.current.children, 
        { opacity: 0, x: 50 }, 
        { opacity: 1, x: 0, stagger: 0.15, duration: 0.5, ease: "power2.out" },
        '-=0.6'
      )
      .fromTo(mapRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.4'
      );
      
      // Animate the floating icons
      const floatingElements = document.querySelectorAll('.floating-icon');
      floatingElements.forEach((el, index) => {
        gsap.to(el, {
          y: '-=10',
          duration: 1.5 + (index * 0.2),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.3
        });
      });
      
      return () => {
        if (tl.scrollTrigger) {
          tl.scrollTrigger.kill();
        }
        tl.kill();
      };
    };
    
    loadGsapPlugins();
  }, []);
  
  useEffect(() => {
    if (showSuccess) {
      gsap.fromTo(successRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  }, [showSuccess]);
  
  return (
    <section id="contact" className="py-16 bg-gradient-to-b from-amber-50 to-yellow-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-300/20 rounded-full blur-3xl translate-x-1/4 translate-y-1/4"></div>
      <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-yellow-200/30 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block relative">
            <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-amber-200 opacity-60 floating-icon"></div>
            <h2 ref={titleRef} className="text-4xl font-bold text-amber-800 relative inline-block">
              <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-yellow-300/50 animate-ping"></span>
              {t.contactUs}
              <span className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-amber-300/50 animate-ping" style={{ animationDelay: "0.5s" }}></span>
            </h2>
            <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-yellow-200 opacity-60 floating-icon"></div>
          </div>
          <p className="mt-4 text-amber-700 max-w-lg mx-auto">
            We&apos;d love to hear from you! Whether you have a question about our products, pricing, or anything else, our team is ready to assist you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Contact Form */}
          <div ref={formWrapperRef} className="md:col-span-6 lg:col-span-5">
            <div className="bg-white rounded-xl shadow-xl p-8 border border-amber-100 relative overflow-hidden">
              {/* Decorative pattern */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-amber-50 opacity-70"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-yellow-50 opacity-70"></div>
              
              <h3 className="text-2xl font-semibold mb-6 text-amber-800 flex items-center">
                <FaHeadset className="mr-2 text-amber-600" />
                {t.sendMessage}
              </h3>
              
              {showSuccess ? (
                <motion.div 
                  ref={successRef}
                  className="bg-green-100 border border-green-200 text-green-700 p-4 rounded-md flex items-center my-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Message sent successfully! We&apos;ll get back to you shortly.</span>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="relative z-10">
                  <div className="mb-5">
                    <label htmlFor="name" className="block text-amber-700 mb-2 font-medium">
                      {t.yourName}
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-amber-500">
                        <FaUser />
                      </div>
                      <input 
                        type="text" 
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-amber-50/50 transition-all"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-5">
                    <label htmlFor="email" className="block text-amber-700 mb-2 font-medium">
                      {t.emailAddress}
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-amber-500">
                        <FaEnvelope />
                      </div>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-amber-50/50 transition-all"
                        placeholder="email@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-5">
                    <label htmlFor="phone" className="block text-amber-700 mb-2 font-medium">
                      {t.phoneNumber}
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-amber-500">
                        <FaPhoneAlt />
                      </div>
                      <input 
                        type="tel" 
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-amber-50/50 transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-amber-700 mb-2 font-medium">
                      {t.yourMessage}
                    </label>
                    <textarea 
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows="4" 
                      className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-amber-50/50 transition-all"
                      placeholder="How can we help you?"
                      required
                    ></textarea>
                  </div>
                  
                  <motion.button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg flex items-center justify-center w-full ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" /> {t.send}
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </div>
          
          {/* Contact Information */}
          <div ref={contactInfoRef} className="md:col-span-6 lg:col-span-4 space-y-6">
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-lg border border-amber-100 flex items-start space-x-4 hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="bg-gradient-to-r from-amber-500 to-amber-400 rounded-full p-3 text-white">
                <FaPhoneAlt className="text-xl" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-amber-800 mb-1">
                  {t.phone}
                </h4>
                <p className="text-amber-700 mb-1">+91 98765 43210</p>
                <p className="text-amber-600 text-sm">
                  {t.phoneHours}
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-lg border border-amber-100 flex items-start space-x-4 hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="bg-gradient-to-r from-amber-500 to-amber-400 rounded-full p-3 text-white">
                <FaEnvelope className="text-xl" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-amber-800 mb-1">
                  {t.email}
                </h4>
                <p className="text-amber-700 mb-1">info@bhatramanefoods.com</p>
                <p className="text-amber-600 text-sm">
                  {t.emailResponse}
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-lg border border-amber-100 flex items-start space-x-4 hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="bg-gradient-to-r from-amber-500 to-amber-400 rounded-full p-3 text-white">
                <FaWhatsapp className="text-xl" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-amber-800 mb-1">
                  {t.whatsapp}
                </h4>
                <p className="text-amber-700 mb-1">+91 98765 43210</p>
                <p className="text-amber-600 text-sm">
                  {t.whatsappResponse}
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-lg border border-amber-100 flex items-start space-x-4 hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="bg-gradient-to-r from-amber-500 to-amber-400 rounded-full p-3 text-white">
                <FaMapMarkerAlt className="text-xl" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-amber-800 mb-1">
                  {t.address}
                </h4>
                <p className="text-amber-700 mb-1">
                  {t.officeAddress}
                </p>
              </div>
            </motion.div>
          </div>
          
          {/* Map */}
          <div ref={mapRef} className="md:col-span-12 lg:col-span-3">
            <div className="bg-white p-3 rounded-xl shadow-lg border border-amber-100 h-full">
              <div className="rounded-lg overflow-hidden h-full relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124423.15338897629!2d77.45699118359374!3d12.953989399999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3de574f32283%3A0xbd80c6b7a8e39dce!2sBangalore%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sus!4v1650121180205!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="filter grayscale-[70%] hover:grayscale-0 transition-all duration-500"
                ></iframe>
                
                <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-lg shadow-md text-amber-800 text-sm font-medium border border-amber-200">
                  <FaMapMarkerAlt className="inline-block mr-1 text-amber-600" /> Bangalore, Karnataka, India
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 