import { useState } from "react";
import { Loader2, Search, ChevronDown } from "lucide-react";
import OrderList from "./components/OrderList";
import OrderTabsWeb from "./components/OrderTabsWeb";
import Pagination from "@/components/Pagination/Pagination";
import { useGetOrders } from "@/services/Order/useGetOrders";

export default function OrderWeb() {
  const [activeStatus, setActiveStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const { orders, isLoading } = useGetOrders();

  const filteredOrders = orders.filter(
    (order) => activeStatus === "all" || order.status === activeStatus,
  );

  const mappedOrders = filteredOrders.map((order) => {
    const date = new Date(order.createdAt).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const time = new Date(order.createdAt).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const firstItem = order.items?.[0];

    return {
      id: order.id,
      date: `${date}, ${time} WIB`,
      status: order.status,
      totalAmount: Number(order.totalPrice),
      itemsCount: Number(order.totalItems),
      firstItem: {
        id: firstItem?.productId,
        name: firstItem?.productName || `Pesanan #${order.id.slice(0, 5)}`,
        image:
          firstItem?.productImage ||
          "https://uvetcjmswzqmhcwtkynx.supabase.co/storage/v1/object/public/user-content/products/placeholder.jpg",
        size: firstItem?.sizeName || "Standard",
        color: "Standard",
        price: firstItem?.price,
        originalPrice: firstItem?.price ? firstItem.price * 1.2 : undefined,
      },
    };
  });

  const itemsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(mappedOrders.length / itemsPerPage));
  const paginatedOrders = mappedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-16">
      <div className="max-w-5xl mx-auto pt-8 px-4 sm:px-0">
        {/* Breadcrumb Area */}
        <div className="text-sm font-medium text-slate-500 mb-6 font-sans">
          <span className="cursor-pointer hover:text-blue-600">Beranda</span>
          <span className="mx-2">&gt;</span>
          <span className="text-[#0F172A] font-bold">Riwayat Pesanan</span>
        </div>

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">
            Riwayat Pesanan Saya
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            Kelola dan pantau semua status pesanan belanja Anda di sini.
          </p>
        </div>

        {/* Search, Filters and Tabs Container */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
          {/* Top Controls Row */}
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search size={18} className="text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Cari berdasarkan No. Pesanan atau Nama Produk"
                className="w-full bg-[#F8F9FA] border border-slate-200 text-sm font-medium rounded-lg h-11 pl-11 pr-4 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-400"
              />
            </div>

            <div className="flex gap-4 shrink-0">
              <button className="h-11 px-4 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50">
                Semua Status
                <ChevronDown size={16} />
              </button>
              <button className="h-11 px-4 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50">
                Semua Waktu
                <ChevronDown size={16} />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <OrderTabsWeb
            activeStatus={activeStatus}
            onStatusChange={setActiveStatus}
          />
        </div>

        {/* Order List */}
        <div className="pb-4">
          <OrderList orders={paginatedOrders} />
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
