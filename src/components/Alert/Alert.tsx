import {
  X,
  AlertTriangle,
  CheckCircle2,
  Info,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

interface AlertProps {
  isOpen: boolean;
  title: string;
  message: string;
  type?: "success" | "error" | "warning" | "info" | "confirm";
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  // Input support for "prompt" style alerts
  showInput?: boolean;
  inputValue?: string;
  onInputChange?: (value: string) => void;
  placeholder?: string;
}

const Alert = ({
  isOpen,
  title,
  message,
  type = "info",
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  showInput = false,
  inputValue = "",
  onInputChange,
  placeholder = "Type something...",
}: AlertProps) => {
  const [isRendered, setIsRendered] = useState(isOpen);

  // Derived state: if isOpen becomes true, ensure isRendered is also true
  // This is allowed in React during the render phase for adjusting state
  if (isOpen && !isRendered) {
    setIsRendered(true);
  }

  useEffect(() => {
    if (!isOpen && isRendered) {
      const timer = setTimeout(() => setIsRendered(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isRendered]);

  if (!isRendered) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="text-emerald-500" size={32} />;
      case "error":
        return <AlertCircle className="text-rose-500" size={32} />;
      case "warning":
      case "confirm":
        return <AlertTriangle className="text-amber-500" size={32} />;
      default:
        return <Info className="text-blue-500" size={32} />;
    }
  };

  const getButtonStyles = () => {
    switch (type) {
      case "error":
        return "bg-rose-600 hover:bg-rose-700 shadow-rose-900/20";
      case "warning":
      case "confirm":
        return "bg-amber-600 hover:bg-amber-700 shadow-amber-900/20";
      case "success":
        return "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-900/20";
      default:
        return "bg-blue-600 hover:bg-blue-700 shadow-blue-900/20";
    }
  };

  return (
    <div
      className={`fixed inset-0 z-10000 flex items-center justify-center p-6 transition-all duration-300 ${
        isOpen
          ? "bg-black/60 backdrop-blur-sm opacity-100"
          : "bg-black/0 opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`w-full max-w-sm bg-[#151B28] rounded-[32px] border border-white/5 shadow-2xl transition-all duration-300 transform ${
          isOpen
            ? "scale-100 translate-y-0 opacity-100"
            : "scale-95 translate-y-4 opacity-0"
        }`}
      >
        <div className="p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
            {getIcon()}
          </div>

          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-[15px] text-gray-400 leading-relaxed mb-6">
            {message}
          </p>

          {showInput && (
            <div className="w-full mb-8">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => onInputChange?.(e.target.value)}
                placeholder={placeholder}
                autoFocus
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-[15px] placeholder:text-gray-600 focus:outline-none focus:border-white/20 transition-all"
              />
            </div>
          )}

          <div className="flex gap-3 w-full">
            {(type === "confirm" || onCancel) && (
              <button
                onClick={onCancel}
                className="flex-1 py-4 px-6 rounded-2xl bg-[#1F2430] hover:bg-[#2A3040] text-gray-300 font-bold text-sm transition-all"
              >
                {cancelText}
              </button>
            )}
            <button
              onClick={onConfirm}
              className={`flex-1 py-4 px-6 rounded-2xl text-white font-bold text-sm shadow-lg active:scale-[0.98] transition-all ${getButtonStyles()}`}
            >
              {confirmText}
            </button>
          </div>
        </div>

        {/* Close button for non-confirm types */}
        {type !== "confirm" && !onCancel && (
          <button
            onClick={onConfirm}
            className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 text-gray-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
