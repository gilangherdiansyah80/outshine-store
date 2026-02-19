import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Loader2 } from "lucide-react";
import { useCartStore, type CartItem } from "@/store/cartStore";
import { useAddressStore } from "@/store/addressStore";
import { useGetCart } from "@/services/Carts/useGetCart";
import CartItemWeb from "./components/CartItemWeb";
import CartSummaryWeb from "./components/CartSummaryWeb";

export default function CartWeb() {
  const navigate = useNavigate();
  const { items, setItems, setBuyNowItem } = useCartStore();
  const { actions } = useAddressStore();
  const { cartData, isLoading } = useGetCart();

  useEffect(() => {
    setBuyNowItem(null);
    actions.resetSelection();
  }, [setBuyNowItem, actions]);

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
      <div className="max-w-7xl mx-auto px-8 py-16 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-[#2563EB]" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-16 min-h-[60vh] flex flex-col items-center justify-center gap-8 text-center">
        <div className="w-28 h-28 bg-slate-100 rounded-full flex items-center justify-center">
          <ShoppingBag size={52} className="text-slate-300" />
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl font-black text-[#0F172A] tracking-tighter">
            Your Cart is Empty
          </h2>
          <p className="text-gray-400 font-medium max-w-xs">
            Looks like you haven't added anything to your cart yet.
          </p>
        </div>
        <button
          onClick={() => navigate("/outshine/products")}
          className="px-10 py-5 bg-[#0F172A] text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 hover:shadow-2xl active:scale-[0.98] cursor-pointer"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter">
          Shopping Cart
        </h1>
        <p className="text-gray-400 font-medium mt-2">
          {items.length} {items.length === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
        {/* Left: Cart Items */}
        <div className="space-y-5">
          {items.map((item: CartItem) => (
            <CartItemWeb
              key={`${item.id}-${item.size}-${item.color}`}
              {...item}
            />
          ))}
        </div>

        {/* Right: Order Summary */}
        <CartSummaryWeb
          subtotal={subtotal}
          discount={discountTotal}
          total={total}
        />
      </div>
    </div>
  );
}
