import { useNavigate, useParams } from "react-router-dom";
import { Download, RotateCcw, Loader2, PackageSearch } from "lucide-react";
import { useGetDetailOrder } from "@/services/Order/useGetDetailOrder";

import DetailStepperWeb from "./components/DetailStepperWeb";
import DetailInfoWeb from "./components/DetailInfoWeb";
import DetailItemsWeb from "./components/DetailItemsWeb";
import DetailSummaryWeb from "./components/DetailSummaryWeb";
import DetailShippingWeb from "./components/DetailShippingWeb";
import { formatDate } from "@/lib/utils";

export default function DetailOrder() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { order, isLoading, isError } = useGetDetailOrder(id as string);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#F8F9FA]">
        <Loader2 className="w-12 h-12 shrink-0 animate-spin text-blue-600" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#F8F9FA] text-center">
        <div className="w-24 h-24 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center mb-6">
          <PackageSearch size={48} className="text-slate-300" />
        </div>
        <h2 className="text-2xl font-black text-[#0F172A]">
          Pesanan Tidak Ditemukan
        </h2>
        <button
          onClick={() => navigate("/outshine/orders")}
          className="mt-6 px-6 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Kembali ke Daftar Pesanan
        </button>
      </div>
    );
  }

  // Format ID for UI
  const displayId = order.id.split("-")[0].toUpperCase();

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-20">
      <div className="max-w-6xl mx-auto pt-8 px-4 sm:px-0">
        {/* Breadcrumb Pattern directly replicating mockup */}
        <div className="text-sm font-medium text-slate-500 mb-6 font-sans">
          <span
            onClick={() => navigate("/outshine")}
            className="cursor-pointer hover:text-blue-600"
          >
            Beranda
          </span>
          <span className="mx-2">&gt;</span>
          <span
            onClick={() => navigate("/outshine/orders")}
            className="cursor-pointer hover:text-blue-600"
          >
            Daftar Pesanan
          </span>
          <span className="mx-2">&gt;</span>
          <span className="text-[#0F172A] font-bold">Detail Pesanan</span>
        </div>

        {/* Header & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-[#0F172A]">
              Pesanan #{displayId}
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Dipesan pada {formatDate(order.createdAt)}
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-[#0F172A] font-bold text-sm rounded-lg transition-colors flex items-center gap-2">
              <Download size={16} />
              Unduh Invoice
            </button>
            <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-lg transition-colors flex items-center gap-2">
              <RotateCcw size={16} />
              Beli Lagi
            </button>
          </div>
        </div>

        {/* Top Stepper */}
        <div className="mb-8">
          <DetailStepperWeb status={order.status} date={order.createdAt} />
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8 items-start">
          {/* Left Column (Info & Items) */}
          <div className="flex flex-col gap-8">
            <DetailInfoWeb
              address={order.address}
              paymentMethod={
                order.latestPayment?.paymentMethodName ||
                order.latestPayment?.bank ||
                "Transfer"
              }
            />
            <DetailItemsWeb items={order.items} orderId={order.id} />
          </div>

          {/* Right Column (Summary & Shipping) */}
          <div className="flex flex-col gap-6">
            <DetailSummaryWeb order={order} />
            <DetailShippingWeb />
          </div>
        </div>
      </div>
    </div>
  );
}
