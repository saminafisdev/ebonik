export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

export interface Product {
  id: number;
  store: number;
  store_name: string;
  category: number;
  category_name: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  stock: number;
  is_active: boolean;
  images: { id: number; image: string }[];
  created_at: string;
  updated_at: string;
}
export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  total_price: number;
}

export interface Cart {
  id: string; // UUID string
  items: CartItem[];
  total_price: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number | null; // null if top-level, otherwise parent category id
  subcategories: string[]; // list of subcategory names
  products_count: number;
}

export interface FilterState {
  priceRange: [number, number];
  brands: string[];
  ratings: number[];
  categories: string[];
  searchQuery: string;
}

export interface SortOption {
  label: string;
  value: string;
}
