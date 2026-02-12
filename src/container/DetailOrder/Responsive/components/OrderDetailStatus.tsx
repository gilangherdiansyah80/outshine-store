import { ChevronRight, Truck } from "lucide-react";

interface OrderDetailStatusProps {
  status: string;
}

const OrderDetailStatus = ({ status }: OrderDetailStatusProps) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden mb-2">
      {/* Status Banner */}
      <div className="bg-[#0F172A] text-white px-4 py-3 flex items-center justify-between">
        <span className="font-bold text-base">
          {status.toLowerCase() === "completed"
            ? "Pesanan Selesai"
            : status.toLowerCase() === "processing"
              ? "Pesanan Sedang Dikemas"
              : status.toLowerCase() === "shipping"
                ? "Pesanan Sedang Dikirim"
                : status}
        </span>
      </div>

      {/* Shipping Info */}
      <div className="p-4 border-b border-gray-50">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-semibold text-gray-800">
            Info Pengiriman
          </span>
          <ChevronRight size={16} className="text-gray-400" />
        </div>
        <p className="text-sm text-gray-500 mb-4">SiCepat Halu: 004548100927</p>

        <div className="flex gap-3">
          <Truck size={18} className="text-[#0F172A] shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-[13px] text-[#0F172A] leading-tight mb-1 line-clamp-2">
              Pesanan tiba di alamat tujuan. diterima oleh Yang b...
            </p>
            <p className="text-xs text-gray-400">05-01-2026 18:22</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailStatus;
