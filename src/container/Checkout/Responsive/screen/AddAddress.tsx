import { ChevronLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAddressStore } from "@/store/addressStore";
import { postAddress } from "@/services/Order/usePostAddress";

interface AddressFormData {
  fullName: string;
  phone: string;
  street: string;
  province: string;
  city: string;
  postalCode: string;
}

const AddAddress = () => {
  const navigate = useNavigate();
  const { actions } = useAddressStore();
  const [isDefault, setIsDefault] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<AddressFormData>({
    fullName: "",
    phone: "",
    street: "",
    province: "",
    city: "",
    postalCode: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const payload = {
      ...formData,
      isDefault,
    };

    try {
      const response = await postAddress(payload);

      if (response.success) {
        // Update local store as well to keep UI in sync
        actions.addAddress(payload);

        navigate(-1);
      } else {
        setError(response.message || "Failed to save address");
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as keyof AddressFormData]: value,
    }));
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
        <h1 className="text-lg font-bold text-white tracking-tight">
          Add New Address
        </h1>
        <div className="w-10" /> {/* Spacer */}
      </header>

      <main className="flex-1 px-5 py-8">
        <form onSubmit={handleSubmit} className="space-y-6 pb-32">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-4 text-red-500 text-xs font-bold">
              {error}
            </div>
          )}

          {/* Section: Contact Info */}
          <div className="space-y-4">
            <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] px-1">
              Contact Information
            </h2>
            <div className="space-y-3">
              <div className="bg-[#151B28] rounded-2xl p-4 border border-white/5 focus-within:border-blue-500/50 transition-all group">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 px-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Sarah Mitchell"
                  className="w-full bg-transparent border-none focus:outline-none text-white text-[15px] placeholder:text-gray-600 font-medium"
                  required
                />
              </div>
              <div className="bg-[#151B28] rounded-2xl p-4 border border-white/5 focus-within:border-blue-500/50 transition-all">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 px-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. +1 234 567 890"
                  className="w-full bg-transparent border-none focus:outline-none text-white text-[15px] placeholder:text-gray-600 font-medium"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section: Address Details */}
          <div className="space-y-4">
            <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] px-1">
              Address Details
            </h2>
            <div className="space-y-3">
              <div className="bg-[#151B28] rounded-2xl p-4 border border-white/5 focus-within:border-blue-500/50 transition-all">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 px-1">
                  Street Address
                </label>
                <textarea
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="e.g. 248 Fashion District, Suite 12"
                  rows={2}
                  className="w-full bg-transparent border-none focus:outline-none text-white text-[15px] placeholder:text-gray-600 font-medium resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#151B28] rounded-2xl p-4 border border-white/5 focus-within:border-blue-500/50 transition-all">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 px-1">
                    Province
                  </label>
                  <input
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    placeholder="e.g. DKI Jakarta"
                    className="w-full bg-transparent border-none focus:outline-none text-white text-[15px] placeholder:text-gray-600 font-medium"
                    required
                  />
                </div>
                <div className="bg-[#151B28] rounded-2xl p-4 border border-white/5 focus-within:border-blue-500/50 transition-all">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 px-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. South Jakarta"
                    className="w-full bg-transparent border-none focus:outline-none text-white text-[15px] placeholder:text-gray-600 font-medium"
                    required
                  />
                </div>
              </div>

              <div className="bg-[#151B28] rounded-2xl p-4 border border-white/5 focus-within:border-blue-500/50 transition-all">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 px-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="e.g. 12345"
                  className="w-full bg-transparent border-none focus:outline-none text-white text-[15px] placeholder:text-gray-600 font-medium"
                  required
                />
              </div>
            </div>
          </div>

          {/* Toggle: Set as Default */}
          <div className="flex items-center justify-between px-2 py-2">
            <div>
              <h3 className="text-sm font-bold text-white">
                Set as Default Address
              </h3>
              <p className="text-[11px] text-gray-500 font-medium mt-0.5">
                Use this as primary billing & shipping address
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsDefault(!isDefault)}
              className={`w-12 h-6 rounded-full transition-all relative ${
                isDefault ? "bg-blue-600" : "bg-[#1F2430]"
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                  isDefault
                    ? "left-7 shadow-[0_0_10px_rgba(255,255,255,0.4)]"
                    : "left-1"
                }`}
              />
            </button>
          </div>
        </form>
      </main>

      {/* Footer Action */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19] to-transparent">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white cursor-pointer font-bold rounded-2xl shadow-[0_10px_30px_-10px_rgba(37,99,235,0.5)] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving Address...
            </>
          ) : (
            "Save Address"
          )}
        </button>
      </div>
    </div>
  );
};

export default AddAddress;
