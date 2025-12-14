export interface Product {
  id: string;
  name: string;
  category: 'men' | 'women';
  price: number;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
  paymentMethod: 'UPI' | 'COD';
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}