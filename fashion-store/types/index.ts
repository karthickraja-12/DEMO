// Types for the fashion store application

export type Role = "CUSTOMER" | "ADMIN";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";
export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
}

export interface Variant {
  id: string;
  productId: string;
  size: Size;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: Category;
  categoryId: string;
  variants: Variant[];
  isFeatured: boolean;
  isOnSale: boolean;
  tags: string[];
  createdAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;
  product: Product;
  variant: Variant;
}

export interface Cart {
  id: string;
  items: CartItem[];
}

export interface OrderItem {
  id: string;
  productId: string;
  size: Size;
  quantity: number;
  price: number;
  product: Product;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  address?: string;
  createdAt: string;
}

// Cart store types
export interface CartStoreItem {
  id: string;
  productId: string;
  variantId: string;
  name: string;
  price: number;
  image: string;
  size: Size;
  quantity: number;
  stock: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}
