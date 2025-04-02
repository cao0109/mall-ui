import { create } from 'zustand';

interface LoadingState {
  isLoading: boolean;
  loadingText?: string;
  startLoading: (text?: string) => void;
  stopLoading: () => void;
}

export const useLoadingStore = create<LoadingState>(set => ({
  isLoading: false,
  loadingText: undefined,
  startLoading: text => set({ isLoading: true, loadingText: text }),
  stopLoading: () => set({ isLoading: false, loadingText: undefined }),
}));
