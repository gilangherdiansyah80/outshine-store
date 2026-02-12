import type { OrderItem } from "@/services/Order/useGetDetailOrder";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatIDR } from "@/lib/utils";

interface OrderDetailItemsProps {
  items: OrderItem[];
  totalPrice?: string;
}

const OrderDetailItems = ({ items, totalPrice }: OrderDetailItemsProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl mb-2">
      {/* Store Header */}
      <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-[#0F172A] text-white text-[10px] font-bold px-1 rounded-sm">
            Star+
          </div>
          <span className="text-sm font-semibold text-gray-800">
            OUTSHINE STORE
          </span>
          <ChevronRight size={14} className="text-gray-400" />
        </div>
      </div>

      {/* Items List */}
      <div className="divide-y divide-gray-50">
        {items.map((item, idx) => (
          <div
            key={idx}
            onClick={() => navigate(`/outshine/product/${item.productId}`)}
            className="p-4 flex gap-3 active:bg-gray-50 cursor-pointer"
          >
            <div className="w-16 h-16 bg-gray-50 rounded-sm overflow-hidden border border-gray-100 shrink-0">
              <img
                src={item.productImage}
                alt={item.productName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div className="flex justify-between gap-2">
                <h4 className="text-[13px] text-gray-800 line-clamp-2 leading-tight font-medium">
                  {item.productName}
                </h4>
                <span className="text-xs text-gray-400 shrink-0">
                  x{item.quantity}
                </span>
              </div>

              <div className="mt-1">
                <p className="text-xs text-gray-400">{item.sizeName}</p>
                <div className="flex justify-end items-center gap-1.5 mt-1">
                  {item.price !== item.originalPrice && (
                    <span className="text-[11px] text-gray-300 line-through">
                      {item.formattedOriginalPrice}
                    </span>
                  )}
                  <span className="text-sm text-gray-800 font-medium">
                    {formatIDR(Number(item.price))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Total */}
      <div className="px-4 py-4 border-t border-gray-50 flex justify-end items-center gap-2">
        <span className="text-sm text-gray-800">Total Pesanan:</span>
        <div className="flex items-center gap-1">
          <span className="text-sm font-bold text-gray-800">{totalPrice}</span>
          <ChevronDown size={14} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default OrderDetailItems;
