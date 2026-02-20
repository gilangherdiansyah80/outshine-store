import { cn } from "@/lib/utils";

interface OrderTabsWebProps {
  activeStatus: string;
  onStatusChange: (status: string) => void;
}

const statusOptions = [
  { id: "all", label: "Semua" },
  { id: "pending", label: "Belum Bayar" },
  { id: "processing", label: "Dikemas" },
  { id: "shipping", label: "Dikirim" },
  { id: "completed", label: "Selesai" },
  { id: "cancelled", label: "Dibatalkan" },
];

export default function OrderTabsWeb({
  activeStatus,
  onStatusChange,
}: OrderTabsWebProps) {
  return (
    <div className="flex border-b border-slate-200 mb-6 bg-white overflow-x-auto mx-4 sm:mx-0">
      {statusOptions.map((status) => {
        const isActive = activeStatus === status.id;
        return (
          <button
            key={status.id}
            onClick={() => onStatusChange(status.id)}
            className={cn(
              "px-6 py-4 text-sm font-bold whitespace-nowrap transition-colors relative cursor-pointer",
              isActive
                ? "text-blue-600"
                : "text-slate-500 hover:text-slate-800",
            )}
          >
            {status.label}
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}
