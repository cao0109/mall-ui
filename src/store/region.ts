import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RegionState {
  regionId: string | null;
  setRegionId: (regionId: string) => void;
  clearRegionId: () => void;
}

export const useRegionStore = create<RegionState>()(
  persist(
    set => ({
      regionId: null,
      setRegionId: regionId => set({ regionId }),
      clearRegionId: () => set({ regionId: null }),
    }),
    {
      name: 'region-storage',
    }
  )
);
