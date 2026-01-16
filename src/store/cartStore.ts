import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string, size: string, color: string) => void;
  updateQuantity: (
    id: string,
    size: string,
    color: string,
    delta: number
  ) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => {
        const { items } = get();
        const existingItem = items.find(
          (i) =>
            i.id === newItem.id &&
            i.size === newItem.size &&
            i.color === newItem.color
        );

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.id === newItem.id &&
              i.size === newItem.size &&
              i.color === newItem.color
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({
            items: [...items, { ...newItem, quantity: 1 }],
          });
        }
      },
      removeItem: (id, size, color) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.id === id && i.size === size && i.color === color)
          ),
        })),
      updateQuantity: (id, size, color, delta) => {
        const { items } = get();
        set({
          items: items.map((i) => {
            if (i.id === id && i.size === size && i.color === color) {
              const newQty = Math.max(1, i.quantity + delta);
              return { ...i, quantity: newQty };
            }
            return i;
          }),
        });
      },
      clearCart: () => set({ items: [] }),
      getTotalPrice: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "outshine-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
