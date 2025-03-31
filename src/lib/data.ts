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
  supplier: {
    name: string;
    logo?: string;
    rating: number;
  };
}

export const products: Product[] = [
// ... existing code ...
]; 