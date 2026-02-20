import {
  CheckCircle2,
  Package,
  Truck,
  Clock,
  XCircle,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";
import { formatIDR } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export interface OrderCardWebProps {
  order: {
    id: string;
    date: string;
    status: string;
    totalAmount: number;
    itemsCount: number;
    firstItem: {
      id: string;
      name: string;
      image: string;
      size: string;
      color: string;
      price?: number;
      originalPrice?: number;
    };
  };
}

const statusConfig: Record<
  string,
  { label: string; bg: string; text: string; icon: LucideIcon }
> = {
  pending: {
    label: "BELUM BAYAR",
    bg: "bg-amber-100",
    text: "text-amber-800",
    icon: Clock,
  },
  processing: {
    label: "DIPROSES",
    bg: "bg-orange-100",
    text: "text-orange-700",
    icon: Package,
  },
  shipping: {
    label: "DIKIRIM",
    bg: "bg-blue-100",
    text: "text-blue-700",
    icon: Truck,
  },
  completed: {
    label: "SELESAI",
    bg: "bg-green-100",
    text: "text-green-700",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "DIBATALKAN",
    bg: "bg-slate-100",
    text: "text-slate-600",
    icon: XCircle,
  },
};

export default function OrderCardWeb({ order }: OrderCardWebProps) {
  const navigate = useNavigate();
  const lowerStatus = order.status.toLowerCase();
  const statusLine = statusConfig[lowerStatus] || {
    label: order.status.toUpperCase(),
    bg: "bg-slate-100",
    text: "text-slate-600",
    icon: ShoppingBag,
  };
  const StatusIcon = statusLine.icon;

  const handleCardClick = () => {
    navigate(`/outshine/order/${order.id}`);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col hover:border-blue-400 transition-colors cursor-pointer group mb-4">
      {/* Header */}
      <div className="px-5 py-3 border-b border-slate-100 flex justify-between items-center">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 text-slate-400">
            <StatusIcon size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#0F172A] text-sm">Belanja</span>
              <span className="text-slate-400 text-sm">
                #{order.id.split("-")[0].toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{order.date}</p>
          </div>
        </div>
        <div
          className={`px-3 py-1 rounded-md text-[10px] font-bold ${statusLine.bg} ${statusLine.text} tracking-wider`}
        >
          {statusLine.label}
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4 flex gap-4" onClick={handleCardClick}>
        <div className="w-20 h-20 bg-slate-50 rounded-lg overflow-hidden shrink-0 border border-slate-100">
          <img
            src={order.firstItem.image}
            alt={order.firstItem.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 flex justify-between">
          <div className="flex flex-col justify-center max-w-[60%]">
            <h4 className="font-bold text-[#0F172A] text-[15px] line-clamp-2 group-hover:text-blue-600 transition-colors">
              {order.firstItem.name}
            </h4>
            <div className="mt-1.5 flex flex-col gap-0.5">
              <p className="text-sm text-slate-500">
                1 barang x{" "}
                {formatIDR(
                  order.firstItem.price || order.totalAmount / order.itemsCount,
                )}
              </p>
              {order.itemsCount > 1 && (
                <p className="text-xs text-slate-400">
                  + {order.itemsCount - 1} produk lainnya
                </p>
              )}
            </div>
          </div>

          <div className="text-right flex flex-col justify-center border-l pl-5 border-slate-100">
            <p className="text-xs text-slate-400 mb-1">Total Belanja</p>
            <p className="text-base font-bold text-[#0F172A]">
              {formatIDR(order.totalAmount)}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-slate-100 flex justify-end items-center gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
          className="px-6 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-[#0F172A] font-bold text-sm rounded-lg transition-colors"
        >
          Lihat Detail
        </button>

        {lowerStatus === "processing" && (
          <button
            onClick={(e) => e.stopPropagation()}
            className="px-6 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-[#0F172A] font-bold text-sm rounded-lg transition-colors"
          >
            Hubungi Penjual
          </button>
        )}

        {lowerStatus === "shipping" && (
          <button
            onClick={(e) => e.stopPropagation()}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 border border-blue-600 text-white font-bold text-sm rounded-lg transition-colors"
          >
            Pesanan Diterima
          </button>
        )}

        {(lowerStatus === "pending" || lowerStatus === "unpaid") && (
          <>
            <button
              onClick={(e) => e.stopPropagation()}
              className="px-6 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-[#0F172A] font-bold text-sm rounded-lg transition-colors"
            >
              Batalkan Pesanan
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 border border-blue-600 text-white font-bold text-sm rounded-lg transition-colors"
            >
              Bayar Sekarang
            </button>
          </>
        )}

        {lowerStatus === "completed" && (
          <button
            onClick={(e) => e.stopPropagation()}
            className="px-6 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-[#0F172A] font-bold text-sm rounded-lg transition-colors"
          >
            Lihat Penilaian
          </button>
        )}

        {(lowerStatus === "completed" ||
          lowerStatus === "cancelled" ||
          lowerStatus === "canceled") && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/outshine/product/${order.firstItem.id}`);
            }}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 border border-blue-600 text-white font-bold text-sm rounded-lg transition-colors"
          >
            Beli Lagi
          </button>
        )}
      </div>
    </div>
  );
}
