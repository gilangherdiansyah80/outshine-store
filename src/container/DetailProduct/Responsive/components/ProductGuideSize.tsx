import { useEffect, useState } from "react";
import type { SizeGuide } from "@outshine/services/Products/useGetDetailProduct";

interface ProductGuideSizeProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  guideSize: SizeGuide[];
}

const ProductGuideSize = ({
  isOpen,
  onClose,
  title,
  guideSize,
}: ProductGuideSizeProps) => {
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
      className={`fixed inset-0 z-10000 flex items-end justify-center transition-all duration-300 ${
        isOpen
          ? "bg-black/60 backdrop-blur-sm"
          : "bg-black/0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`w-full max-w-lg max-h-[85vh] overflow-y-auto bg-white rounded-t-[40px] border-t border-white/10 p-8 pt-4 transition-all duration-300 transform ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div
          className="w-18 h-1.5 bg-[#0B0F19] rounded-full mx-auto mb-4 cursor-pointer"
          onClick={onClose}
        />

        <div className="flex flex-col gap-2 mb-3">
          {guideSize.map((guide, index) => (
            <div key={index} className="flex flex-col gap-1">
              {guide.description ? (
                <h2 className="text-2xl font-bold text-[#0B0F19]">
                  {guide.description}
                </h2>
              ) : (
                <h2 className="text-2xl font-bold text-[#0B0F19]">{title}</h2>
              )}
              <div className="w-full h-0.5 bg-gray-100 rounded-full"></div>
              <img
                src={guide.imageUrl}
                alt={guide.description || title}
                className="w-full rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGuideSize;
