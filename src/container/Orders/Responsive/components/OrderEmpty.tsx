import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderEmpty = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center justify-center -mt-20 pb-10 text-center space-y-6 px-10 animate-in fade-in zoom-in duration-700">
      <div className="w-24 h-24 bg-[#0F172A]/10 rounded-[32px] flex items-center justify-center text-[#0F172A] shadow-[0_0_40px_rgba(59,130,246,0.1)]">
        <ShoppingBag size={44} strokeWidth={1.5} />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-black text-[#0F172A] tracking-tight uppercase">
          Belum Ada Pesanan
        </h2>
        <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-[240px] mx-auto">
          Sepertinya Anda belum melakukan pemesanan apapun saat ini.
        </p>
      </div>
      <button
        onClick={() => navigate("/outshine/products")}
        className="bg-[#0F172A] text-white font-black px-10 py-4 rounded-2xl text-[13px] uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-white/5"
      >
        Mulai Belanja
      </button>
    </div>
  );
};

export default OrderEmpty;
