import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const HomePage = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="relative bg-primary text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="C:\Users\hp\OneDrive\Pictures"
            alt="Fashion Background" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center text-center">
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            The Trend Tree
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl text-gray-200 font-light">
            Discover the latest trends in sustainable clothing. Your Style, Our Passion.
          </p>
          <div className="flex gap-4">
            <Link 
              to="/men" 
              className="px-8 py-3 bg-white text-primary font-bold rounded-full hover:bg-gray-100 transition duration-300"
            >
              Shop Men
            </Link>
            <Link 
              to="/women" 
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-primary transition duration-300"
            >
              Shop Women
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900">Why Eco Bloom?</h2>
          <div className="w-16 h-1 bg-accent mx-auto mt-4"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-sm text-center">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌿</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Sustainable Materials</h3>
            <p className="text-gray-600">100% organic cotton and recycled fabrics.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚚</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Free shipping on orders over $100.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm text-center">
             <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💎</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
            <p className="text-gray-600">Crafted with attention to detail and durability.</p>
          </div>
        </div>
      </section>

      {/* Featured Collections Teaser */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-96 group overflow-hidden rounded-2xl">
              <img src="https://images.unsplash.com/photo-1516257984-b1b4d8c9230c?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover transition duration-700 group-hover:scale-110" alt="Men" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                <div>
                  <h3 className="text-3xl font-serif text-white font-bold mb-2">Men's Collection</h3>
                  <Link to="/men" className="text-white flex items-center gap-2 hover:underline">Explore <ArrowRight size={16}/></Link>
                </div>
              </div>
            </div>
            <div className="relative h-96 group overflow-hidden rounded-2xl">
              <img src="https://images.unsplash.com/photo-1596783439326-8c1874fe6500?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover transition duration-700 group-hover:scale-110" alt="Women" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                <div>
                  <h3 className="text-3xl font-serif text-white font-bold mb-2">Women's Collection</h3>
                  <Link to="/women" className="text-white flex items-center gap-2 hover:underline">Explore <ArrowRight size={16}/></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};