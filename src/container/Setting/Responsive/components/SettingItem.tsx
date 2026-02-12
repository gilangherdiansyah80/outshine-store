import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useNavigationStore } from "@outshine/lib/store";

interface SettingItemProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
  path?: string;
  onClick?: () => void;
  rightElement?: React.ReactNode;
  danger?: boolean;
  useInternal?: boolean; // Use internal ResponsiveNavigation instead of router
  disabled?: boolean;
}

const SettingItem = ({
  icon,
  label,
  description,
  path,
  onClick,
  rightElement,
  danger = false,
  useInternal = false,
  disabled = false,
}: SettingItemProps) => {
  const navigate = useNavigate();
  const { push } = useNavigationStore((state) => state.actions);

  const handleClick = () => {
    if (disabled) return;
    if (onClick) {
      onClick();
    } else if (path) {
      if (useInternal) {
        push(path);
      } else {
        navigate(path);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`w-full flex items-center gap-4 px-4 py-4 bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          danger ? "bg-red-50 text-red-500" : "bg-gray-100 text-gray-600"
        }`}
      >
        {icon}
      </div>
      <div className="flex-1 text-left">
        <p
          className={`text-sm font-medium ${
            danger ? "text-red-500" : "text-gray-800"
          }`}
        >
          {label}
        </p>
        {description && (
          <p className="text-xs text-gray-400 mt-0.5">{description}</p>
        )}
      </div>
      {rightElement || (
        <ChevronRight size={20} className="text-gray-400 shrink-0" />
      )}
    </button>
  );
};

export default SettingItem;
