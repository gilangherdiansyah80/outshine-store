import { useNavigate, useLocation } from "react-router-dom";
import { ChevronRight, ShoppingBag } from "lucide-react";
import { useCartStore } from "@outshine/store/cartStore";
import { useAuth } from "@/lib/auth";

interface ProductActionsProps {
  id: string;
  name: string;
  price: number;
  image: string;
  selectedSize: string | null;
}

const ProductActions = ({
  id,
  name,
  price,
  image,
  selectedSize,
}: ProductActionsProps) => {
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  const handleAddToBag = () => {
    if (!isLoggedIn) {
      navigate("/outshine/welcome", { state: { from: location } });
      return;
    }

    if (!selectedSize) {
      alert("Please select a size first");
      return;
    }

    addItem({
      id,
      name,
      price,
      image,
      size: selectedSize,
      color: "Standard", // Default for now
    });

    // Optional: navigate to cart or show success message
    navigate("/outshine/cart");
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      navigate("/outshine/welcome", { state: { from: location } });
      return;
    }

    if (!selectedSize) {
      alert("Please select a size first");
      return;
    }

    addItem({
      id,
      name,
      price,
      image,
      size: selectedSize,
      color: "Standard",
    });

    navigate("/outshine/checkout"); // Assuming checkout is the next step
  };

  return (
    <div className="flex gap-3 pt-2">
      <button
        onClick={handleAddToBag}
        className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#1F2430] text-gray-300 hover:bg-[#2A3040] transition-colors active:scale-95"
      >
        <ShoppingBag className="w-6 h-6" />
      </button>
      <button
        onClick={handleBuyNow}
        className="flex-1 h-14 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/40 active:scale-95"
      >
        Buy Now
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ProductActions;
