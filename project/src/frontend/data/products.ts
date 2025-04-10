export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  modelUrl?: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Fresh Apples",
    category: "Fruits",
    price: 2.99,
    description: "Crisp and sweet red apples, perfect for snacking or baking",
    imageUrl: "/images/products/apples.jpg"
  },
  {
    id: 2,
    name: "Whole Wheat Bread",
    category: "Bakery",
    price: 3.49,
    description: "Freshly baked whole wheat bread, rich in fiber",
    imageUrl: "/images/products/bread.jpg"
  },
  {
    id: 3,
    name: "Organic Milk",
    category: "Dairy",
    price: 4.99,
    description: "Fresh organic whole milk from local farms",
    imageUrl: "/images/products/milk.jpg"
  },
  {
    id: 4,
    name: "Farm Fresh Eggs",
    category: "Dairy",
    price: 3.99,
    description: "Large brown eggs from free-range chickens",
    imageUrl: "/images/products/eggs.jpg"
  },
  {
    id: 5,
    name: "Whole Chicken",
    category: "Meat",
    price: 7.99,
    description: "Boneless, skinless chicken breast fillets",
    imageUrl: "/images/products/chicken.jpg"
  },
  {
    id: 6,
    name: "Fresh Bananas",
    category: "Fruits",
    price: 1.99,
    description: "Ripe yellow bananas, rich in potassium",
    imageUrl: "/images/products/bananas.jpg"
  },
  {
    id: 7,
    name: "Orange Juice",
    category: "Beverages",
    price: 4.49,
    description: "100% pure squeezed orange juice, no pulp",
    imageUrl: "/images/products/orange-juice.jpg"
  },
  {
    id: 8,
    name: "Cheddar Cheese",
    category: "Dairy",
    price: 5.99,
    description: "Sharp cheddar cheese, aged for extra flavor",
    imageUrl: "/images/products/cheese.jpg"
  },
  {
    id: 9,
    name: "Fresh Carrots",
    category: "Vegetables",
    price: 2.49,
    description: "Organic carrots, perfect for snacking or cooking",
    imageUrl: "/images/products/carrots.jpeg"
  },
  {
    id: 10,
    name: "Potato Chips",
    category: "Snacks",
    price: 3.29,
    description: "Classic salted potato chips, crispy and fresh",
    imageUrl: "/images/products/chips.jpg"
  }
]; 