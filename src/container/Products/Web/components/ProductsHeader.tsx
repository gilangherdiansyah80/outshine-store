import { ChevronRight, LayoutGrid, List } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@outshine/lib/utils";
import { SORT_OPTIONS, type SortOption } from "@outshine/store/filterSortStore";

interface ProductsHeaderProps {
  totalProducts: number;
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  className?: string;
}

const ProductsHeader = ({
  totalProducts,
  currentSort,
  onSortChange,
  className,
}: ProductsHeaderProps) => {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-medium text-gray-400">
        <Link
          to="/outshine/home"
          className="hover:text-[#2563EB] transition-colors"
        >
          Home
        </Link>
        <ChevronRight size={12} />
        <span className="text-gray-600">Katalog</span>
      </nav>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-[#0F172A]">
            Katalog Produk
          </h1>
          <p className="text-sm text-gray-400 font-medium">
            Temukan {totalProducts.toLocaleString()} produk pilihan terbaik
            untuk gaya hidup Anda.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* View Toggles */}
          <div className="flex items-center bg-gray-50 rounded-lg p-1">
            <button className="p-1.5 rounded-md bg-white shadow-sm text-[#2563EB]">
              <LayoutGrid size={18} />
            </button>
            <button className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 transition-colors">
              <List size={18} />
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-400 whitespace-nowrap">
              Urutkan:
            </span>
            <select
              value={currentSort}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-white border border-gray-100 rounded-xl px-4 py-2 text-sm font-bold text-[#0F172A] outline-none focus:border-[#2563EB] cursor-pointer shadow-sm transition-all"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option === "Recommended" ? "Terbaru" : option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsHeader;
