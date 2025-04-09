export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  modelUrl: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Apple",
    category: "Fruits",
    price: 0.99,
    description: "Fresh red apple",
    imageUrl: "/assets/textures/apple.jpg",
    modelUrl: "/assets/models/apple.glb"
  },
  {
    id: 2,
    name: "Bread",
    category: "Bakery",
    price: 2.49,
    description: "Freshly baked whole wheat bread",
    imageUrl: "/assets/textures/bread.jpg",
    modelUrl: "/assets/models/bread.glb"
  },
  {
    id: 3,
    name: "Milk",
    category: "Dairy",
    price: 3.99,
    description: "Fresh whole milk",
    imageUrl: "/assets/textures/milk.jpg",
    modelUrl: "/assets/models/milk.glb"
  },
  {
    id: 4,
    name: "Eggs",
    category: "Dairy",
    price: 4.99,
    description: "Farm fresh eggs, 12 count",
    imageUrl: "/assets/textures/eggs.jpg",
    modelUrl: "/assets/models/eggs.glb"
  },
  {
    id: 5,
    name: "Chicken",
    category: "Meat",
    price: 7.99,
    description: "Fresh chicken breast",
    imageUrl: "/assets/textures/chicken.jpg",
    modelUrl: "/assets/models/chicken.glb"
  }
]; 