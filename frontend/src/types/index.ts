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

export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
  icon: string;
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
