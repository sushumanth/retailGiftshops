export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  tag?: 'NEW' | 'BESTSELLER' | 'SALE';
  description: string;
  inStock: boolean;
  rating?: number;
  reviews?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  productCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

export interface NavItem {
  label: string;
  href: string;
}
