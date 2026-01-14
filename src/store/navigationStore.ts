import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  NavigationActions,
  NavigationState,
  StackEntry,
} from "@outshine/lib/types";

// Internal state for safety features
interface InternalNavigationState extends NavigationState {
  navigationAttempts: number;
  lastNavigationTime: number;
  actions: NavigationActions & {
    setHasHydrated: () => void;
    setHasReady: () => void;
    setIsDoingRealNavigation: (value: boolean) => void;
    resetNavigationSafety: () => void;
    setNavigationAttempts: (attempts: number) => void;
  };
}

/**
 * Zustand-based navigation store
 */
const useNavigationStore = create<InternalNavigationState>()(
  persist(
    (set) => ({
      stack: [{ path: "/", params: {} }],
      isHydrated: false,
      isReady: true, // Default to true since we temporarily disabled sync
      isDoingRealNavigation: true,
      navigationAttempts: 0,
      lastNavigationTime: 0,
      actions: {
        push: (path: string, params: Record<string, unknown> = {}) =>
          set((state) => {
            try {
              const freshParams = params
                ? JSON.parse(JSON.stringify(params))
                : {};
              return {
                stack: [...state.stack, { path, params: freshParams }],
              };
            } catch (error) {
              console.error("[ResponsiveNavigation] Push error:", error);
              return state;
            }
          }),
        pop: () =>
          set((state) => {
            if (state.stack.length > 1) {
              return { stack: state.stack.slice(0, -1) };
            }
            return state;
          }),
        popTo: (path: string) =>
          set((state) => {
            const targetIndex = state.stack.findIndex(
              (entry: StackEntry) => entry.path === path
            );
            if (targetIndex === -1) return state;
            return { stack: state.stack.slice(0, targetIndex + 1) };
          }),
        popToTop: () =>
          set((state) => ({
            stack: state.stack.slice(0, 1),
          })),
        replace: (path: string, params: Record<string, unknown> = {}) =>
          set((state) => {
            try {
              const freshParams = params
                ? JSON.parse(JSON.stringify(params))
                : {};
              return { stack: [{ path, params: freshParams }] };
            } catch (error) {
              console.error("[ResponsiveNavigation] Replace error:", error);
              return state;
            }
          }),

        setHasHydrated: () => set({ isHydrated: true }),
        setHasReady: () => set({ isReady: true }),
        setIsDoingRealNavigation: (value: boolean) =>
          set({ isDoingRealNavigation: value }),
        resetNavigationSafety: () =>
          set({ navigationAttempts: 0, lastNavigationTime: 0 }),
        setNavigationAttempts: (attempts: number) =>
          set({ navigationAttempts: attempts }),
      },
    }),
    {
      name: "responsive-navigation",
      partialize: (state) => ({
        stack: state.stack.map((entry) => ({
          path: entry.path,
          params: { ...entry.params },
        })),
        navigationAttempts: 0,
        lastNavigationTime: 0,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        // Immediately mark as hydrated without delay
        state.actions?.setHasHydrated?.();
      },
    }
  )
);

export { useNavigationStore };
export type { InternalNavigationState };
