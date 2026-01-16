import { useCartStore } from "@outshine/store/cartStore";

export const useCart = () => {
  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalPrice,
  } = useCartStore();

  return {
    items,
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalPrice: getTotalPrice(),
  };
};
