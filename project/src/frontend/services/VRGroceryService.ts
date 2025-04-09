import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  modelUrl: string;
}

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  userId: string;
}

export interface VRSession {
  id: string;
  userId: string;
  startTime: string;
  endTime?: string;
  status: string;
}

export const VRGroceryService = {
  // Product endpoints
  getProducts: async (): Promise<Product[]> => {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  },

  getProduct: async (id: number): Promise<Product> => {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const response = await axios.get(`${API_BASE_URL}/products/category/${category}`);
    return response.data;
  },

  // Cart endpoints
  getCart: async (userId: string): Promise<CartItem[]> => {
    const response = await axios.get(`${API_BASE_URL}/cart/${userId}`);
    return response.data;
  },

  addToCart: async (cartItem: Omit<CartItem, 'id'>): Promise<CartItem> => {
    const response = await axios.post(`${API_BASE_URL}/cart`, cartItem);
    return response.data;
  },

  updateCartItem: async (id: number, cartItem: CartItem): Promise<void> => {
    await axios.put(`${API_BASE_URL}/cart/${id}`, cartItem);
  },

  deleteCartItem: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/cart/${id}`);
  },

  // VR Session endpoints
  startVRSession: async (userId: string): Promise<VRSession> => {
    const response = await axios.post(`${API_BASE_URL}/vrsession/start`, { userId });
    return response.data;
  },

  endVRSession: async (sessionId: string): Promise<void> => {
    await axios.post(`${API_BASE_URL}/vrsession/${sessionId}/end`);
  },

  getVRSession: async (sessionId: string): Promise<VRSession> => {
    const response = await axios.get(`${API_BASE_URL}/vrsession/${sessionId}`);
    return response.data;
  },

  getUserSessions: async (userId: string): Promise<VRSession[]> => {
    const response = await axios.get(`${API_BASE_URL}/vrsession/user/${userId}`);
    return response.data;
  }
}; 