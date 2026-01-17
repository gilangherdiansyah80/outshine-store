import { useState } from "react";
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
  const { items, getTotalPrice } = useCartStore();
  const { data } = useGetCheckout();
  const { addresses, selectedAddressId } = useAddressStore();

  const [selectedShipping, setSelectedShipping] = useState("ship-1");
  const [selectedPayment, setSelectedPayment] = useState("pay-1");

  if (!data) {
    return null; // Global loader will handle it
  }

  const subtotal = getTotalPrice();
  const shippingMethod = data.shippingMethods.find(
    (m) => m.id === selectedShipping
  );
  const shippingPrice = shippingMethod?.price || 0;
  const estimatedTax = subtotal * 0.08; // 8% tax
  const total = subtotal + shippingPrice + estimatedTax;

  const activeAddress =
    addresses.find((a) => a.id === selectedAddressId) || addresses[0];

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

        <CheckoutItems items={items} />

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

      <CheckoutFooter />
    </div>
  );
};

export default CheckoutScreen;
