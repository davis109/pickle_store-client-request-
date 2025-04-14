import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <main>
      <Navbar />
      
      {/* About Hero */}
      <div className="bg-green-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="max-w-2xl mx-auto">
            Learn about our journey in preserving traditional pickle-making art with a modern approach
          </p>
        </div>
      </div>
      
      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/IMG-20250414-WA0077.jpg"
                alt="Bhatramane Foods Traditional Methods"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-green-800 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Bhatramane Foods was born out of a passion for preserving the authentic taste and 
                  traditional methods of pickle making that have been passed down through generations 
                  in our family.
                </p>
                <p>
                  Located in the serene surroundings of Saravu in Kasaragod, Kerala, we started as a 
                  small family venture with the goal of sharing our home-made pickles with a wider audience.
                </p>
                <p>
                  What sets us apart is our commitment to using only natural ingredients and traditional 
                  preservation methods. We take pride in crafting pickles that contain no chemical 
                  preservatives, no artificial colors, no chemical taste enhancers, and no oil.
                </p>
                <p>
                  Our tagline "ಪರಿಶುದ್ಧ ಆಹಾರ, ಪರಿಪೂರ್ಣ ರುಚಿ" (Pure Food, Perfect Taste) reflects our 
                  philosophy and commitment to quality and tradition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Mission */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-6">Our Mission</h2>
          <p className="max-w-3xl mx-auto text-gray-700 text-lg mb-10">
            At Bhatramane Foods, our mission is to preserve and promote the traditional art of 
            pickle making while adapting to modern health-conscious preferences. We aim to bring the 
            authentic taste of handcrafted pickles to every home, made with love and care.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-green-800 mb-3">Preserve Tradition</h3>
              <p className="text-gray-600">
                We are committed to preserving traditional recipes and methods of pickle making that are 
                at risk of being lost in today's fast-paced world.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-green-800 mb-3">Health Conscious</h3>
              <p className="text-gray-600">
                We create products that align with modern health preferences without compromising on taste, 
                eliminating harmful additives and excess oil.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-green-800 mb-3">Support Local</h3>
              <p className="text-gray-600">
                We source our ingredients locally whenever possible, supporting farmers and ensuring 
                the freshest produce for our pickles.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Production Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-800 mb-10 text-center">Our Traditional Process</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0 mt-1">1</div>
                  <div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">Selection of Ingredients</h3>
                    <p className="text-gray-600">
                      We carefully select the freshest fruits, vegetables, and spices, often sourcing directly from local farmers.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0 mt-1">2</div>
                  <div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">Traditional Preparation</h3>
                    <p className="text-gray-600">
                      Each ingredient is cleaned, cut, and prepared according to traditional methods that enhance its natural flavor.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0 mt-1">3</div>
                  <div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">Natural Preservation</h3>
                    <p className="text-gray-600">
                      We use salt and natural spices for preservation, avoiding chemical additives that compromise health and taste.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0 mt-1">4</div>
                  <div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">Maturing Process</h3>
                    <p className="text-gray-600">
                      Our pickles are allowed to mature naturally, developing their rich flavors over time without rushing the process.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/IMG-20250414-WA0080.jpg"
                alt="Our Traditional Pickle Making Process"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Quote Section */}
      <section className="py-20 bg-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <blockquote className="text-2xl md:text-3xl font-light italic max-w-4xl mx-auto">
            "Our commitment is not just to make pickles, but to preserve a cultural legacy that celebrates 
            the art of traditional food preparation while embracing the health consciousness of modern times."
          </blockquote>
          <cite className="block mt-6 text-lg">— Founder, Bhatramane Foods</cite>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 