import { Trash2, Minus, Plus, Loader2 } from "lucide-react";
import { useCartStore } from "@outshine/store/cartStore";
import { useNavigate } from "react-router-dom";
import { formatIDR } from "@/lib/utils";
import { putCartQty } from "@/services/Carts/usePutQty";
import { deleteCartItem } from "@/services/Carts/useDeleteCart";
import { useState } from "react";

interface CartItemProps {
  id: string; // productId
  name: string;
  price: number;
  originalPrice?: number;
  formattedDiscounted?: string;
  formattedOriginal?: string;
  image: string;
  sizeId: string;
  size: string;
  color: string;
  quantity: number;
}

const CartItem = ({
  id,
  name,
  price,
  originalPrice,
  formattedDiscounted,
  formattedOriginal,
  image,
  sizeId,
  size,
  color,
  quantity,
}: CartItemProps) => {
  const { updateQuantity, removeItem } = useCartStore();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/outshine/product/${id}`);
  };

  const handleRemove = async () => {
    setIsDeleting(true);
    try {
      const response = await deleteCartItem({
        productId: id,
        sizeId: sizeId,
      });

      if (response.success) {
        removeItem(id, size, color);
      }
    } catch (error: unknown) {
      console.error("Failed to remove item:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdateQty = async (delta: number) => {
    const newQty = quantity + delta;
    if (newQty < 1) return;

    setIsUpdating(true);
    try {
      const response = await putCartQty({
        productId: id,
        sizeId: sizeId,
        quantity: newQty,
      });

      if (response.success) {
        updateQuantity(id, size, color, delta);
      }
    } catch (error: unknown) {
      console.error("Failed to update quantity:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-[#151B28] rounded-[32px] p-4 flex gap-5 border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden">
      {/* Glow Effect on Hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[50px] -mr-16 -mt-16 group-hover:bg-blue-600/10 transition-all pointer-events-none" />

      {/* Image */}
      <div
        onClick={handleNavigate}
        className="w-24 h-24 rounded-2xl overflow-hidden bg-[#1F2430] shrink-0 cursor-pointer shadow-lg border border-white/5"
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between py-1">
        <div className="flex justify-between items-start gap-2">
          <div
            onClick={handleNavigate}
            className="space-y-1 cursor-pointer flex-1"
          >
            <h3 className="text-base font-black text-white line-clamp-1 tracking-tight">
              {name}
            </h3>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em]">
              {size} <span className="mx-1 opacity-20">|</span> {color}
            </p>
          </div>
          <button
            onClick={handleRemove}
            disabled={isDeleting}
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-red-500/10 text-red-500/50 hover:text-red-500 hover:bg-red-500/20 transition-all cursor-pointer disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Trash2 size={16} />
            )}
          </button>
        </div>

        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            {formattedOriginal && formattedOriginal !== formattedDiscounted && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-500 line-through font-bold mb-0.5">
                  {formattedOriginal}
                </span>
              </div>
            )}
            <span className="text-lg font-black text-white tracking-tight">
              {formattedDiscounted || formatIDR(price || originalPrice || 0)}
            </span>
          </div>

          <div className="flex items-center bg-[#1F2430] rounded-2xl p-0.5 border border-white/5 shadow-inner">
            <button
              onClick={() => handleUpdateQty(-1)}
              disabled={isUpdating || quantity <= 1}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Minus size={14} />
            </button>
            <span className="w-6 text-center text-xs font-black text-white flex items-center justify-center">
              {isUpdating ? (
                <Loader2 size={10} className="animate-spin text-blue-500" />
              ) : (
                quantity
              )}
            </span>
            <button
              onClick={() => handleUpdateQty(1)}
              disabled={isUpdating}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
