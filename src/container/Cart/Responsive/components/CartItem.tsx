import { Trash2, Minus, Plus } from "lucide-react";
import { useCartStore } from "@outshine/store/cartStore";
import { useNavigate } from "react-router-dom";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

const CartItem = ({
  id,
  name,
  price,
  image,
  size,
  color,
  quantity,
}: CartItemProps) => {
  const { updateQuantity, removeItem } = useCartStore();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/outshine/product/${id}`);
  };

  return (
    <div className="bg-[#151B28] rounded-3xl p-4 flex gap-4 border border-white/5 group">
      {/* Image */}
      <div
        onClick={handleNavigate}
        className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-800 shrink-0 cursor-pointer"
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover font-sans"
        />
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between py-0.5">
        <div className="flex justify-between items-start">
          <div
            onClick={handleNavigate}
            className="space-y-1 cursor-pointer flex-1"
          >
            <h3 className="text-[15px] font-bold text-white line-clamp-1">
              {name}
            </h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              SIZE: {size} | COLOR: {color}
            </p>
          </div>
          <button
            onClick={() => removeItem(id, size, color)}
            className="text-gray-500 hover:text-red-500 transition-colors p-1 cursor-pointer"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="flex justify-between items-center mt-2">
          <span className="text-lg font-bold text-white">
            ${price.toFixed(2)}
          </span>

          <div className="flex items-center bg-[#1F2430] rounded-full p-1 border border-white/5">
            <button
              onClick={() => updateQuantity(id, size, color, -1)}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center text-sm font-bold text-white">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(id, size, color, 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
