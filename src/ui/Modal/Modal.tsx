import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@outshine/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Modal = ({ isOpen, onClose, title, children, className }: ModalProps) => {
  const [isRendered, setIsRendered] = useState(isOpen);

  // Derived state adjustment for rendering
  if (isOpen && !isRendered) {
    setIsRendered(true);
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else if (isRendered) {
      const timer = setTimeout(() => {
        setIsRendered(false);
        document.body.style.overflow = "unset";
      }, 300);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "unset";
      };
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isRendered]);

  if (!isRendered) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={cn(
          "relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 transform",
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4",
          className,
        )}
      >
        {/* Header */}
        <div className="relative flex items-center justify-center p-6 border-b border-gray-100">
          {title && (
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          )}
          <button
            onClick={onClose}
            className="absolute right-6 p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
