import { ChevronLeft, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CheckoutHeader = () => {
  const navigate = useNavigate();
  return (
    <header className="px-5 py-6 flex items-center justify-between sticky top-0 bg-[#0B0F19] z-20 border-b border-white/5">
      <button
        onClick={() => navigate(-1)}
        className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#1F2430] text-gray-300 hover:bg-[#2A3040] transition-colors"
      >
        <ChevronLeft size={24} />
      </button>
      <h1 className="text-lg font-bold text-white">Checkout</h1>
      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#1F2430] text-gray-300">
        <Lock size={20} />
      </div>
    </header>
  );
};

export default CheckoutHeader;
