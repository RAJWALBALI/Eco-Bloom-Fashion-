import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, LogOut, PackagePlus } from 'lucide-react';
import { useStore } from '../services/StoreContext';

export const Navbar = () => {
  const { cart, user, logout, searchQuery, setSearchQuery } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Determine which page to redirect to based on role or simple default
    if (window.location.hash !== '#/men' && window.location.hash !== '#/women') {
        navigate('/men'); // Default to shop view if searching from home
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-full font-serif text-xl font-bold">
                EB
              </div>
              <span className="font-serif font-bold text-2xl tracking-tight text-primary">ECO BLOOM</span>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition duration-150 ease-in-out"
                placeholder="Search Eco Bloom..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary font-medium">Home</Link>
            <Link to="/men" className="text-gray-700 hover:text-primary font-medium">Men</Link>
            <Link to="/women" className="text-gray-700 hover:text-primary font-medium">Women</Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary font-medium">Contact</Link>

            <div className="flex items-center space-x-4 border-l pl-6 border-gray-200">
              <Link to="/cart" className="relative text-gray-700 hover:text-primary transition">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="flex items-center gap-3">
                  {user.role === 'admin' && (
                     <Link to="/admin" title="Admin Dashboard">
                        <PackagePlus className="h-6 w-6 text-primary" />
                     </Link>
                  )}
                  <span className="text-sm font-semibold text-primary">{user.name}</span>
                  <button onClick={logout} className="text-gray-500 hover:text-red-500">
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="text-gray-700 hover:text-primary">
                  <User className="h-6 w-6" />
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             <input
                type="text"
                className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md mb-4"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
              />
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary">Home</Link>
            <Link to="/men" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary">Men</Link>
            <Link to="/women" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary">Women</Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary">Contact</Link>
            <Link to="/cart" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary">Cart ({cartCount})</Link>
            {user ? (
               <>
                 {user.role === 'admin' && <Link to="/admin" className="block px-3 py-2 text-primary font-bold">Admin Dashboard</Link>}
                 <button onClick={logout} className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-gray-50">Logout ({user.name})</button>
               </>
            ) : (
                 <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary">Login / Register</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};