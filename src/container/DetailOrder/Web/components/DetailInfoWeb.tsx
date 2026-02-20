import { MapPin, CreditCard } from "lucide-react";
import type { AddressItem } from "@/services/Order/useGetDetailOrder";

interface DetailInfoWebProps {
  address: AddressItem;
  paymentMethod: string;
}

export default function DetailInfoWeb({
  address,
  paymentMethod,
}: DetailInfoWebProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Address Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 flex gap-4">
        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <MapPin size={20} />
        </div>
        <div>
          <h3 className="font-bold text-[#0F172A] mb-3">Alamat Pengiriman</h3>
          <p className="text-sm font-bold text-[#0F172A]">{address.fullName}</p>
          <p className="text-sm text-slate-500 mt-1 mb-2">
            (+62){" "}
            {address.phone.startsWith("0")
              ? address.phone.substring(1)
              : address.phone}
          </p>
          <p className="text-sm text-slate-500 leading-relaxed">
            {address.street}, {address.city}, {address.province},{" "}
            {address.postalCode}
          </p>
        </div>
      </div>

      {/* Payment Method Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 flex gap-4">
        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <CreditCard size={20} />
        </div>
        <div>
          <h3 className="font-bold text-[#0F172A] mb-3">Metode Pembayaran</h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-4 bg-blue-600 rounded flex items-center justify-center text-[8px] text-white font-bold leading-none">
              BCA
            </div>
            <p className="text-sm font-bold text-[#0F172A] uppercase">
              {paymentMethod || "Virtual Account"}
            </p>
          </div>
          <p className="text-sm text-slate-500">
            Status Pembayaran:{" "}
            <span className="font-bold text-green-600">Berhasil</span>
          </p>
        </div>
      </div>
    </div>
  );
}
