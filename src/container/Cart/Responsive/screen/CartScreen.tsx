import { useNavigate } from "react-router-dom";
import { ChevronLeft, MoreHorizontal, ShoppingBag } from "lucide-react";
import { useCartStore } from "@outshine/store/cartStore";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";

const CartScreen = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice } = useCartStore();

  const subtotal = getTotalPrice();
  const shipping = 0; // FREE as per design
  const total = subtotal + shipping;

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
              {items.map((item) => (
                <CartItem
                  key={`${item.id}-${item.size}-${item.color}`}
                  {...item}
                />
              ))}
            </div>

            {/* Summary */}
            <CartSummary
              subtotal={subtotal}
              shipping={shipping}
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
