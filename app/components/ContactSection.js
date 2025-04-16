'use client';
import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { gsap } from 'gsap';
import { FaPhoneAlt, FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaPaperPlane, FaUser } from 'react-icons/fa';

export default function ContactSection() {
  const { language, translations } = useLanguage();
  const t = translations[language];
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const contactInfoRef = useRef(null);
  
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
          toggleActions: 'play none none none'
        }
      });
      
      tl.fromTo(titleRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8 }
      )
      .fromTo(formRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.4'
      )
      .fromTo(contactInfoRef.current.children, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.5 },
        '-=0.6'
      );
      
      return () => {
        if (tl.scrollTrigger) {
          tl.scrollTrigger.kill();
        }
        tl.kill();
      };
    };
    
    loadGsapPlugins();
  }, []);
  
  return (
    <section id="contact" className="py-16 bg-gradient-to-b from-amber-50 to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 ref={titleRef} className="text-4xl font-bold text-amber-900">
            {t.contactUs || 'Contact Us'}
          </h2>
          <p className="mt-4 text-amber-800 max-w-lg mx-auto">
            We&apos;d love to hear from you! Whether you have a question about our products, pricing, or anything else, our team is ready to assist you.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8 border border-amber-100">
              {showSuccess ? (
                <div className="bg-green-100 border border-green-200 text-green-700 p-4 rounded-md flex items-center">
                  <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Message sent successfully! We&apos;ll get back to you shortly.</span>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit}>
                  <div className="mb-5">
                    <label htmlFor="name" className="block text-amber-900 mb-2 font-medium">
                      {t.yourName || 'Your Name'}
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-amber-600">
                        <FaUser />
                      </div>
                      <input 
                        type="text" 
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-amber-50/50 text-amber-900"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-5">
                    <label htmlFor="email" className="block text-amber-900 mb-2 font-medium">
                      {t.emailAddress || 'Email Address'}
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-amber-600">
                        <FaEnvelope />
                      </div>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-amber-50/50 text-amber-900"
                        placeholder="email@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-5">
                    <label htmlFor="message" className="block text-amber-900 mb-2 font-medium">
                      {t.yourMessage || 'Your Message'}
                    </label>
                    <textarea 
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows="4" 
                      className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-amber-50/50 text-amber-900"
                      placeholder="How can we help you?"
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-800 hover:to-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg flex items-center justify-center w-full ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
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
                        <FaPaperPlane className="mr-2" /> {t.send || 'Send Message'}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
          
          {/* Contact Information */}
          <div>
            <div ref={contactInfoRef} className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-lg border border-amber-100 flex items-start space-x-4">
                <div className="bg-gradient-to-r from-amber-600 to-amber-500 rounded-full p-3 text-white">
                  <FaPhoneAlt />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-amber-900 mb-1">
                    {t.phone || 'Phone'}
                  </h4>
                  <p className="text-amber-800 mb-1">+91 98765 43210</p>
                  <p className="text-amber-700 text-sm">
                    {t.phoneHours || 'Monday to Friday, 9am to 6pm'}
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg border border-amber-100 flex items-start space-x-4">
                <div className="bg-gradient-to-r from-amber-600 to-amber-500 rounded-full p-3 text-white">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-amber-900 mb-1">
                    {t.email || 'Email'}
                  </h4>
                  <p className="text-amber-800 mb-1">info@bhatramanefoods.com</p>
                  <p className="text-amber-700 text-sm">
                    {t.emailResponse || 'We\'ll respond within 24 hours'}
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg border border-amber-100 flex items-start space-x-4">
                <div className="bg-gradient-to-r from-amber-600 to-amber-500 rounded-full p-3 text-white">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-amber-900 mb-1">
                    {t.address || 'Address'}
                  </h4>
                  <p className="text-amber-800">
                    Bhatramane Foods, <br />
                    No 61/D, Saravu, <br />
                    Beripadavu Post, <br />
                    Manjeshwar Taluk, <br />
                    KASARAGOD, Kerala, <br />
                    671322
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 