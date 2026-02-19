import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { usePostLogout } from "@/services/Auth/usePostLogout";
import { useTokenActions } from "@/lib/auth-adapter/tokenStore";
import { useUserActions } from "@/lib/auth-adapter/userStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import Alert from "@/components/Alert";
import SettingNav from "./components/SettingNav";
import EditProfilePanel from "./components/EditProfilePanel";
import FaqPanel from "./components/FaqPanel";
import PrivacyPanel from "./components/PrivacyPanel";
import TermsPanel from "./components/TermsPanel";

type TabId = "edit-profile" | "privacy" | "faq" | "terms";

const panelMap: Record<TabId, ReactNode> = {
  "edit-profile": <EditProfilePanel />,
  privacy: <PrivacyPanel />,
  faq: <FaqPanel />,
  terms: <TermsPanel />,
};

export default function SettingWeb() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>("edit-profile");
  const { trigger: logout, isLoading: isLogoutLoading } = usePostLogout();
  const { clearToken } = useTokenActions();
  const { clearUser } = useUserActions();

  const [alertConfig, setAlertConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "success" | "error" | "warning" | "info";
  }>({ isOpen: false, title: "", message: "", type: "info" });

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result?.success) {
        clearToken();
        clearUser();
        useWishlistStore.getState().clearWishlist();
        useCartStore.getState().clearCart();
        setAlertConfig({
          isOpen: true,
          title: "Logged Out",
          message: "You have been successfully logged out.",
          type: "success",
        });
        setTimeout(() => navigate("/outshine/home", { replace: true }), 1500);
      } else {
        setAlertConfig({
          isOpen: true,
          title: "Logout Failed",
          message: result?.message || "An error occurred.",
          type: "error",
        });
      }
    } catch (_error) {
      clearToken();
      clearUser();
      useWishlistStore.getState().clearWishlist();
      useCartStore.getState().clearCart();
      navigate("/outshine/home", { replace: true });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter">
          Settings
        </h1>
        <p className="text-gray-400 font-medium mt-2">
          Manage your account, privacy, and preferences.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 items-start">
        {/* Left: Navigation */}
        <div className="bg-white rounded-[2.5rem] p-4 border-2 border-slate-50">
          <SettingNav
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab as TabId)}
            onLogout={handleLogout}
            isLogoutLoading={isLogoutLoading}
          />
        </div>

        {/* Right: Panel Content */}
        <div className="bg-white rounded-[2.5rem] p-10 border-2 border-slate-50 min-h-[500px]">
          {panelMap[activeTab]}
        </div>
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
