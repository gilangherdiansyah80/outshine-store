import { ArrowRight } from "lucide-react";
import Button from "@outshine/ui/Button/Button";

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
}

const CartSummary = ({ subtotal, shipping, total }: CartSummaryProps) => {
  return (
    <div className="space-y-6 pt-8 pb-10 px-6 border-t fixed bottom-0 left-0 right-0 bg-[#0B0F19] border-white/10 z-30 shadow-[0_-20px_40px_rgba(0,0,0,0.6)] rounded-t-[32px]">
      {/* Promo Code */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Promo Code"
            className="w-full bg-[#151B28] border border-white/5 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-gray-500 outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>
        <button className="bg-white text-[#0B0F19] font-bold px-6 py-3.5 rounded-xl text-sm hover:bg-gray-100 transition-all active:scale-95">
          Apply
        </button>
      </div>

      {/* Totals table */}
      <div className="space-y-3 px-1">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-bold text-sm">Subtotal</span>
          <span className="text-white font-bold text-base">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-bold text-sm">Shipping</span>
          <span className="text-green-500 font-bold text-sm">
            {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="h-px bg-white/5 my-2" />
        <div className="flex justify-between items-center">
          <span className="text-white font-bold text-xl uppercase tracking-tighter">
            Total
          </span>
          <span className="text-white font-bold text-2xl tracking-tight">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Checkout Button */}
      <Button className="w-full h-16 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-2xl text-[15px] flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-900/20 border-none group">
        Proceed to Checkout
        <ArrowRight
          size={20}
          className="group-hover:translate-x-1 transition-transform"
        />
      </Button>
    </div>
  );
};

export default CartSummary;
