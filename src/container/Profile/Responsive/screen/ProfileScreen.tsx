import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  User,
  LogOut,
  ChevronRight,
  Settings,
  ShoppingBag,
  Heart,
  Loader2,
} from "lucide-react";
import { usePostLogout } from "@/services/Auth/usePostLogout";
import { useTokenActions } from "@/lib/auth-adapter/tokenStore";
import { useUserActions } from "@/lib/auth-adapter/userStore";
import Alert from "@/components/Alert";

import { useGetProfile } from "@/services/Profile/useGetProfile";

const ProfileScreen = () => {
  const navigate = useNavigate();
  const { profile, isLoading: isProfileLoading } = useGetProfile();
  const { trigger: logout, isLoading: isLogoutLoading } = usePostLogout();
  const { clearToken } = useTokenActions();
  const { clearUser } = useUserActions();

  // ... alert state code ...
  const [alertConfig, setAlertConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "success" | "error" | "warning" | "info";
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });

  const showAlert = (
    title: string,
    message: string,
    type: "success" | "error" | "warning" | "info" = "info",
  ) => {
    setAlertConfig({ isOpen: true, title, message, type });
  };

  const closeAlert = () => {
    setAlertConfig((prev) => ({ ...prev, isOpen: false }));
  };

  // Combined Loading State
  const isLoading = isProfileLoading || isLogoutLoading;

  const handleLogout = async () => {
    try {
      const result = await logout();

      if (result?.success) {
        // Clear local session
        clearToken();
        clearUser();

        showAlert("Logout Berhasil", "Anda telah keluar dari akun.", "success");

        // Redirect to welcome page after a short delay
        setTimeout(() => {
          navigate("/outshine/home", { replace: true });
        }, 1500);
      } else {
        showAlert(
          "Logout Gagal",
          result?.message || "Terjadi kesalahan saat logout.",
          "error",
        );
      }
    } catch (_error) {
      // Even if API fails, still clear local session
      clearToken();
      clearUser();
      navigate("/outshine/welcome", { replace: true });
    }
  };

  const menuItems = [
    {
      icon: <ShoppingBag size={20} />,
      label: "Pesanan Saya",
      path: "/outshine/orders",
    },
    {
      icon: <Heart size={20} />,
      label: "Wishlist",
      path: "/outshine/wishlist",
    },
    {
      icon: <Settings size={20} />,
      label: "Pengaturan",
      path: "/outshine/setting",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header Profile */}
      <div className="bg-[#0F172A] pt-12 pb-20 px-6 rounded-b-[40px] shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 overflow-hidden">
            {isProfileLoading ? (
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            ) : profile?.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={32} className="text-white" />
            )}
          </div>
          <div>
            {isProfileLoading ? (
              <div className="h-6 w-32 bg-white/10 rounded animate-pulse mb-1"></div>
            ) : (
              <h1 className="text-xl font-bold text-white tracking-tight">
                {profile?.fullName || "Guest User"}
              </h1>
            )}

            {isProfileLoading ? (
              <div className="h-4 w-48 bg-white/10 rounded animate-pulse"></div>
            ) : (
              <p className="text-gray-400 text-sm">
                {profile?.email || "No email available"}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 -mt-8">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 divide-y divide-gray-50 overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="text-gray-400 group-hover:text-[#0F172A] transition-colors">
                  {item.icon}
                </div>
                <span className="font-semibold text-gray-700 group-hover:text-[#0F172A] transition-colors">
                  {item.label}
                </span>
              </div>
              <ChevronRight
                size={18}
                className="text-gray-300 group-hover:text-[#0F172A] transition-colors"
              />
            </button>
          ))}

          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="w-full flex items-center justify-between p-5 hover:bg-red-50 transition-colors group disabled:opacity-70"
          >
            <div className="flex items-center gap-4 text-red-500">
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <LogOut size={20} />
              )}
              <span className="font-semibold">
                {isLoading ? "Keluar..." : "Keluar"}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Info Box */}
      <div className="px-6 mt-6">
        <div className="bg-[#0F172A]/5 rounded-3xl p-6 border border-[#0F172A]/10">
          <p className="text-xs text-center text-gray-500 font-medium">
            Outshine Store Preview Version 1.0.0
          </p>
        </div>
      </div>

      <Alert
        isOpen={alertConfig.isOpen}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        onConfirm={closeAlert}
      />
    </div>
  );
};

export default ProfileScreen;
