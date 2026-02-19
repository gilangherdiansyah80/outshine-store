import { cn } from "@/lib/utils";
import {
  User,
  Shield,
  HelpCircle,
  FileText,
  LogOut,
  Loader2,
  type LucideIcon,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  section: string;
  danger?: boolean;
}

const navItems: NavItem[] = [
  {
    id: "edit-profile",
    label: "Edit Profile",
    description: "Name, photo, phone",
    icon: User,
    section: "Account",
  },
  {
    id: "privacy",
    label: "Privacy & Security",
    description: "Permissions and security",
    icon: Shield,
    section: "Preferences",
  },
  {
    id: "faq",
    label: "Help Center",
    description: "FAQ and support",
    icon: HelpCircle,
    section: "Others",
  },
  {
    id: "terms",
    label: "Terms & Conditions",
    description: "Legal information",
    icon: FileText,
    section: "Others",
  },
];

interface SettingNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  isLogoutLoading: boolean;
}

export default function SettingNav({
  activeTab,
  onTabChange,
  onLogout,
  isLogoutLoading,
}: SettingNavProps) {
  const sections = [...new Set(navItems.map((i) => i.section))];

  return (
    <div className="sticky top-10 space-y-6">
      {sections.map((section) => (
        <div key={section} className="space-y-1.5">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] px-4">
            {section}
          </p>
          {navItems
            .filter((i) => i.section === section)
            .map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-200 text-left cursor-pointer",
                    isActive
                      ? "bg-[#0F172A] text-white shadow-xl shadow-slate-200"
                      : "hover:bg-slate-50 text-[#0F172A]",
                  )}
                >
                  <div
                    className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
                      isActive ? "bg-white/10" : "bg-slate-100",
                    )}
                  >
                    <Icon
                      size={18}
                      className={isActive ? "text-white" : "text-slate-500"}
                    />
                  </div>
                  <div className="min-w-0">
                    <p
                      className={cn(
                        "font-black text-sm",
                        isActive ? "text-white" : "text-[#0F172A]",
                      )}
                    >
                      {item.label}
                    </p>
                    <p
                      className={cn(
                        "text-[10px] font-bold mt-0.5 truncate",
                        isActive ? "text-white/50" : "text-slate-400",
                      )}
                    >
                      {item.description}
                    </p>
                  </div>
                </button>
              );
            })}
        </div>
      ))}

      {/* Divider */}
      <div className="h-px bg-slate-100" />

      {/* Logout */}
      <button
        onClick={onLogout}
        disabled={isLogoutLoading}
        className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl hover:bg-red-50 text-left transition-all duration-200 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed group"
      >
        <div className="w-9 h-9 rounded-xl bg-red-50 group-hover:bg-red-100 flex items-center justify-center shrink-0 transition-colors">
          {isLogoutLoading ? (
            <Loader2 size={18} className="text-red-500 animate-spin" />
          ) : (
            <LogOut size={18} className="text-red-500" />
          )}
        </div>
        <p className="font-black text-sm text-red-500">
          {isLogoutLoading ? "Logging out..." : "Log Out"}
        </p>
      </button>

      {/* Version */}
      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest text-center pt-2">
        Outshine Store v1.0.0
      </p>
    </div>
  );
}
