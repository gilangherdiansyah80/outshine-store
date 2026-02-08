import { useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import {
  ChevronLeft,
  MoreHorizontal,
  ShoppingBag,
  Loader2,
} from "lucide-react";
import {
  useCartStore,
  type CartItem as CartItemStore,
} from "@outshine/store/cartStore";
import { useAddressStore } from "@/store/addressStore";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import { useGetCart } from "@/services/Carts/useGetCart";

const CartScreen = () => {
  const navigate = useNavigate();
  const { items, setItems, setBuyNowItem } = useCartStore();
  const { actions } = useAddressStore();
  const { cartData, isLoading } = useGetCart();

  useEffect(() => {
    // Reset flow items and selection
    setBuyNowItem(null);
    actions.resetSelection();
  }, [setBuyNowItem, actions]);

  // Sync store with backend data
  useEffect(() => {
    if (cartData?.items) {
      const mappedItems = cartData.items.map((item) => ({
        id: item.productId,
        name: item.productName,
        price: item.price,
        originalPrice: Number(item.originalPrice),
        formattedDiscounted: item.formattedPrice,
        formattedOriginal: item.formattedOriginalPrice,
        image: item.productImage,
        sizeId: item.sizeId,
        size: item.sizeName,
        color: "Standard",
        quantity: item.quantity,
      }));
      setItems(mappedItems);
    }
  }, [cartData, setItems]);

  const subtotal = useMemo(() => {
    return items.reduce(
      (acc, item) => acc + (item.originalPrice || item.price) * item.quantity,
      0,
    );
  }, [items]);

  const total = cartData?.totalAmount || 0;
  const discountTotal = subtotal > total ? subtotal - total : 0;

  if (isLoading && items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans flex flex-col">
      {/* Header */}
      <header className="px-5 py-6 flex items-center justify-between sticky top-0 bg-[#0B0F19] z-20">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#283450] text-gray-300 hover:bg-[#2A3040] transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-white">Keranjang Belanja</h1>
        <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#1F2430] text-gray-300 hover:bg-[#2A3040] transition-colors">
          <MoreHorizontal size={24} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-5 pb-[420px]">
        {items.length > 0 ? (
          <div className="space-y-6">
            {/* Cart Items List */}
            <div className="flex flex-col gap-5">
              {items.map((item: CartItemStore) => (
                <CartItem
                  key={`${item.id}-${item.size}-${item.color}`}
                  {...item}
                />
              ))}
            </div>

            {/* Summary */}
            <CartSummary
              subtotal={subtotal}
              discount={discountTotal}
              total={total}
            />
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center pt-20 text-center space-y-4">
            <div className="w-20 h-20 bg-[#1F2430] rounded-full flex items-center justify-center text-white mb-2">
              <ShoppingBag size={40} />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold">Keranjang Kosong</h2>
              <p className="text-gray-500 text-sm max-w-[200px]">
                Keranjang belanja Anda menunggu untuk diisi.
              </p>
            </div>
            <button
              onClick={() => navigate("/outshine/products")}
              className="mt-4 bg-[#1F2430] text-white font-bold px-8 py-3 rounded-full transition-all active:scale-95 cursor-pointer"
            >
              Start Shopping
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartScreen;
