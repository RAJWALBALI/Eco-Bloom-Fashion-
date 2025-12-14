import React, { useState } from 'react';
import { useStore } from '../services/StoreContext';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';

export const AdminPage = () => {
  const { user, addProduct } = useStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    price: 0,
    category: 'men',
    description: '',
    image: '"C:\Users\hp\OneDrive\Pictures\download.jpg"' // Default placeholder
  });

  if (!user || user.role !== 'admin') {
    return (
        <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
            <button onClick={() => navigate('/')} className="mt-4 text-blue-600 underline">Go Home</button>
        </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.price) {
        addProduct({
            id: Math.random().toString(36).substr(2, 9),
            name: formData.name,
            price: Number(formData.price),
            category: formData.category as 'men' | 'women',
            description: formData.description || '',
            image: formData.image || 'https://picsum.photos/400/500'
        });
        alert('Product added successfully!');
        setFormData({ name: '', price: 0, category: 'men', description: '', image: 'https://picsum.photos/400/500' });
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-serif font-bold mb-8">Admin Dashboard: Add Stock</h1>
      
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input 
                type="text" 
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                <input 
                    type="number" 
                    required
                    min="0"
                    step="0.01"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value as 'men' | 'women'})}
                >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                </select>
              </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                rows={3}
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input 
                type="text" 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                value={formData.image}
                onChange={e => setFormData({...formData, image: e.target.value})}
            />
            <p className="text-xs text-gray-500 mt-1">Leave as default for a random placeholder.</p>
          </div>

          <button 
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};