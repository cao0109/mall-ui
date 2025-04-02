import { ProductCategory as MedusaProductCategory } from '@medusajs/medusa';

declare module '@medusajs/medusa' {
  interface ProductCategory extends MedusaProductCategory {
    image?: string;
  }
}
