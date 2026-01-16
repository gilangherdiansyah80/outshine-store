import { ChevronRight, ShoppingBag } from "lucide-react";

const ProductActions = () => {
  return (
    <div className="flex gap-3 pt-2">
      <button className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#1F2430] text-gray-300 hover:bg-[#2A3040] transition-colors">
        <ShoppingBag className="w-6 h-6" />
      </button>
      <button className="flex-1 h-14 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-900/40">
        Buy Now
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ProductActions;
