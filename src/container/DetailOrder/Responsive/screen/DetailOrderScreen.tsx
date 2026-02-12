import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import type { OrderDetailData } from "@/services/Order/useGetDetailOrder";
import OrderDetailStatus from "../components/OrderDetailStatus";
import OrderDetailAddress from "../components/OrderDetailAddress";
import OrderDetailItems from "../components/OrderDetailItems";
import OrderDetailPayment from "../components/OrderDetailPayment";
import OrderDetailInfo from "../components/OrderDetailInfo";
import OrderDetailHelp from "../components/OrderDetailHelp";

interface DetailOrderScreenProps {
  order: OrderDetailData;
}

const DetailOrderScreen = ({ order }: DetailOrderScreenProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      {/* Header */}
      <div className="bg-white sticky top-0 z-20 border-b border-gray-100 px-4 py-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-1">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-800">Rincian Pesanan</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-2 pb-24 space-y-2">
        <OrderDetailStatus status={order.status} />

        <OrderDetailAddress address={order.address} />

        <OrderDetailItems
          items={order.items}
          totalPrice={order.formattedTotalPrice}
        />

        <OrderDetailPayment order={order} />

        <OrderDetailHelp />

        <OrderDetailInfo
          orderId={order.id}
          createdAt={order.createdAt}
          paymentMethod={
            order.latestPayment?.paymentMethodName ||
            order.latestPayment?.bank ||
            "Transfer"
          }
        />
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 flex gap-3 z-30">
        {order.status.toLowerCase() === "completed" && (
          <>
            <button className="flex-1 py-3 border border-gray-200 rounded-sm text-sm font-medium text-gray-800 active:bg-gray-50 uppercase">
              Lihat Penilaian
            </button>
            <button className="flex-1 py-3 bg-white border border-[#EE4D2D] rounded-sm text-sm font-medium text-[#EE4D2D] active:opacity-90">
              Beli Lagi
            </button>
          </>
        )}

        {(order.status.toLowerCase() === "cancelled" ||
          order.status.toLowerCase() === "canceled") && (
          <button className="w-full py-3 bg-white border border-[#EE4D2D] rounded-sm text-sm font-medium text-[#EE4D2D] active:opacity-90">
            Beli Lagi
          </button>
        )}

        {order.status.toLowerCase() === "shipping" && (
          <button className="w-full py-3 bg-[#EE4D2D] text-white rounded-sm text-sm font-medium active:opacity-90">
            Pesanan Diterima
          </button>
        )}

        {order.status.toLowerCase() === "processing" && (
          <button className="w-full py-3 border border-gray-200 rounded-sm text-sm font-medium text-gray-800 active:bg-gray-50">
            Hubungi Penjual
          </button>
        )}

        {(order.status.toLowerCase() === "pending" ||
          order.status.toLowerCase() === "unpaid") && (
          <>
            <button className="flex-1 py-3 border border-gray-200 rounded-sm text-sm font-medium text-gray-800 active:bg-gray-50">
              Batalkan Pesanan
            </button>
            <button className="flex-1 py-3 bg-[#EE4D2D] text-white rounded-sm text-sm font-medium active:opacity-90">
              Bayar Sekarang
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailOrderScreen;
