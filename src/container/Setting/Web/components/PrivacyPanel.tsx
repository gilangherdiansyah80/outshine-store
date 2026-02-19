import { Key, Trash2, ChevronRight } from "lucide-react";

const securityItems = [
  {
    icon: Key,
    label: "Change Password",
    description: "Update your account password",
    danger: false,
  },
  {
    icon: Trash2,
    label: "Delete Account",
    description: "Permanently delete your account and all data",
    danger: true,
  },
];

export default function PrivacyPanel() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">
          Privacy & Security
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Manage your account permissions and security.
        </p>
      </div>

      {/* Account Security */}
      <div className="space-y-3">
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">
          Account Security
        </p>
        <div className="space-y-2">
          {securityItems.map(({ icon: Icon, label, description, danger }) => (
            <button
              key={label}
              className={`group w-full bg-white rounded-2xl p-5 border-2 flex items-center gap-4 text-left transition-all cursor-pointer ${
                danger
                  ? "border-red-50 hover:bg-red-50 hover:border-red-100"
                  : "border-slate-50 hover:bg-slate-50 hover:border-slate-100"
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${danger ? "bg-red-50" : "bg-slate-50"}`}
              >
                <Icon
                  size={20}
                  className={danger ? "text-red-500" : "text-slate-500"}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`font-black text-sm ${danger ? "text-red-500" : "text-[#0F172A]"}`}
                >
                  {label}
                </p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  {description}
                </p>
              </div>
              <ChevronRight
                size={18}
                className="text-slate-200 group-hover:text-slate-400 transition-colors shrink-0"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Info note */}
      <div className="bg-blue-50 border-2 border-blue-100 rounded-2xl p-5">
        <p className="text-xs font-bold text-blue-500 leading-relaxed">
          Changes to your account security settings will take effect
          immediately. Make sure to remember your new password.
        </p>
      </div>
    </div>
  );
}
