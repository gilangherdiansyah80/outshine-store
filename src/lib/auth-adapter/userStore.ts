import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import type { DefaultAuthUserWithLoggedIn } from "./auth-adapter";

interface UserStoreState {
  dataUser: DefaultAuthUserWithLoggedIn | null;
  dataMatrix: unknown | null;
  isLoading: boolean;
  actions: {
    setUser: (val: DefaultAuthUserWithLoggedIn) => void;
    setDataMatrix: (data: unknown) => void;
    clearUser: () => void;
    setLoading: (loading: boolean) => void;
  };
}

export const useUserStore = create<UserStoreState>()(
  devtools(
    persist(
      (set) => ({
        dataUser: null,
        dataMatrix: null,
        isLoading: true,
        actions: {
          setUser: (val: DefaultAuthUserWithLoggedIn) =>
            set((state) => ({
              dataUser: {
                ...(state?.dataUser ? state.dataUser : {}),
                ...val,
              } as DefaultAuthUserWithLoggedIn,
            })),
          setDataMatrix: (data: unknown) =>
            set((state) => ({
              dataMatrix: {
                ...(state?.dataMatrix ? (state.dataMatrix as object) : {}),
                ...(data as object),
              },
            })),
          clearUser: () => set({ dataUser: null, dataMatrix: null }),
          setLoading: (loading) => {
            set({ isLoading: loading });
          },
        },
      }),
      {
        name: "t-ng",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          dataUser: state.dataUser,
          dataMatrix: state.dataMatrix,
        }),
        onRehydrateStorage: () => (state, error) => {
          if (error) {
            state?.actions?.clearUser?.();
          }
        },
      },
    ),
    {
      name: "auth-user-store",
    },
  ),
);

export const useUserActions = () => {
  return useUserStore((state) => state.actions);
};
