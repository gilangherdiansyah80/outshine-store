import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAddressStore } from "@/store/addressStore";
import { useGetAddresses } from "@/services/Order/useGetAddresses";
import {
  postOrderCheckout,
  type PostOrderResponse,
  type PostOrderPayload,
} from "@/services/Order/usePostOrder";
import Alert from "@/components/Alert";
import { formatIDR } from "@/lib/utils";
import CheckoutAddressWeb from "./CheckoutAddressWeb";
import CheckoutPaymentTypeWeb from "./CheckoutPaymentTypeWeb";
import PaymentMethodSelectorWeb from "./PaymentMethodSelectorWeb";
import CheckoutItemsWeb from "./CheckoutItemsWeb";
import PaymentInstructionWeb from "./PaymentInstructionWeb";

export default function CheckoutMainWeb() {
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
  }>({ isOpen: false, title: "", message: "", type: "info" });

  const activeAddress =
    addresses.find((a) => a.id === selectedAddressId) ||
    addresses.find((a) => a.isDefault) ||
    addresses[0];

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

  const isPo = buyNowItem
    ? !!buyNowItem.isPo
    : displayItems.every((i) => i.isPo);
  const poDpPercent = buyNowItem
    ? buyNowItem.poDpPercent || 0
    : displayItems[0]?.poDpPercent || 0;
  const finalTotal =
    paymentType === "dp" ? (totalWeight * poDpPercent) / 100 : totalWeight;

  const handlePlaceOrder = async () => {
    if (!activeAddress) {
      setOrderAlert({
        isOpen: true,
        title: "Shipping Address Required",
        message: "Please select or add a shipping address first.",
        type: "warning",
      });
      return;
    }
    if (!selectedPaymentMethod) {
      setOrderAlert({
        isOpen: true,
        title: "Payment Method Required",
        message: "Please select a payment method to continue.",
        type: "warning",
      });
      return;
    }

    const isBuyNow = !!searchParams.get("productId") || !!buyNowItem;
    const itemToOrder = buyNowItem || items[0];

    if (isBuyNow && !itemToOrder) {
      setOrderAlert({
        isOpen: true,
        title: "Product Data Missing",
        message: "Product information not found. Please try again.",
        type: "error",
      });
      return;
    }
    if (!itemToOrder && items.length === 0) {
      setOrderAlert({
        isOpen: true,
        title: "Cart is Empty",
        message: "No products to process.",
        type: "warning",
      });
      return;
    }

    setIsOrderLoading(true);
    try {
      const payload: PostOrderPayload = {
        addressId: activeAddress.id,
        paymentType,
        paymentMethod: selectedPaymentMethod!,
        paymentProvider: "manual",
      };

      if (isBuyNow && itemToOrder) {
        payload.productId = searchParams.get("productId") || itemToOrder.id;
        payload.sizeId = searchParams.get("sizeId") || itemToOrder.sizeId;
        payload.quantity =
          Number(searchParams.get("quantity")) || itemToOrder.quantity || 1;
      }

      const response = await postOrderCheckout(payload);
      if (response.success) {
        setOrderSuccessData(response.data);
        if (!isBuyNow) clearCart();
      } else {
        setOrderAlert({
          isOpen: true,
          title: "Order Failed",
          message:
            response.message ||
            "An error occurred while processing your order.",
          type: "error",
        });
      }
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : "A connection error occurred.";
      setOrderAlert({
        isOpen: true,
        title: "System Error",
        message: msg,
        type: "error",
      });
    } finally {
      setIsOrderLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-16 min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#2563EB]" />
      </div>
    );
  }

  if (orderSuccessData) {
    return (
      <PaymentInstructionWeb
        orderData={orderSuccessData}
        onDone={() => navigate("/outshine/orders")}
      />
    );
  }

  const canCheckout =
    !!activeAddress && !!selectedPaymentMethod && displayItems.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter">
          Checkout
        </h1>
        <p className="text-gray-400 font-medium mt-2">
          Review your order and complete payment.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">
        {/* Left: Form sections */}
        <div className="space-y-8">
          <div className="bg-white rounded-[2.5rem] p-8 border-2 border-slate-50">
            <CheckoutAddressWeb address={activeAddress} />
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border-2 border-slate-50">
            <CheckoutPaymentTypeWeb
              isPo={isPo}
              poDpPercent={poDpPercent}
              totalFull={totalWeight}
              selectedType={paymentType}
              onSelect={setPaymentType}
            />
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border-2 border-slate-50">
            <PaymentMethodSelectorWeb
              selectedCode={selectedPaymentMethod}
              onSelect={setSelectedPaymentMethod}
            />
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="sticky top-10 space-y-5">
          {/* Items */}
          <div className="bg-white rounded-[2.5rem] p-8 border-2 border-slate-50">
            <CheckoutItemsWeb items={displayItems} />

            {/* Pricing Summary */}
            <div className="mt-6 pt-6 border-t-2 border-slate-50 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-slate-400">
                  Subtotal
                </span>
                <span className="font-black text-[#0F172A]">
                  {formatIDR(subtotal)}
                </span>
              </div>
              {discountTotal > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-400">
                    Discount
                  </span>
                  <span className="font-black text-green-500">
                    -{formatIDR(discountTotal)}
                  </span>
                </div>
              )}
              {paymentType === "dp" && (
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-400">
                    DP ({poDpPercent}%)
                  </span>
                  <span className="font-black text-[#2563EB]">
                    {formatIDR(finalTotal)}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-slate-400">
                  Shipping
                </span>
                <span className="text-xs font-black text-orange-400">
                  Not included
                </span>
              </div>
              <div className="h-px bg-slate-100 my-2" />
              <div className="flex justify-between items-center">
                <span className="font-black text-[#0F172A] uppercase tracking-tighter text-lg">
                  Total
                </span>
                <span className="text-2xl font-black text-[#0F172A] tracking-tighter">
                  {formatIDR(finalTotal)}
                </span>
              </div>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            disabled={!canCheckout || isOrderLoading}
            className="w-full h-16 bg-[#0F172A] hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-slate-200 disabled:shadow-none hover:shadow-2xl active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed"
          >
            {isOrderLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> Processing...
              </>
            ) : (
              "Place Order"
            )}
          </button>

          <div className="flex items-center gap-3 justify-center">
            <div className="h-px flex-1 bg-slate-100" />
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
              Secure Checkout
            </span>
            <div className="h-px flex-1 bg-slate-100" />
          </div>
        </div>
      </div>

      <Alert
        isOpen={orderAlert.isOpen}
        title={orderAlert.title}
        message={orderAlert.message}
        type={orderAlert.type}
        onConfirm={() => setOrderAlert((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
