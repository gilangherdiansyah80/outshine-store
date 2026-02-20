import { MapPin, Phone, User } from "lucide-react";
import type { AddressItem } from "@/services/Order/useGetDetailOrder";

interface DetailAddressWebProps {
  address: AddressItem;
}

export default function DetailAddressWeb({ address }: DetailAddressWebProps) {
  return (
    <div className="bg-white rounded-3xl border-2 border-slate-50 p-6">
      <h3 className="text-lg font-black text-[#0F172A] mb-6 flex items-center gap-2">
        <MapPin className="text-[#2563EB]" size={20} />
        Alamat Pengiriman
      </h3>

      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-400 shrink-0">
            <User size={20} />
          </div>
          <div>
            <p className="font-black text-[#0F172A]">{address.fullName}</p>
            <p className="text-sm text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
              <Phone size={14} className="text-slate-400" />
              {address.phone}
            </p>
          </div>
        </div>

        <div className="h-px w-full bg-slate-200" />

        <div className="pt-2">
          <p className="text-[#0F172A] text-sm leading-relaxed font-medium">
            {address.street}
          </p>
          <p className="text-[#0F172A] text-sm mt-1 font-medium">
            {address.city}, {address.province} {address.postalCode}
          </p>
        </div>
      </div>
    </div>
  );
}
