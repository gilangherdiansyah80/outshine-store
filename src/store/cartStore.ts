import { create } from "zustand";

export interface CartItem {
  id: string; // productId
  name: string;
  price: number;
  originalPrice?: number;
  formattedDiscounted?: string;
  formattedOriginal?: string;
  isPo?: boolean;
  poDpPercent?: number;
  sizeId: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

export type AddCartItem = Omit<CartItem, "quantity"> & {
  quantity?: number;
};

interface CartState {
  items: CartItem[];
  addItem: (item: AddCartItem) => void;
  removeItem: (id: string, size: string, color: string) => void;
  updateQuantity: (
    id: string,
    size: string,
    color: string,
    delta: number,
  ) => void;
  clearCart: () => void;
  setItems: (items: CartItem[]) => void;
  getTotalPrice: () => number;
  buyNowItem: CartItem | null;
  setBuyNowItem: (item: CartItem | null) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  buyNowItem: null,
  setBuyNowItem: (item) => set({ buyNowItem: item }),
  addItem: (newItem: AddCartItem) => {
    const { items } = get();
    const quantityToAdd = newItem.quantity || 1;
    const existingItem = items.find(
      (i) =>
        i.id === newItem.id &&
        i.size === newItem.size &&
        i.color === newItem.color,
    );

    if (existingItem) {
      set({
        items: items.map((i) =>
          i.id === newItem.id &&
          i.size === newItem.size &&
          i.color === newItem.color
            ? { ...i, quantity: i.quantity + quantityToAdd }
            : i,
        ),
      });
    } else {
      set({
        items: [...items, { ...newItem, quantity: quantityToAdd }],
      });
    }
  },
  removeItem: (id, size, color) =>
    set((state) => ({
      items: state.items.filter(
        (i) => !(i.id === id && i.size === size && i.color === color),
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
  setItems: (items) => set({ items }),
  getTotalPrice: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));
