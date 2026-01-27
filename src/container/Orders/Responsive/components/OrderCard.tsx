import { ChevronRight } from "lucide-react";
import { formatIDR } from "@/lib/utils";

interface OrderCardProps {
  order: {
    id: string;
    date: string;
    status: string;
    totalAmount: number;
    itemsCount: number;
    firstItem: {
      name: string;
      image: string;
      size: string;
      color: string;
      originalPrice?: number;
      price?: number;
    };
  };
}

const statusConfig: Record<string, { label: string; className: string }> = {
  pending: {
    label: "Belum Bayar",
    className: "text-[#0F172A]",
  },
  processing: {
    label: "Dikemas",
    className: "text-[#0F172A]",
  },
  shipping: {
    label: "Dikirim",
    className: "text-[#0F172A]",
  },
  completed: {
    label: "Selesai",
    className: "text-[#0F172A]",
  },
  cancelled: {
    label: "Dibatalkan",
    className: "text-gray-400",
  },
};

const OrderCard = ({ order }: OrderCardProps) => {
  const status = statusConfig[order.status.toLowerCase()] || {
    label: order.status,
    className: "text-[#0F172A]",
  };

  return (
    <div className="bg-white flex flex-col transition-all rounded-xl active:bg-gray-50">
      {/* Search Result Style / Store Header */}
      <div className="px-4 py-3 flex justify-between items-center border-b border-gray-50">
        <div className="flex items-center gap-2">
          <div className="bg-[#0F172A] text-white text-[10px] font-bold px-1 rounded-sm">
            Star+
          </div>
          <span className="text-sm font-medium text-gray-800">
            OUTSHINE Store
          </span>
          <ChevronRight size={14} className="text-gray-400" />
        </div>
        <span className={`text-xs font-medium ${status.className}`}>
          {status.label}
        </span>
      </div>

      {/* Product Info */}
      <div className="p-4 flex gap-3">
        <div className="w-20 h-20 bg-gray-50 rounded-sm overflow-hidden border border-gray-100 shrink-0">
          <img
            src={order.firstItem.image}
            alt={order.firstItem.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          <section className="flex justify-between">
            <div>
              <h4 className="text-sm text-gray-800 line-clamp-2 leading-tight font-semibold">
                {order.firstItem.name}
              </h4>
              <p className="text-xs text-gray-400 mt-1 whitespace-nowrap overflow-hidden text-ellipsis">
                {order.firstItem.size}, {order.firstItem.color}
              </p>
            </div>
            <span className="text-xs text-gray-400">x{order.itemsCount}</span>
          </section>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              {order.firstItem.originalPrice && (
                <span className="text-xs text-gray-300 line-through">
                  {formatIDR(order.firstItem.originalPrice).replace(
                    "Rp ",
                    "Rp",
                  )}
                </span>
              )}
              <span className="text-sm text-gray-800">
                {formatIDR(
                  order.firstItem.price || order.totalAmount / order.itemsCount,
                ).replace("Rp ", "Rp")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="px-4">
        <div className="h-px bg-gray-300 w-full" />
      </div>

      {/* Footer / Total */}
      <div className="px-4 py-3 flex flex-col gap-4">
        <div className="flex justify-end items-center gap-1.5 text-sm">
          <span className="text-gray-400">
            Total {order.itemsCount} produk:
          </span>
          <span className="font-medium text-[#0F172A]">
            {formatIDR(order.totalAmount).replace("Rp ", "Rp")}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          {order.status === "completed" && (
            <button className="px-4 py-1.5 border border-gray-200 rounded-sm text-xs text-gray-600 font-medium active:bg-gray-100">
              Lihat Penilaian
            </button>
          )}
          <button className="px-4 py-1.5 bg-[#0F172A] border border-[#0F172A] rounded-sm text-xs text-white font-medium active:opacity-90">
            Beli Lagi
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
