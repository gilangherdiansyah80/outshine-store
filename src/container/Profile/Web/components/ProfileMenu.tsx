import { useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  Settings,
  ChevronRight,
  LogOut,
  Loader2,
} from "lucide-react";

const menuItems = [
  {
    icon: ShoppingBag,
    label: "My Orders",
    description: "Track and manage your orders",
    path: "/outshine/orders",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: Heart,
    label: "Wishlist",
    description: "Items you've saved for later",
    path: "/outshine/wishlist",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    icon: Settings,
    label: "Settings",
    description: "Account preferences and security",
    path: "/outshine/setting",
    color: "text-slate-500",
    bg: "bg-slate-50",
  },
];

interface ProfileMenuProps {
  onLogout: () => void;
  isLogoutLoading: boolean;
}

export default function ProfileMenu({
  onLogout,
  isLogoutLoading,
}: ProfileMenuProps) {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] px-1">
        Quick Navigation
      </p>

      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="group w-full bg-white rounded-3xl p-6 border-2 border-slate-50 flex items-center gap-5 text-left transition-all duration-300 hover:shadow-lg hover:shadow-slate-100 hover:border-slate-100 hover:-translate-y-0.5 cursor-pointer"
          >
            <div
              className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center shrink-0 transition-all group-hover:scale-105`}
            >
              <Icon size={24} className={item.color} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-black text-[#0F172A] text-base group-hover:text-[#2563EB] transition-colors">
                {item.label}
              </h3>
              <p className="text-sm text-slate-400 font-medium mt-0.5">
                {item.description}
              </p>
            </div>
            <ChevronRight
              size={20}
              className="text-slate-200 group-hover:text-[#2563EB] group-hover:translate-x-1 transition-all shrink-0"
            />
          </button>
        );
      })}

      <div className="flex items-center gap-4 py-2">
        <div className="h-px flex-1 bg-slate-100" />
        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
          Account
        </span>
        <div className="h-px flex-1 bg-slate-100" />
      </div>

      <button
        onClick={onLogout}
        disabled={isLogoutLoading}
        className="group w-full bg-white rounded-3xl p-6 border-2 border-slate-50 flex items-center gap-5 text-left transition-all duration-300 hover:bg-red-50 hover:border-red-100 hover:shadow-lg hover:shadow-red-50 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center shrink-0 transition-all group-hover:bg-red-100 group-hover:scale-105">
          {isLogoutLoading ? (
            <Loader2 size={24} className="text-red-500 animate-spin" />
          ) : (
            <LogOut size={24} className="text-red-500" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-black text-red-500 text-base">
            {isLogoutLoading ? "Logging out..." : "Log Out"}
          </h3>
          <p className="text-sm text-slate-400 font-medium mt-0.5">
            Sign out from your account
          </p>
        </div>
      </button>
    </div>
  );
}
