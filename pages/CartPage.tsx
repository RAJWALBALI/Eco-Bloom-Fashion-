import React, { useState } from 'react';
import { useStore } from '../services/StoreContext';
import { Trash2, Plus, Minus, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, placeOrder, user } = useStore();
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'COD'>('UPI');
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (!user) {
        navigate('/login');
        return;
    }
    placeOrder(paymentMethod);
    setShowSuccess(true);
    setTimeout(() => {
        setShowSuccess(false);
        navigate('/');
    }, 3000);
  };

  if (showSuccess) {
      return (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <ShieldCheck className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
              <p className="text-gray-600">Thank you for shopping with Eco Bloom.</p>
          </div>
      )
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added any items to your cart yet.</p>
        <Link to="/men" className="px-6 py-3 bg-primary text-white rounded-md hover:bg-gray-800 transition">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold mb-8">Shopping Cart</h1>
      
      <div className="lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-8">
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {cart.map((item) => (
                <li key={item.id} className="p-6 flex flex-col sm:flex-row items-center">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md mb-4 sm:mb-0 sm:mr-6" />
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <p className="mt-1 text-lg font-bold text-accent">${item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center mt-4 sm:mt-0 gap-4">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-gray-100">
                        <Minus size={16} />
                      </button>
                      <span className="px-4 font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-gray-100">
                        <Plus size={16} />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 p-2">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-4 mt-8 lg:mt-0">
          <div className="bg-white p-6 shadow-sm rounded-lg sticky top-24">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between">
                <span className="text-lg font-bold">Total</span>
                <span className="text-xl font-bold text-accent">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <div className="space-y-2">
                    <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                        <input type="radio" name="payment" value="UPI" checked={paymentMethod === 'UPI'} onChange={() => setPaymentMethod('UPI')} className="mr-3" />
                        <span>UPI / Online Payment</span>
                    </label>
                     <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                        <input type="radio" name="payment" value="COD" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className="mr-3" />
                        <span>Cash on Delivery</span>
                    </label>
                </div>
            </div>

            <button 
                onClick={handleCheckout}
                className="w-full bg-primary text-white py-3 rounded-md font-bold hover:bg-gray-800 transition shadow-lg"
            >
              {user ? 'Place Order' : 'Login to Checkout'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};