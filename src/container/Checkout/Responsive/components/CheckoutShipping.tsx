import { CheckCircle2, Circle } from "lucide-react";
import type { ShippingMethod } from "@/services/Checkout/useGetCheckout";

interface CheckoutShippingProps {
  methods: ShippingMethod[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const CheckoutShipping = ({
  methods,
  selectedId,
  onSelect,
}: CheckoutShippingProps) => {
  return (
    <section className="space-y-3">
      <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">
        Shipping Method
      </h2>
      <div className="space-y-3">
        {methods.map((method) => (
          <div
            key={method.id}
            onClick={() => onSelect(method.id)}
            className={`bg-[#151B28] rounded-3xl p-5 border transition-all cursor-pointer flex items-center justify-between ${
              selectedId === method.id ? "border-blue-500/50" : "border-white/5"
            }`}
          >
            <div className="space-y-0.5">
              <h3 className="font-bold text-white text-[15px]">
                {method.name}
              </h3>
              <p className="text-xs text-gray-500">
                {method.description} •{" "}
                {method.price === 0 ? "Free" : `$${method.price.toFixed(2)}`}
              </p>
            </div>
            {selectedId === method.id ? (
              <CheckCircle2 size={22} className="text-blue-500" />
            ) : (
              <Circle size={22} className="text-gray-600" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CheckoutShipping;
