import type { Product, Category } from "../types";

export const categories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    image:
      "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400",
    productCount: 245,
    icon: "laptop",
  },
  {
    id: "2",
    name: "Fashion",
    image:
      "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400",
    productCount: 512,
    icon: "shopping-bag",
  },
  {
    id: "3",
    name: "Home & Garden",
    image:
      "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=400",
    productCount: 189,
    icon: "home",
  },
  {
    id: "4",
    name: "Sports",
    image:
      "https://images.pexels.com/photos/2202685/pexels-photo-2202685.jpeg?auto=compress&cs=tinysrgb&w=400",
    productCount: 328,
    icon: "trophy",
  },
  {
    id: "5",
    name: "Books",
    image:
      "https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg?auto=compress&cs=tinysrgb&w=400",
    productCount: 876,
    icon: "book",
  },
  {
    id: "6",
    name: "Toys & Games",
    image:
      "https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400",
    productCount: 432,
    icon: "gift",
  },
  {
    id: "7",
    name: "Beauty",
    image:
      "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=400",
    productCount: 267,
    icon: "sparkles",
  },
  {
    id: "8",
    name: "Automotive",
    image:
      "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=400",
    productCount: 154,
    icon: "car",
  },
];

export const products: Product[] = [
  {
    id: "1",
    title: "Wireless Bluetooth Headphones",
    price: 79.99,
    originalPrice: 129.99,
    image:
      "https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.5,
    reviewCount: 234,
    category: "Electronics",
    brand: "TechPro",
    description: "Premium wireless headphones with noise cancellation",
    inStock: true,
  },
  {
    id: "2",
    title: "Smart Watch Series 5",
    price: 299.99,
    image:
      "https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.8,
    reviewCount: 567,
    category: "Electronics",
    brand: "SmartTech",
    description: "Advanced fitness tracking and health monitoring",
    inStock: true,
  },
  {
    id: "3",
    title: "Designer Sunglasses",
    price: 149.99,
    originalPrice: 249.99,
    image:
      "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.3,
    reviewCount: 89,
    category: "Fashion",
    brand: "StyleCo",
    description: "UV protection with premium frames",
    inStock: true,
  },
  {
    id: "4",
    title: "Leather Backpack",
    price: 89.99,
    image:
      "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.6,
    reviewCount: 312,
    category: "Fashion",
    brand: "UrbanStyle",
    description: "Genuine leather with multiple compartments",
    inStock: true,
  },
  {
    id: "5",
    title: "Coffee Maker Pro",
    price: 124.99,
    originalPrice: 179.99,
    image:
      "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.7,
    reviewCount: 445,
    category: "Home & Garden",
    brand: "HomePro",
    description: "Programmable coffee maker with thermal carafe",
    inStock: true,
  },
  {
    id: "6",
    title: "Yoga Mat Premium",
    price: 34.99,
    image:
      "https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.4,
    reviewCount: 201,
    category: "Sports",
    brand: "FitLife",
    description: "Non-slip, eco-friendly yoga mat",
    inStock: true,
  },
  {
    id: "7",
    title: "Running Shoes Elite",
    price: 119.99,
    originalPrice: 159.99,
    image:
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.9,
    reviewCount: 678,
    category: "Sports",
    brand: "SportMax",
    description: "Cushioned running shoes for maximum comfort",
    inStock: true,
  },
  {
    id: "8",
    title: "Bestselling Novel Collection",
    price: 29.99,
    image:
      "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.6,
    reviewCount: 523,
    category: "Books",
    brand: "BookWorld",
    description: "Collection of 5 bestselling novels",
    inStock: true,
  },
  {
    id: "9",
    title: "Mechanical Keyboard RGB",
    price: 159.99,
    image:
      "https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.8,
    reviewCount: 412,
    category: "Electronics",
    brand: "TechPro",
    description: "Gaming keyboard with RGB backlight",
    inStock: true,
  },
  {
    id: "10",
    title: "Portable Speaker Waterproof",
    price: 49.99,
    originalPrice: 79.99,
    image:
      "https://images.pexels.com/photos/1279136/pexels-photo-1279136.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.5,
    reviewCount: 289,
    category: "Electronics",
    brand: "SoundWave",
    description: "Bluetooth speaker with 20-hour battery",
    inStock: true,
  },
  {
    id: "11",
    title: "Winter Jacket Insulated",
    price: 179.99,
    image:
      "https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.7,
    reviewCount: 334,
    category: "Fashion",
    brand: "OutdoorGear",
    description: "Waterproof winter jacket with hood",
    inStock: true,
  },
  {
    id: "12",
    title: "Indoor Plant Set",
    price: 44.99,
    image:
      "https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.4,
    reviewCount: 156,
    category: "Home & Garden",
    brand: "GreenLife",
    description: "Set of 3 easy-care indoor plants",
    inStock: true,
  },
];

export const brands = [
  "TechPro",
  "SmartTech",
  "StyleCo",
  "UrbanStyle",
  "HomePro",
  "FitLife",
  "SportMax",
  "BookWorld",
  "SoundWave",
  "OutdoorGear",
  "GreenLife",
];
