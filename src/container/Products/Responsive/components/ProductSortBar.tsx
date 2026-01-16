import { ArrowUpDown } from "lucide-react";

interface ProductSortBarProps {
  totalProducts?: number;
  onSortClick?: () => void;
}

const ProductSortBar = ({
  totalProducts = 0,
  onSortClick,
}: ProductSortBarProps) => {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-gray-400 font-medium uppercase tracking-wide">
        {totalProducts} PRODUCTS
      </span>

      <button
        onClick={onSortClick}
        className="flex items-center gap-1.5 text-sm text-[#0F172A] font-medium"
      >
        <ArrowUpDown size={14} className="text-[#0F172A]" />
        Sort: Recommended
      </button>
    </div>
  );
};

export default ProductSortBar;
