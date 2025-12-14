import React from 'react';
import { Product } from '../types';
import { useStore } from '../services/StoreContext';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useStore();

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
      <div className="relative overflow-hidden aspect-[4/5]">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300" />
        
        <button 
          onClick={() => addToCart(product)}
          className="absolute bottom-4 right-4 bg-white text-primary p-3 rounded-full shadow-lg transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-white"
          title="Add to Cart"
        >
          <ShoppingBag className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-5">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{product.category}</p>
        <h3 className="font-serif text-lg font-bold text-gray-900 mb-2 truncate">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-accent">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};