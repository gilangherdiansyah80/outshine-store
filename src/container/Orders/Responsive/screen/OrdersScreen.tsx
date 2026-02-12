import { useState } from "react";
import OrderHeader from "../components/OrderHeader";
import OrderTabs from "../components/OrderTabs";
import OrderCard from "../components/OrderCard";
import OrderEmpty from "../components/OrderEmpty";
import { useGetOrders } from "@/services/Order/useGetOrders";
import { Loader2 } from "lucide-react";

const OrdersScreen = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { orders, isLoading } = useGetOrders();

  const filteredOrders = orders.filter(
    (order) => activeTab === "all" || order.status === activeTab,
  );

  const mappedOrders = filteredOrders.map((order) => {
    // Formatting date
    const date = new Date(order.createdAt).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const firstItem = order.items?.[0];

    return {
      id: order.id,
      date: date,
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
        originalPrice: firstItem?.price ? firstItem.price * 1.2 : undefined, // Mocking original price if not in API
      },
    };
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#EE4D2D]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-200 font-sans flex flex-col">
      <OrderHeader />
      <OrderTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 flex flex-col gap-2 p-2">
        {mappedOrders.length > 0 ? (
          mappedOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        ) : (
          <OrderEmpty />
        )}
      </main>
    </div>
  );
};

export default OrdersScreen;
