export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'All' | 'Electronics' | 'Fashion' | 'Home' | 'Food';
  description: string;
  images: string[];
  colors: string[];
  sizes?: string[];
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export type Category = 'All' | 'Electronics' | 'Fashion' | 'Home' | 'Food';