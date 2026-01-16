import { ChevronRight } from "lucide-react";

interface ProductDetailsProps {
  fabricAndCare: string;
}

const ProductDetails = ({ fabricAndCare }: ProductDetailsProps) => {
  return (
    <div className="space-y-3 pt-4">
      {/* Fabric & Care */}
      <div className="p-4 rounded-2xl bg-[#141925] border border-white/5 space-y-2">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-1.5 rounded-full bg-blue-500/20 text-blue-400">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.38 3.4a1.6 1.6 0 0 1 .58 1.57c-.23 1.34-.69 2.62-1.34 3.78a2.94 2.94 0 0 1-3.23.95 2.93 2.93 0 0 1-2.92-2.92 2.94 2.94 0 0 1 .95-3.23c1.16-.65 2.44-1.11 3.78-1.34a1.6 1.6 0 0 1 1.18 1.19Z" />
              <path d="M11 21c-3.14-.14-6-2.5-7.73-5.59A3 3 0 0 1 4.7 11.7 12.02 12.02 0 0 0 11 21Z" />
            </svg>
          </div>
          <span className="font-semibold text-white">Fabric & Care</span>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed">{fabricAndCare}</p>
      </div>

      {[
        { label: "Delivery & Returns", icon: ChevronRight },
        { label: "Sustainability Impact", icon: ChevronRight },
      ].map((item, idx) => (
        <button
          key={idx}
          className="w-full p-4 flex justify-between items-center rounded-2xl bg-[#0B0F19] border-b border-white/10 hover:bg-white/5 transition-colors"
        >
          <span className="font-semibold text-white">{item.label}</span>
          <item.icon className="w-5 h-5 text-gray-500" />
        </button>
      ))}
    </div>
  );
};

export default ProductDetails;
