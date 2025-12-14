import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { StoreProvider } from './services/StoreContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CartPage } from './pages/CartPage';
import { AuthPage } from './pages/AuthPage';
import { AdminPage } from './pages/AdminPage';
import { ContactPage } from './pages/ContactPage';

const Footer = () => (
  <footer className="bg-gray-900 text-white pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
      <div>
        <h3 className="text-2xl font-serif font-bold mb-4">Eco Bloom</h3>
        <p className="text-gray-400 mb-4">Your Style, Our Passion. Sustainable fashion for the modern world.</p>
        <p className="text-sm text-gray-500">&copy; 2025 Eco Bloom / The Trend Tree.</p>
      </div>
      <div>
        <h4 className="text-lg font-bold mb-4">Quick Links</h4>
        <ul className="space-y-2 text-gray-400">
            <li><a href="#/" className="hover:text-white">Home</a></li>
            <li><a href="#/men" className="hover:text-white">Men's Collection</a></li>
            <li><a href="#/women" className="hover:text-white">Women's Collection</a></li>
            <li><a href="#/contact" className="hover:text-white">Contact Us</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-bold mb-4">Newsletter</h4>
        <p className="text-gray-400 mb-4">Subscribe to get updates on new arrivals.</p>
        <div className="flex">
            <input type="email" placeholder="Your email" className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none w-full" />
            <button className="bg-accent px-4 py-2 rounded-r-md font-bold hover:bg-red-600">Join</button>
        </div>
      </div>
    </div>
  </footer>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const App = () => {
  return (
    <StoreProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/men" element={<ShopPage category="men" />} />
              <Route path="/women" element={<ShopPage category="women" />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </StoreProvider>
  );
};

export default App;