import { useState } from "react";
import { Trash2, Minus, Plus, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";
import { formatIDR } from "@/lib/utils";
import { putCartQty } from "@/services/Carts/usePutQty";
import { deleteCartItem } from "@/services/Carts/useDeleteCart";

interface CartItemWebProps {
  id: string;
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

export default function CartItemWeb({
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
}: CartItemWebProps) {
  const { updateQuantity, removeItem } = useCartStore();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleRemove = async () => {
    setIsDeleting(true);
    try {
      const response = await deleteCartItem({ productId: id, sizeId });
      if (response.success) removeItem(id, size, color);
    } catch (e) {
      console.error("Failed to remove item:", e);
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
        sizeId,
        quantity: newQty,
      });
      if (response.success) updateQuantity(id, size, color, delta);
    } catch (e) {
      console.error("Failed to update quantity:", e);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="group flex gap-6 p-6 bg-white rounded-3xl border-2 border-slate-50 transition-all duration-300 hover:shadow-lg hover:shadow-slate-100/60 hover:border-slate-100">
      {/* Product Image */}
      <div
        onClick={() => navigate(`/outshine/product/${id}`)}
        className="w-28 h-28 rounded-2xl overflow-hidden bg-slate-100 shrink-0 cursor-pointer"
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between py-1">
        <div className="flex justify-between items-start">
          <div
            onClick={() => navigate(`/outshine/product/${id}`)}
            className="cursor-pointer space-y-1"
          >
            <h3 className="font-black text-[#0F172A] text-base tracking-tight line-clamp-1 hover:text-[#2563EB] transition-colors">
              {name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-widest">
                {size}
              </span>
              <span className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-widest">
                {color}
              </span>
            </div>
          </div>

          <button
            onClick={handleRemove}
            disabled={isDeleting}
            className="h-9 w-9 flex items-center justify-center rounded-xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Trash2 size={16} />
            )}
          </button>
        </div>

        <div className="flex justify-between items-end">
          {/* Price */}
          <div className="space-y-0.5">
            {formattedOriginal && formattedOriginal !== formattedDiscounted && (
              <p className="text-xs text-slate-300 line-through font-bold">
                {formattedOriginal}
              </p>
            )}
            <p className="text-xl font-black text-[#0F172A] tracking-tight">
              {formattedDiscounted || formatIDR(price || originalPrice || 0)}
            </p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-1 bg-slate-50 rounded-2xl p-1 border border-slate-100">
            <button
              onClick={() => handleUpdateQty(-1)}
              disabled={isUpdating || quantity <= 1}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:text-white hover:bg-[#0F172A] transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-sm font-black text-[#0F172A]">
              {isUpdating ? (
                <Loader2
                  size={14}
                  className="animate-spin mx-auto text-[#2563EB]"
                />
              ) : (
                quantity
              )}
            </span>
            <button
              onClick={() => handleUpdateQty(1)}
              disabled={isUpdating}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:text-white hover:bg-[#0F172A] transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
