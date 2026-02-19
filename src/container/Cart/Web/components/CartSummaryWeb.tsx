import { ArrowRight, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatIDR } from "@/lib/utils";
import { useAddressStore } from "@/store/addressStore";

interface CartSummaryWebProps {
  subtotal: number;
  discount: number;
  total: number;
}

export default function CartSummaryWeb({
  subtotal,
  discount,
  total,
}: CartSummaryWebProps) {
  const navigate = useNavigate();

  const handleCheckout = () => {
    useAddressStore.getState().actions.resetSelection();
    navigate("/outshine/checkout");
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-8 border-2 border-slate-50 space-y-8 sticky top-10">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 bg-[#0F172A] rounded-2xl flex items-center justify-center">
            <ShoppingBag size={20} className="text-white" />
          </div>
          <h2 className="text-xl font-black text-[#0F172A] tracking-tighter">
            Order Summary
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-400">Base Price</span>
            <span className="font-black text-[#0F172A]">
              {formatIDR(subtotal)}
            </span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-gray-400">Discount</span>
              <span className="font-black text-green-500">
                -{formatIDR(discount)}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-400">Shipping</span>
            <span className="text-xs font-black text-orange-400 text-right max-w-[140px]">
              Not included yet
            </span>
          </div>

          <div className="h-px bg-slate-100 my-2" />

          <div className="flex justify-between items-center">
            <span className="font-black text-[#0F172A] uppercase tracking-tighter text-lg">
              Total
            </span>
            <span className="text-2xl font-black text-[#0F172A] tracking-tighter">
              {formatIDR(total)}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        className="w-full h-16 bg-[#0F172A] hover:bg-slate-800 text-white font-bold rounded-2xl text-sm flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-slate-200 hover:shadow-2xl active:scale-[0.98] group cursor-pointer"
      >
        Proceed to Checkout
        <ArrowRight
          size={18}
          className="group-hover:translate-x-1 transition-transform"
        />
      </button>

      <div className="flex items-center gap-3 justify-center pt-2">
        <div className="h-px flex-1 bg-slate-100" />
        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
          Secure Checkout
        </span>
        <div className="h-px flex-1 bg-slate-100" />
      </div>
    </div>
  );
}
