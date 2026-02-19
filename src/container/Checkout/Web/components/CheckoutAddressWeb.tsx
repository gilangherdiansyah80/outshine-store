import { MapPin, Plus, ChevronRight } from "lucide-react";
import type { Address } from "@/store/addressStore";
import { useNavigate } from "react-router-dom";

interface CheckoutAddressWebProps {
  address?: Address;
}

export default function CheckoutAddressWeb({
  address,
}: CheckoutAddressWebProps) {
  const navigate = useNavigate();

  if (!address) {
    return (
      <div>
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] mb-3">
          Shipping Address
        </p>
        <button
          onClick={() => navigate("/outshine/checkout/add-address")}
          className="w-full py-8 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center cursor-pointer justify-center gap-3 text-slate-400 hover:border-[#2563EB] hover:text-[#2563EB] transition-all group"
        >
          <div className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center group-hover:bg-[#2563EB] group-hover:text-white group-hover:border-[#2563EB] transition-all shadow-sm">
            <Plus size={22} />
          </div>
          <span className="font-black text-sm">Add Shipping Address</span>
        </button>
      </div>
    );
  }

  return (
    <div>
      <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] mb-3">
        Shipping Address
      </p>
      <div className="bg-slate-50 rounded-3xl p-5 border-2 border-slate-100 flex gap-4 items-start">
        <div className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center text-[#2563EB] shrink-0 shadow-sm">
          <MapPin size={22} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-black text-[#0F172A] text-[15px]">
                {address.fullName}
              </h3>
              <p className="font-bold text-slate-500 text-sm">
                {address.phone}
              </p>
            </div>
            <button
              onClick={() => navigate("/outshine/checkout/change-address")}
              className="flex items-center gap-1 text-[#2563EB] font-black text-xs hover:text-blue-700 transition-colors"
            >
              Change <ChevronRight size={14} />
            </button>
          </div>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            {address.street}
            <br />
            {address.city} {address.postalCode}
          </p>
        </div>
      </div>
    </div>
  );
}
