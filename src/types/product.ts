import { PricedProduct as MedusaPricedProduct } from '@medusajs/medusa/dist/types/pricing';

export interface ProductReview {
  id: string;
  title: string;
  content: string;
  rating: number;
  customer?: {
    first_name?: string;
    last_name?: string;
    email: string;
  };
  created_at: string;
}

export interface PricedProduct extends MedusaPricedProduct {
  reviews?: ProductReview[];
}
