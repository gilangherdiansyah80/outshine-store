import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

interface OrderDetailInfoProps {
  orderId: string;
  createdAt: string;
  paymentMethod?: string;
}

const OrderDetailInfo = ({
  orderId,
  createdAt,
  paymentMethod,
}: OrderDetailInfoProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl mb-2 overflow-hidden">
      <div className="p-4 space-y-4">
        {/* Order ID */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-800 font-semibold">No. Pesanan</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 uppercase">{orderId}</span>
            <button
              onClick={() => navigator.clipboard.writeText(orderId)}
              className="text-xs text-gray-800 px-2 py-0.5 border border-gray-200 rounded-sm"
            >
              Salin
            </button>
          </div>
        </div>

        {/* Payment Method */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Metode Pembayaran</span>
          <span className="text-gray-800">{paymentMethod || "Bank BNI"}</span>
        </div>

        {/* Invoice Link */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Nota Pesanan / Faktur</span>
          <div className="flex items-center gap-1 text-gray-800">
            <span>Lihat</span>
            <ChevronRight size={14} className="text-gray-400" />
          </div>
        </div>

        {/* Expanded Info */}
        {isExpanded && (
          <div className="pt-4 border-t border-gray-50 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Waktu Pesanan</span>
              <span className="text-gray-800">
                {new Date(createdAt).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Waktu Pembayaran</span>
              <span className="text-gray-800">
                {new Date(createdAt).toLocaleString()}
              </span>
            </div>
            {/* Add more info as needed */}
          </div>
        )}
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full py-4 border-t border-gray-50 flex items-center justify-center gap-1 text-sm text-gray-500"
      >
        <span>{isExpanded ? "Sembunyikan" : "Lihat Semua"}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
};

export default OrderDetailInfo;
