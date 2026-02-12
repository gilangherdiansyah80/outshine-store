import { MapPin } from "lucide-react";
import type { AddressItem } from "@/services/Order/useGetDetailOrder";

interface OrderDetailAddressProps {
  address: AddressItem;
}

const OrderDetailAddress = ({ address }: OrderDetailAddressProps) => {
  return (
    <div className="bg-white p-4 mb-2 rounded-xl">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm font-semibold text-gray-800">
          Alamat Pengiriman
        </span>
      </div>

      <div className="flex gap-3">
        <div className="bg-gray-50 rounded-full w-8 h-8 flex items-center justify-center shrink-0">
          <MapPin size={18} className="text-[#0F172A]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-800 font-bold mb-1">
            {address.fullName} ({address.phone})
          </p>
          <div className="text-[13px] text-gray-500 leading-tight">
            {address.street}, {address.city}, {address.province},{" "}
            {address.postalCode}.
            <span className="text-blue-500 ml-1 cursor-pointer font-medium">
              Lihat
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailAddress;
