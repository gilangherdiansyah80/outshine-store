import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Loader2 } from "lucide-react";
import { postAddress } from "@/services/Order/usePostAddress";
import { useAddressStore } from "@/store/addressStore";
import { useGetAddresses } from "@/services/Order/useGetAddresses";
import Alert from "@/components/Alert";

export default function AddAddressWeb() {
  const navigate = useNavigate();
  const { actions } = useAddressStore();
  const { mutate } = useGetAddresses();
  const [isLoading, setIsLoading] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "success" | "error" | "warning" | "info";
  }>({ isOpen: false, title: "", message: "", type: "info" });

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    province: "",
    postalCode: "",
    isDefault: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await postAddress(formData);
      if (response.success) {
        await mutate();
        if (response.data?.id) {
          actions.selectAddress(response.data.id);
        }
        setAlertConfig({
          isOpen: true,
          title: "Address Added",
          message: "Your new shipping address has been saved.",
          type: "success",
        });
        setTimeout(() => navigate(-1), 1500);
      } else {
        setAlertConfig({
          isOpen: true,
          title: "Failed to Add Address",
          message: response.message || "An error occurred.",
          type: "error",
        });
      }
    } catch (error) {
      setAlertConfig({
        isOpen: true,
        title: "System Error",
        message:
          error instanceof Error ? error.message : "A connection error occurred.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-8 py-16">
      {/* Header */}
      <div className="mb-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#2563EB] transition-colors mb-4 group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back
        </button>
        <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter">
          Add New Address
        </h1>
        <p className="text-gray-400 font-medium mt-2">
          Your accurate shipping details ensure a smooth delivery.
        </p>
      </div>

      <div className="bg-white rounded-[2.5rem] p-12 border-2 border-slate-50 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section: Contact Info */}
          <div className="space-y-4">
            <h2 className="text-xs font-black text-slate-300 uppercase tracking-widest flex items-center gap-2">
              <span className="w-6 h-px bg-slate-100" />
              Contact Information
            </h2>
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. John Doe"
                  className="w-full h-14 px-6 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-[#0F172A] placeholder:text-slate-300 focus:border-[#2563EB] focus:bg-white transition-all outline-none"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">
                  Phone Number
                </label>
                <input
                  required
                  type="tel"
                  placeholder="e.g. +62 812..."
                  className="w-full h-14 px-6 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-[#0F172A] placeholder:text-slate-300 focus:border-[#2563EB] focus:bg-white transition-all outline-none"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Section: Shipping Details */}
          <div className="space-y-4 pt-2">
            <h2 className="text-xs font-black text-slate-300 uppercase tracking-widest flex items-center gap-2">
              <span className="w-6 h-px bg-slate-100" />
              Shipping Details
            </h2>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">
                Street Address
              </label>
              <textarea
                required
                rows={3}
                placeholder="Complete street name, building number, or house details"
                className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-4xl font-bold text-[#0F172A] placeholder:text-slate-300 focus:border-[#2563EB] focus:bg-white transition-all outline-none resize-none"
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">
                  Province
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Jawa Barat"
                  className="w-full h-14 px-6 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-[#0F172A] placeholder:text-slate-300 focus:border-[#2563EB] focus:bg-white transition-all outline-none"
                  value={formData.province}
                  onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">
                  City / District
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Bandung"
                  className="w-full h-14 px-6 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-[#0F172A] placeholder:text-slate-300 focus:border-[#2563EB] focus:bg-white transition-all outline-none"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">
                  Postal Code
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. 40123"
                  className="w-full h-14 px-6 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-[#0F172A] placeholder:text-slate-300 focus:border-[#2563EB] focus:bg-white transition-all outline-none"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                />
              </div>

              <div className="flex items-center gap-3 pt-6 px-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  className="w-5 h-5 rounded-lg border-2 border-slate-200 text-[#2563EB] focus:ring-offset-0 cursor-pointer transition-all"
                  checked={formData.isDefault}
                  onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                />
                <label htmlFor="isDefault" className="text-sm font-black text-slate-500 cursor-pointer select-none">
                  Set as Main Address
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-16 bg-[#0F172A] hover:bg-[#1F2430] text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-slate-100 disabled:bg-slate-200 disabled:shadow-none hover:shadow-2xl active:scale-[0.98] mt-10"
          >
            {isLoading ? (
              <>
                <Loader2 size={24} className="animate-spin" /> Saving Address...
              </>
            ) : (
              "Save Shipping Address"
            )}
          </button>
        </form>
      </div>

      <Alert
        isOpen={alertConfig.isOpen}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        onConfirm={() => setAlertConfig((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
