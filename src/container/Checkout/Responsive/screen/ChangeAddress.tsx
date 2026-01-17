import { ChevronLeft, MapPin, CheckCircle2, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAddressStore } from "@/store/addressStore";
import Alert from "@/components/Alert";
import { useState } from "react";

const ChangeAddress = () => {
  const navigate = useNavigate();
  const { addresses, selectedAddressId, actions } = useAddressStore();
  const [deleteAlert, setDeleteAlert] = useState<{
    isOpen: boolean;
    id: string | null;
  }>({
    isOpen: false,
    id: null,
  });

  const handleSelect = (id: string) => {
    actions.selectAddress(id);
    // For now we just navigate back after a small delay to simulate feedback
    setTimeout(() => {
      navigate(-1);
    }, 300);
  };

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setDeleteAlert({ isOpen: true, id });
  };

  const confirmDelete = () => {
    if (deleteAlert.id) {
      actions.removeAddress(deleteAlert.id);
    }
    setDeleteAlert({ isOpen: false, id: null });
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans flex flex-col">
      {/* Header */}
      <header className="px-5 py-6 flex items-center justify-between sticky top-0 bg-[#0B0F19] z-20 border-b border-white/5">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#1F2430] text-gray-300 hover:bg-[#2A3040] transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-white">Select Address</h1>
        <button
          onClick={() => navigate("/outshine/checkout/add-address")}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#1F2430] text-blue-500 hover:bg-[#2A3040] transition-colors"
        >
          <Plus size={24} />
        </button>
      </header>

      <main className="flex-1 px-5 py-6 space-y-4">
        <div className="flex justify-between items-center px-1 mb-2">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest font-sans">
            Saved Addresses
          </h2>
        </div>

        {addresses.map((address) => (
          <div
            key={address.id}
            onClick={() => handleSelect(address.id)}
            className={`bg-[#151B28] rounded-3xl p-5 border transition-all cursor-pointer flex gap-4 ${
              selectedAddressId === address.id
                ? "border-blue-500 bg-blue-500/5"
                : "border-white/5"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                selectedAddressId === address.id
                  ? "bg-blue-500 text-white"
                  : "bg-[#1F2430] text-gray-400"
              }`}
            >
              <MapPin size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0 pr-2">
                  <h3 className="font-bold text-white text-[15px] truncate">
                    {address.name || "Untitled Address"}
                  </h3>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => handleDeleteClick(e, address.id)}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                  {selectedAddressId === address.id && (
                    <CheckCircle2 size={18} className="text-blue-500" />
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                {address.street || "Unknown Street"}
                <br />
                {address.district}, {address.city} {address.postalCode}
              </p>
              {address.isDefault && (
                <span className="inline-block mt-3 px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                  Default
                </span>
              )}
            </div>
          </div>
        ))}

        <button
          onClick={() => navigate("/outshine/checkout/add-address")}
          className="w-full mt-4 py-4 rounded-2xl border-2 border-dashed border-white/10 text-gray-400 font-bold text-sm cursor-pointer hover:border-blue-500/50 hover:text-blue-500 transition-all flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Add New Address
        </button>
      </main>

      <Alert
        isOpen={deleteAlert.isOpen}
        type="confirm"
        title="Delete Address?"
        message="This action cannot be undone. You will need to re-add this address if you want to use it again."
        confirmText="Yes, Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteAlert({ isOpen: false, id: null })}
      />
    </div>
  );
};

export default ChangeAddress;
