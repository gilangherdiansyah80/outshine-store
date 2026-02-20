import {
  Clock,
  CheckCircle2,
  Package,
  Truck,
  XCircle,
  Copy,
  type LucideIcon,
} from "lucide-react";
import type { OrderDetailData } from "@/services/Order/useGetDetailOrder";

interface DetailStatusWebProps {
  order: OrderDetailData;
}

const statusConfig: Record<
  string,
  { label: string; icon: LucideIcon; color: string; bg: string }
> = {
  pending: {
    label: "Menunggu Pembayaran",
    icon: Clock,
    color: "text-amber-600",
    bg: "bg-amber-50 border-amber-200",
  },
  processing: {
    label: "Pesanan Dikemas",
    icon: Package,
    color: "text-blue-600",
    bg: "bg-blue-50 border-blue-200",
  },
  shipping: {
    label: "Sedang Dikirim",
    icon: Truck,
    color: "text-indigo-600",
    bg: "bg-indigo-50 border-indigo-200",
  },
  completed: {
    label: "Pesanan Selesai",
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-50 border-emerald-200",
  },
  cancelled: {
    label: "Dibatalkan",
    icon: XCircle,
    color: "text-slate-500",
    bg: "bg-slate-50 border-slate-200",
  },
  unpaid: {
    label: "Menunggu Pembayaran",
    icon: Clock,
    color: "text-amber-600",
    bg: "bg-amber-50 border-amber-200",
  },
};

export default function DetailStatusWeb({ order }: DetailStatusWebProps) {
  const lowerStatus = order.status.toLowerCase();
  const currentStatus =
    statusConfig[lowerStatus as keyof typeof statusConfig] ||
    statusConfig.pending;

  const Icon = currentStatus.icon;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formattedDate = new Date(order.createdAt).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-50 p-6 flex flex-col gap-6">
      <div
        className={`flex items-center gap-4 px-6 py-4 rounded-2xl border-2 ${currentStatus.bg}`}
      >
        <div
          className={`p-3 bg-white rounded-xl shadow-sm ${currentStatus.color}`}
        >
          <Icon size={24} />
        </div>
        <div>
          <h2 className={`text-lg font-black ${currentStatus.color}`}>
            {currentStatus.label}
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-0.5">
            {order.status.toLowerCase() === "shipping"
              ? "Kurir sedang dalam perjalanan membawa pesanan Anda."
              : `Status terkini dari pesanan Anda.`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 bg-slate-50 rounded-2xl p-6 border border-slate-100">
        <div>
          <span className="text-xs font-black text-slate-400 uppercase tracking-wider block mb-1">
            Nomor Pesanan
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[#0F172A] font-bold">
              {order.id.toUpperCase()}
            </span>
            <button
              onClick={() => handleCopy(order.id)}
              className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-[#0F172A] transition-colors"
            >
              <Copy size={16} />
            </button>
          </div>
        </div>
        <div>
          <span className="text-xs font-black text-slate-400 uppercase tracking-wider block mb-1">
            Tanggal Pembelian
          </span>
          <span className="text-[#0F172A] font-bold">{formattedDate} WIB</span>
        </div>
      </div>
    </div>
  );
}
