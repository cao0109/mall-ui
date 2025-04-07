import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  profitMargin: number;
  minOrder: number;
  shippingTime: string;
  supplier: {
    name: string;
    logo: string;
    rating: number;
  };
  suggestedPrice: number;
  shopUrl: string;
  origin: string;
  variant?: {
    id: string;
    title: string;
    sku: string;
  };
}

interface SelectionState {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  clearProducts: () => void;
}

export const useSelectionStore = create<SelectionState>()(
  persist(
    set => ({
      products: [],
      addProduct: product =>
        set(state => ({
          products: state.products.some(p => p.id === product.id)
            ? state.products
            : [...state.products, product],
        })),
      removeProduct: productId =>
        set(state => ({
          products: state.products.filter(p => p.id !== productId),
        })),
      clearProducts: () => set({ products: [] }),
    }),
    {
      name: 'selection-storage',
    }
  )
);
