import { Ruler } from "lucide-react";
import { useState } from "react";

interface ProductSizeSelectorProps {
  sizes: string[];
}

const ProductSizeSelector = ({ sizes }: ProductSizeSelectorProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-gray-300 tracking-wider">
          SELECT SIZE
        </span>
        <button className="flex items-center gap-1 text-sm text-blue-500 font-medium">
          Size Guide <Ruler className="w-3 h-3" />
        </button>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`py-3 rounded-lg border text-sm font-semibold transition-all ${
              selectedSize === size
                ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-900/50"
                : "bg-[#141925] border-transparent text-gray-300 hover:border-gray-600"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductSizeSelector;
