import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";
import { useGetCheckout } from "@/services/Checkout/useGetCheckout";
import { useAddressStore } from "@/store/addressStore";
import CheckoutHeader from "../components/CheckoutHeader";
import CheckoutAddress from "../components/CheckoutAddress";
import CheckoutShipping from "../components/CheckoutShipping";
import CheckoutItems from "../components/CheckoutItems";
import CheckoutPayment from "../components/CheckoutPayment";
import CheckoutSummary from "../components/CheckoutSummary";
import CheckoutFooter from "../components/CheckoutFooter";

const CheckoutScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const buyNowItem = location.state?.buyNowItem;

  const { items: cartItems, getTotalPrice } = useCartStore();
  const { data } = useGetCheckout();
  const { addresses, selectedAddressId } = useAddressStore();

  const [selectedShipping, setSelectedShipping] = useState("ship-1");
  const [selectedPayment, setSelectedPayment] = useState("pay-1");

  if (!data) {
    return null; // Global loader will handle it
  }

  // Use either buyNowItem or cartItems
  const displayItems = buyNowItem ? [buyNowItem] : cartItems;
  const subtotal = buyNowItem
    ? buyNowItem.price * buyNowItem.quantity
    : getTotalPrice();

  const shippingMethod = data.shippingMethods.find(
    (m) => m.id === selectedShipping,
  );
  const shippingPrice = shippingMethod?.price || 0;
  const estimatedTax = subtotal * 0.08; // 8% tax
  const total = subtotal + shippingPrice + estimatedTax;

  const activeAddress =
    addresses.find((a) => a.id === selectedAddressId) || addresses[0];

  const handlePlaceOrder = () => {
    const paymentMethod = data.paymentMethods.find(
      (m) => m.id === selectedPayment,
    );
    navigate("./payment", {
      state: {
        total,
        paymentMethod,
        buyNowItem,
        address: activeAddress,
        shippingMethod,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans flex flex-col pb-32">
      <CheckoutHeader />

      <main className="flex-1 px-5 py-6 space-y-8">
        <CheckoutAddress address={activeAddress} />

        <CheckoutShipping
          methods={data.shippingMethods}
          selectedId={selectedShipping}
          onSelect={setSelectedShipping}
        />

        <CheckoutItems items={displayItems} />

        <CheckoutPayment
          methods={data.paymentMethods}
          selectedId={selectedPayment}
          onSelect={setSelectedPayment}
        />

        <CheckoutSummary
          subtotal={subtotal}
          shipping={shippingPrice}
          tax={estimatedTax}
          total={total}
        />
      </main>

      <CheckoutFooter onClick={handlePlaceOrder} />
    </div>
  );
};

export default CheckoutScreen;
