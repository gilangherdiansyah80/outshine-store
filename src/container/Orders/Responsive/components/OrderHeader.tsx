import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="px-4 py-5 flex items-center gap-5 bg-[#0F172A] border-b border-gray-50">
      <button
        onClick={() => navigate(-1)}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 transition-colors cursor-pointer"
      >
        <ChevronLeft size={24} className="text-[#0F172A]" />
      </button>
      <h1 className="text-lg font-medium text-white">Pesanan Saya</h1>
    </header>
  );
};

export default OrderHeader;
