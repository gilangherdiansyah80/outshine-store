import { ChevronRight } from "lucide-react";
import type { ProductSpec } from "@outshine/services/Products/useGetDetailProduct";

interface ProductDetailsProps {
  description: string;
  specs: ProductSpec[];
  onOpenSpecs: () => void;
}

const ProductDetails = ({
  description,
  specs,
  onOpenSpecs,
}: ProductDetailsProps) => {
  // Preview of specs for the row
  const specsPreview = specs
    .slice(0, 3)
    .map((s) => s.key)
    .join(", ");

  return (
    <div className="divide-y divide-gray-50">
      {/* Specifications Row */}
      <button
        onClick={onOpenSpecs}
        className="w-full flex items-center justify-between p-4 bg-white active:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-medium text-gray-900">Spesifikasi</span>
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="text-sm text-gray-400 truncate max-w-[150px]">
            {specsPreview || "Detail produk"}...
          </span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>
      </button>

      {/* Description Section */}
      <div className="p-4 bg-white space-y-3">
        <h3 className="text-sm font-medium text-gray-900">Deskripsi</h3>
        <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
          {description}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
