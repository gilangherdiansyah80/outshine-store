import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useAddressStore } from "@/store/addressStore";
import { useGetAddresses } from "@/services/Order/useGetAddresses";
import { postOrderCheckout } from "@/services/Order/usePostOrder";
import CheckoutHeader from "../components/CheckoutHeader";
import CheckoutAddress from "../components/CheckoutAddress";
import CheckoutItems from "../components/CheckoutItems";
import CheckoutType from "../components/CheckoutType";
import CheckoutSummary from "../components/CheckoutSummary";
import CheckoutFooter from "../components/CheckoutFooter";
import Alert from "@/components/Alert";
import { Loader2 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PaymentMethodSelector from "../components/PaymentMethodSelector";
import PaymentInstruction from "../components/PaymentInstruction";
import type {
  PostOrderResponse,
  PostOrderPayload,
} from "@/services/Order/usePostOrder";

const CheckoutScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [paymentType, setPaymentType] = useState<"full" | "dp">("full");
  const { items, buyNowItem, clearCart } = useCartStore();
  const { selectedAddressId } = useAddressStore();
  const { addresses, isLoading } = useGetAddresses();
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  const [orderSuccessData, setOrderSuccessData] = useState<
    PostOrderResponse["data"] | null
  >(null);
  const [orderAlert, setOrderAlert] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "success" | "warning" | "error" | "info" | "confirm";
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });

  const activeAddress =
    addresses.find((a) => a.id === selectedAddressId) ||
    addresses.find((a) => a.isDefault) ||
    addresses[0];

  const handlePlaceOrder = async () => {
    if (!activeAddress) {
      setOrderAlert({
        isOpen: true,
        title: "Alamat belum dipilih",
        message: "Silakan pilih atau tambah alamat pengiriman terlebih dahulu.",
        type: "warning",
      });
      return;
    }

    if (!selectedPaymentMethod) {
      setOrderAlert({
        isOpen: true,
        title: "Metode Pembayaran",
        message: "Silakan pilih metode pembayaran terlebih dahulu.",
        type: "warning",
      });
      return;
    }

    const isBuyNow = !!searchParams.get("productId") || !!buyNowItem;
    const itemToOrder = buyNowItem || items[0];

    if (isBuyNow && !itemToOrder) {
      setOrderAlert({
        isOpen: true,
        title: "Data Produk Hilang",
        message:
          "Informasi produk tidak ditemukan. Silakan ulangi proses pemilihan produk.",
        type: "error",
      });
      return;
    }

    if (!itemToOrder && items.length === 0) {
      setOrderAlert({
        isOpen: true,
        title: "Keranjang Kosong",
        message: "Tidak ada produk untuk diproses.",
        type: "warning",
      });
      return;
    }

    setIsOrderLoading(true);

    try {
      const payload: PostOrderPayload = {
        addressId: activeAddress.id,
        paymentType: paymentType,
        paymentMethod: selectedPaymentMethod!,
        paymentProvider: "manual",
      };

      // Condition B: Buy Now
      if (isBuyNow && itemToOrder) {
        payload.productId = searchParams.get("productId") || itemToOrder.id;
        payload.sizeId = searchParams.get("sizeId") || itemToOrder.sizeId;
        payload.quantity =
          Number(searchParams.get("quantity")) || itemToOrder.quantity || 1;
      }
      // Condition A: Cart Checkout - no productId/sizeId/quantity needed (backend handles it from user's current cart)

      console.log("Sending payload:", payload);

      const response = await postOrderCheckout(payload);

      if (response.success) {
        setOrderSuccessData(response.data);
        // Clear cart if it was a cart checkout
        if (!isBuyNow) {
          clearCart();
        }
      } else {
        setOrderAlert({
          isOpen: true,
          title: "Gagal Membuat Pesanan",
          message:
            response.message ||
            "Terjadi kesalahan saat memproses pesanan Anda.",
          type: "error",
        });
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Terjadi kesalahan koneksi.";
      setOrderAlert({
        isOpen: true,
        title: "Kesalahan Sistem",
        message: errorMessage,
        type: "error",
      });
    } finally {
      setIsOrderLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-white font-sans flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  // Use buyNowItem if it exists, otherwise use cart items
  const displayItems = buyNowItem ? [buyNowItem] : items;

  const subtotal = displayItems.reduce(
    (acc, item) =>
      acc + (Number(item.originalPrice) || Number(item.price)) * item.quantity,
    0,
  );
  const totalWeight = displayItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0,
  );
  const discountTotal = subtotal - totalWeight;

  // PO Logic
  const isPo = buyNowItem
    ? !!buyNowItem.isPo
    : displayItems.every((i) => i.isPo);
  const poDpPercent = buyNowItem
    ? buyNowItem.poDpPercent || 0
    : displayItems[0]?.poDpPercent || 0;

  const finalTotal =
    paymentType === "dp" ? (totalWeight * poDpPercent) / 100 : totalWeight;

  if (orderSuccessData) {
    return (
      <PaymentInstruction
        orderData={orderSuccessData}
        onDone={() => navigate("/outshine/orders")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans flex flex-col pb-44">
      <CheckoutHeader />

      <main className="flex-1 px-5 py-6 space-y-8">
        <CheckoutAddress address={activeAddress} />

        <CheckoutType
          isPo={isPo}
          poDpPercent={poDpPercent}
          totalFull={totalWeight}
          selectedType={paymentType}
          onSelect={setPaymentType}
        />

        <PaymentMethodSelector
          selectedCode={selectedPaymentMethod}
          onSelect={setSelectedPaymentMethod}
        />

        <CheckoutItems items={displayItems} />

        <CheckoutSummary
          subtotal={subtotal}
          discount={discountTotal}
          total={finalTotal}
        />
      </main>

      <CheckoutFooter
        onPlaceOrder={handlePlaceOrder}
        isLoading={isOrderLoading}
        disabled={
          !activeAddress || !selectedPaymentMethod || displayItems.length === 0
        }
      />

      <Alert
        isOpen={orderAlert.isOpen}
        title={orderAlert.title}
        message={orderAlert.message}
        type={orderAlert.type}
        onConfirm={() => {
          setOrderAlert((prev) => ({ ...prev, isOpen: false }));
        }}
      />
    </div>
  );
};

export default CheckoutScreen;
