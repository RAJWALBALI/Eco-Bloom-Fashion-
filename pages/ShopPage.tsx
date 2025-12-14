import React from 'react';
import { useStore } from '../services/StoreContext';
import { ProductCard } from '../components/ProductCard';

interface ShopPageProps {
  category: 'men' | 'women';
}

export const ShopPage: React.FC<ShopPageProps> = ({ category }) => {
  const { products, searchQuery } = useStore();

  const filteredProducts = products.filter(
    (p) => 
      p.category === category && 
      (p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
       p.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif font-bold text-gray-900 capitalize">{category}'s Collection</h2>
        <p className="mt-4 text-gray-500">
            {searchQuery ? `Searching for "${searchQuery}" in ${category}` : `Explore our latest styles and trends for ${category}`}
        </p>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500 text-lg">No products found matching your search.</p>
        </div>
      )}
    </div>
  );
};