import { create } from "zustand";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  discount?: number | string;
  category?: string;
}

export interface Collection {
  id: string;
  name: string;
  items: WishlistItem[];
}

interface WishlistState {
  items: WishlistItem[];
  collections: Collection[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  toggleItem: (item: WishlistItem) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
  // Collection Actions
  createCollection: (name: string) => void;
  deleteCollection: (id: string) => void;
  addItemToCollection: (collectionId: string, item: WishlistItem) => void;
  removeItemFromCollection: (collectionId: string, itemId: string) => void;
  setWishlist: (items: WishlistItem[]) => void;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],
  collections: [],
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),
  toggleItem: (item) => {
    const { items, removeItem, addItem } = get();
    const exists = items.find((i) => i.id === item.id);
    if (exists) {
      removeItem(item.id);
    } else {
      addItem(item);
    }
  },
  isInWishlist: (id) => {
    return get().items.some((i) => i.id === id);
  },
  clearWishlist: () => set({ items: [], collections: [] }),

  createCollection: (name) =>
    set((state) => ({
      collections: [
        ...state.collections,
        { id: Date.now().toString(), name, items: [] },
      ],
    })),

  deleteCollection: (id) =>
    set((state) => ({
      collections: state.collections.filter((c) => c.id !== id),
    })),

  addItemToCollection: (collectionId, item) =>
    set((state) => ({
      collections: state.collections.map((c) =>
        c.id === collectionId
          ? {
              ...c,
              items: c.items.some((i) => i.id === item.id)
                ? c.items
                : [...c.items, item],
            }
          : c,
      ),
    })),

  removeItemFromCollection: (collectionId, itemId) =>
    set((state) => ({
      collections: state.collections.map((c) =>
        c.id === collectionId
          ? { ...c, items: c.items.filter((i) => i.id !== itemId) }
          : c,
      ),
    })),
  setWishlist: (items) => set({ items }),
}));
