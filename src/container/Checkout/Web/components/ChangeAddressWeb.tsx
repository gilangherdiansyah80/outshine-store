import { useNavigate } from "react-router-dom";
import { useAddressStore } from "@/store/addressStore";
import { useGetAddresses } from "@/services/Order/useGetAddresses";
import { setAddressDefault } from "@/services/Order/useChangeDefault";
import { deleteAddress } from "@/services/Order/useDeleteAddresses";
import Alert from "@/components/Alert";
import { useState } from "react";
import {
  ChevronLeft,
  MapPin,
  CheckCircle2,
  Plus,
  Trash2,
  Loader2,
} from "lucide-react";

export default function ChangeAddressWeb() {
  const navigate = useNavigate();
  const { selectedAddressId, actions } = useAddressStore();
  const { addresses: dbAddresses, isLoading, mutate } = useGetAddresses();
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [deleteAlert, setDeleteAlert] = useState<{
    isOpen: boolean;
    id: string | null;
  }>({
    isOpen: false,
    id: null,
  });

  const handleSelect = (id: string) => {
    actions.selectAddress(id);
    setTimeout(() => {
      navigate(-1);
    }, 200);
  };

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setDeleteAlert({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    if (deleteAlert.id) {
      try {
        const response = await deleteAddress(deleteAlert.id);
        if (response.success) {
          actions.removeAddress(deleteAlert.id);
          await mutate();
        }
      } catch (error) {
        console.error("Failed to delete address:", error);
      }
    }
    setDeleteAlert({ isOpen: false, id: null });
  };

  const handleSetDefault = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setIsUpdating(id);
    try {
      const response = await setAddressDefault(id);
      if (response.success) {
        await mutate();
      }
    } catch (error) {
      console.error("Failed to set default address:", error);
    } finally {
      setIsUpdating(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      {/* Header */}
      <div className="mb-12 flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#2563EB] transition-colors mb-4 group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Checkout
          </button>
          <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter">
            Select Address
          </h1>
          <p className="text-gray-400 font-medium mt-2">
            Choose where you want your order to be delivered.
          </p>
        </div>
        <button
          onClick={() => navigate("/outshine/checkout/add-address")}
          className="h-14 px-6 bg-[#2563EB] hover:bg-blue-700 text-white font-black rounded-2xl flex items-center gap-3 transition-all shadow-lg shadow-blue-100 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus size={20} />
          Add New Address
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-[#2563EB]" />
          </div>
        ) : dbAddresses.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] p-16 border-2 border-slate-50 text-center">
            <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-300 mx-auto mb-6">
              <MapPin size={40} />
            </div>
            <h3 className="text-xl font-black text-[#0F172A]">No Saved Addresses</h3>
            <p className="text-slate-400 font-medium mt-2 max-w-xs mx-auto">
              Please add a shipping address to proceed with your order.
            </p>
          </div>
        ) : (
          dbAddresses.map((address) => (
            <div
              key={address.id}
              onClick={() => handleSelect(address.id)}
              className={`group bg-white rounded-[2.5rem] p-8 border-2 transition-all cursor-pointer flex gap-6 items-start ${
                selectedAddressId === address.id
                  ? "border-[#2563EB] shadow-xl shadow-blue-50"
                  : "border-slate-50 hover:border-slate-100 hover:shadow-lg"
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all ${
                  selectedAddressId === address.id
                    ? "bg-[#2563EB] text-white shadow-lg shadow-blue-200"
                    : "bg-slate-50 text-slate-300 group-hover:bg-slate-100"
                }`}
              >
                <MapPin size={28} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-black text-[#0F172A] text-lg">
                      {address.fullName}
                    </h3>
                    <p className="font-bold text-slate-400">{address.phone}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {!address.isDefault && (
                      <button
                        onClick={(e) => handleSetDefault(e, address.id)}
                        disabled={isUpdating === address.id}
                        className="px-4 py-2 rounded-xl bg-slate-50 text-slate-400 text-xs font-black uppercase tracking-wider hover:bg-[#2563EB] hover:text-white transition-all disabled:opacity-50"
                      >
                        {isUpdating === address.id ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : (
                          "Set Default"
                        )}
                      </button>
                    )}
                    <button
                      onClick={(e) => handleDeleteClick(e, address.id)}
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:bg-red-50 hover:text-red-500 transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                    {selectedAddressId === address.id && (
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#2563EB]">
                        <CheckCircle2 size={22} />
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-slate-500 font-medium leading-relaxed mt-3">
                  {address.street}
                  <br />
                  {address.city}, {address.province} {address.postalCode}
                </p>

                {address.isDefault && (
                  <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-[#2563EB] uppercase tracking-widest bg-blue-50 w-fit px-3 py-1 rounded-lg border border-blue-100 shadow-sm">
                    <CheckCircle2 size={12} />
                    Main Address
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <Alert
        isOpen={deleteAlert.isOpen}
        type="confirm"
        title="Delete Address?"
        message="This action cannot be undone. Are you sure you want to remove this address?"
        confirmText="Yes, Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteAlert({ isOpen: false, id: null })}
      />
    </div>
  );
}
