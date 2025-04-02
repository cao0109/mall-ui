import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Product } from '@/components/product/product-card';

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
