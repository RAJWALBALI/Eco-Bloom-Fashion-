import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, User, Order } from '../types';
import { INITIAL_PRODUCTS } from './mockData';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  user: User | null;
  orders: Order[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  login: (email: string, role: 'admin' | 'customer') => void;
  logout: () => void;
  addProduct: (product: Product) => void;
  placeOrder: (method: 'UPI' | 'COD') => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load data from local storage on mount (Simulation of DB)
  useEffect(() => {
    const storedProducts = localStorage.getItem('eco_products');
    const storedUser = localStorage.getItem('eco_user');
    const storedCart = localStorage.getItem('eco_cart');
    const storedOrders = localStorage.getItem('eco_orders');

    if (storedProducts) setProducts(JSON.parse(storedProducts));
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedCart) setCart(JSON.parse(storedCart));
    if (storedOrders) setOrders(JSON.parse(storedOrders));
  }, []);

  // Save to local storage on changes
  useEffect(() => {
    localStorage.setItem('eco_products', JSON.stringify(products));
    localStorage.setItem('eco_cart', JSON.stringify(cart));
    localStorage.setItem('eco_orders', JSON.stringify(orders));
    if (user) {
      localStorage.setItem('eco_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('eco_user');
    }
  }, [products, cart, user, orders]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const login = (email: string, role: 'admin' | 'customer') => {
    setUser({
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email,
      role
    });
  };

  const logout = () => {
    setUser(null);
    setCart([]);
  };

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const placeOrder = (method: 'UPI' | 'COD') => {
    if (!user) return;
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      items: [...cart],
      total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      date: new Date().toISOString(),
      status: 'Processing',
      paymentMethod: method,
    };
    setOrders((prev) => [...prev, newOrder]);
    clearCart();
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        user,
        orders,
        searchQuery,
        setSearchQuery,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        login,
        logout,
        addProduct,
        placeOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};