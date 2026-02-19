import { useState } from "react";
import { User, Camera, Loader2, Check } from "lucide-react";
import { useGetProfile } from "@/services/Profile/useGetProfile";

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
}

interface FieldConfig {
  fieldKey: keyof ProfileFormData;
  label: string;
  type?: string;
  disabled?: boolean;
  placeholder: string;
}

const fields: FieldConfig[] = [
  { fieldKey: "name", label: "Full Name", placeholder: "Enter full name" },
  {
    fieldKey: "email",
    label: "Email",
    type: "email",
    disabled: true,
    placeholder: "Email cannot be changed",
  },
  {
    fieldKey: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "Enter phone number",
  },
];

export default function EditProfilePanel() {
  const { profile, isLoading } = useGetProfile();

  const [formData, setFormData] = useState<ProfileFormData>({
    name: profile?.fullName ?? "",
    email: profile?.email ?? "",
    phone: profile?.phone ?? "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Merge any newly-loaded profile data that hasn't been typed over
  const mergedData: ProfileFormData = {
    name: formData.name || profile?.fullName || "",
    email: profile?.email || formData.email || "",
    phone: formData.phone || profile?.phone || "",
  };

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: Implement save profile API
    await new Promise((r) => setTimeout(r, 1200));
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleChange = (fieldKey: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldKey]: value }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">
          Edit Profile
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Update your personal information.
        </p>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-6">
        <div className="relative w-24 h-24 shrink-0">
          <div className="w-24 h-24 bg-slate-100 rounded-3xl border-2 border-slate-100 overflow-hidden flex items-center justify-center">
            {isLoading ? (
              <Loader2 size={28} className="text-slate-300 animate-spin" />
            ) : profile?.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={32} className="text-slate-300" />
            )}
          </div>
          <button
            type="button"
            className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#0F172A] rounded-xl flex items-center justify-center text-white shadow-lg cursor-pointer hover:bg-slate-700 transition-colors"
          >
            <Camera size={14} />
          </button>
        </div>
        <div>
          <p className="font-black text-[#0F172A]">
            {isLoading ? "Loading..." : mergedData.name || "Your Name"}
          </p>
          <p className="text-sm text-slate-400 mt-1">
            Click the camera icon to change your photo
          </p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {fields.map(
          ({ fieldKey, label, type = "text", disabled, placeholder }) => (
            <div key={fieldKey}>
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.12em] block mb-2">
                {label}
              </label>
              <input
                type={type}
                value={mergedData[fieldKey]}
                disabled={disabled || isLoading}
                placeholder={placeholder}
                onChange={(e) => handleChange(fieldKey, e.target.value)}
                className="w-full h-14 px-5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-[#0F172A] text-sm focus:outline-none focus:border-[#2563EB] transition-colors disabled:text-slate-400 disabled:cursor-not-allowed placeholder:text-slate-300"
              />
            </div>
          ),
        )}
      </div>

      {/* Save Button */}
      <button
        type="button"
        onClick={handleSave}
        disabled={isSaving || isLoading}
        className="h-14 px-10 bg-[#0F172A] hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-slate-200 disabled:shadow-none hover:shadow-2xl active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed min-w-48"
      >
        {isSaving ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Saving...
          </>
        ) : saved ? (
          <>
            <Check size={18} /> Saved!
          </>
        ) : (
          "Save Changes"
        )}
      </button>
    </div>
  );
}
