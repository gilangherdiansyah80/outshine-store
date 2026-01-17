import { create } from "zustand";

interface LoadingState {
  // Derived state
  isLoading: boolean;

  // Internal states
  routeLoading: boolean;
  dataLoadingCount: number;

  // Actions
  setRouteLoading: (loading: boolean) => void;
  startDataLoading: () => void;
  stopDataLoading: () => void;
}

export const useLoadingStore = create<LoadingState>((set, get) => ({
  isLoading: false,
  routeLoading: false,
  dataLoadingCount: 0,

  setRouteLoading: (loading) => {
    set({ routeLoading: loading });
    set({ isLoading: loading || get().dataLoadingCount > 0 });
  },

  startDataLoading: () => {
    set((state) => {
      const nextCount = state.dataLoadingCount + 1;
      return {
        dataLoadingCount: nextCount,
        isLoading: state.routeLoading || nextCount > 0,
      };
    });
  },

  stopDataLoading: () => {
    set((state) => {
      const nextCount = Math.max(0, state.dataLoadingCount - 1);
      return {
        dataLoadingCount: nextCount,
        isLoading: state.routeLoading || nextCount > 0,
      };
    });
  },
}));
