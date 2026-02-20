import { cn } from "@/lib/utils";
import {
  ListFilter,
  Clock,
  Package,
  Truck,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface OrderSidebarProps {
  activeStatus: string;
  onStatusChange: (status: string) => void;
  counts?: Record<string, number>;
}

const statusOptions = [
  { id: "all", label: "Semua", icon: ListFilter },
  { id: "pending", label: "Belum Bayar", icon: Clock },
  { id: "processing", label: "Dikemas", icon: Package },
  { id: "shipping", label: "Dikirim", icon: Truck },
  { id: "completed", label: "Selesai", icon: CheckCircle2 },
  { id: "cancelled", label: "Dibatalkan", icon: XCircle },
];

export default function OrderSidebar({
  activeStatus,
  onStatusChange,
  counts = {},
}: OrderSidebarProps) {
  return (
    <div className="sticky top-10 space-y-2">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] px-4 mb-4">
        Status Pesanan
      </p>
      {statusOptions.map((status) => {
        const Icon = status.icon;
        const isActive = activeStatus === status.id;
        const count = counts[status.id] || 0;

        return (
          <button
            key={status.id}
            onClick={() => onStatusChange(status.id)}
            className={cn(
              "w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-200 cursor-pointer",
              isActive
                ? "bg-[#0F172A] text-white shadow-xl shadow-slate-200"
                : "hover:bg-slate-50 text-[#0F172A]",
            )}
          >
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                  isActive ? "bg-white/10" : "bg-slate-100",
                )}
              >
                <Icon
                  size={16}
                  className={isActive ? "text-white" : "text-slate-500"}
                />
              </div>
              <span
                className={cn(
                  "font-black text-sm",
                  isActive ? "text-white" : "text-[#0F172A]",
                )}
              >
                {status.label}
              </span>
            </div>
            {count > 0 && (
              <span
                className={cn(
                  "text-xs font-bold px-2 py-0.5 rounded-full",
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-500",
                )}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
