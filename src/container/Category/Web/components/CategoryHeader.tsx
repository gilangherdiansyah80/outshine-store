import { LayoutGrid, List } from "lucide-react";
import { cn } from "@outshine/lib/utils";

interface CategoryHeaderProps {
  categoryName: string;
  productCount: number;
  layout: "grid" | "list";
  onLayoutChange: (layout: "grid" | "list") => void;
}

const CategoryHeader = ({
  categoryName,
  productCount,
  layout,
  onLayoutChange,
}: CategoryHeaderProps) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-[#0F172A]">
          Koleksi Produk
        </h2>
        <p className="text-sm text-gray-400 font-medium">
          Menampilkan {productCount} produk pilihan di kategori {categoryName}.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center bg-gray-50 rounded-lg p-1">
          <button
            onClick={() => onLayoutChange("grid")}
            className={cn(
              "p-1.5 rounded-md transition-all",
              layout === "grid"
                ? "bg-white shadow-sm text-[#2563EB]"
                : "text-gray-400 hover:text-gray-600",
            )}
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => onLayoutChange("list")}
            className={cn(
              "p-1.5 rounded-md transition-all",
              layout === "list"
                ? "bg-white shadow-sm text-[#2563EB]"
                : "text-gray-400 hover:text-gray-600",
            )}
          >
            <List size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader;
