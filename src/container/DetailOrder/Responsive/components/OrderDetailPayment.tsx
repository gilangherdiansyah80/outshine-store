import type { OrderDetailData } from "@/services/Order/useGetDetailOrder";

interface OrderDetailPaymentProps {
  order: OrderDetailData;
}

const OrderDetailPayment = ({ order }: OrderDetailPaymentProps) => {
  return (
    <div className="bg-white p-4 space-y-3 rounded-xl">
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Total Harga</span>
        <span className="text-gray-800">{order.formattedTotalPrice}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Metode Pembayaran</span>
        <span className="text-gray-800 uppercase">
          {order.latestPayment?.paymentMethodName ||
            order.latestPayment?.bank ||
            "Transfer"}
        </span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Tipe Pembayaran</span>
        <span className="text-gray-800 uppercase">{order.paymentType}</span>
      </div>
      {order.paymentType === "dp" && (
        <>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Sudah Dibayar</span>
            <span className="text-[#00BFA5] font-medium">
              {order.formattedPaidAmount}
            </span>
          </div>
          <div className="flex justify-between text-sm font-bold pt-2 border-t border-gray-50">
            <span className="text-gray-800">Sisa Tagihan</span>
            <span className="text-[#EE4D2D]">
              {order.formattedRemainingAmount}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetailPayment;
