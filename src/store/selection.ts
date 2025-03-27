import { Product } from "@/components/product/product-card";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SelectionState {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: number) => void;
  clearProducts: () => void;
}

export const useSelectionStore = create<SelectionState>()(
  persist(
    (set) => ({
      products: [],
      addProduct: (product) =>
        set((state) => ({
          products: state.products.some((p) => p.id === product.id)
            ? state.products
            : [...state.products, product],
        })),
      removeProduct: (productId) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== productId),
        })),
      clearProducts: () => set({ products: [] }),
    }),
    {
      name: "selection-storage",
    }
  )
); 