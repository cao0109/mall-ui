export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  suggestedPrice: number;
  profitMargin: number;
  minOrder: number;
  shippingTime: string;
  categoryId?: string;
  origin: string;
  shopUrl: string;
  supplier: {
    name: string;
    logo?: string;
    rating: number;
  };
}

export interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
}

export const categories: Category[] = [
  {
    id: "electronics",
    name: "电子产品",
    image: "https://images.unsplash.com/photo-1588648143610-6425c7947bd1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D",
    count: 120
  },
  {
    id: "clothing",
    name: "服装鞋帽",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    count: 245
  },
  {
    id: "home",
    name: "家居日用",
    image: "https://images.unsplash.com/photo-1495627775797-d7316a162f57?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvbWUlMjBnb29kc3xlbnwwfHwwfHx8MA%3D%3D",
    count: 189
  },
  {
    id: "beauty",
    name: "美妆个护",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXR5JTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D",
    count: 156
  }
];

export const products: Product[] = [
// ... existing code ...
]; 