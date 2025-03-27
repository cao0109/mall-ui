export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  profitMargin: number;
  minOrder: number;
  shippingTime: string;
  supplier: {
    name: string;
    rating: number;
    logo?: string;
  };
  description?: string;
  origin?: string;
  suggestedPrice?: number;
  shopUrl?: string;
} 