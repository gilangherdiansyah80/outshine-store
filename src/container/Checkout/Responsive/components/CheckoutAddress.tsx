import { MapPin, Plus } from "lucide-react";
import type { Address } from "@/store/addressStore";
import { useNavigate } from "react-router-dom";

interface CheckoutAddressProps {
  address?: Address;
}

const CheckoutAddress = ({ address }: CheckoutAddressProps) => {
  const navigate = useNavigate();

  if (!address) {
    return (
      <section className="space-y-3">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">
          Shipping Address
        </h2>
        <button
          onClick={() => navigate("/outshine/checkout/add-address")}
          className="w-full py-8 bg-[#151B28] rounded-3xl border-2 border-dashed border-white/5 flex flex-col items-center cursor-pointer justify-center gap-3 text-gray-400 hover:border-blue-500/50 hover:text-blue-500 transition-all group"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#1F2430] flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
            <Plus size={24} />
          </div>
          <span className="font-bold text-sm">Add Shipping Address</span>
        </button>
      </section>
    );
  }

  return (
    <section className="space-y-3">
      <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">
        Shipping Address
      </h2>
      <div className="bg-[#151B28] rounded-3xl p-5 border border-white/5 flex gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#1F2430] flex items-center justify-center text-blue-500 shrink-0">
          <MapPin size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <article className="flex flex-col gap-1">
              <h3 className="font-bold text-white text-[15px]">
                {address.fullName}
              </h3>
              <h4 className="font-bold text-white text-[15px]">
                {address.phone}
              </h4>
            </article>
            <button
              onClick={() => navigate("/outshine/checkout/change-address")}
              className="text-sm font-bold text-blue-500 hover:text-blue-400"
            >
              Change
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-1 leading-relaxed">
            {address.street}
            <br />
            {address.city} {address.postalCode}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CheckoutAddress;
