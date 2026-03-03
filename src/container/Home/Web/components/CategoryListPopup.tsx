import { Link } from "react-router-dom";
import Modal from "@outshine/ui/Modal/Modal";
import type { GetCategoryResponse } from "@/services/Category/useGetCategory";
import { Search, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";

interface CategoryListPopupProps {
  isOpen: boolean;
  onClose: () => void;
  categories: GetCategoryResponse["data"];
}

const CategoryListPopup = ({
  isOpen,
  onClose,
  categories,
}: CategoryListPopupProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [categories, searchQuery]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Kategori Produk"
      className="max-w-6xl"
    >
      <div className="space-y-8">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Cari Kategori"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
          />
        </div>

        {/* Categories Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900">Suku Cadang</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <ChevronRight size={18} className="rotate-90" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
            {filteredCategories.map((category) => (
              <Link
                key={category.id}
                to={`/outshine/category/${category.id}`}
                onClick={onClose}
                className="flex flex-col items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all group lg:min-h-[180px] justify-center"
              >
                <div className="size-20 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors p-4">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <span className="text-[11px] font-bold text-center text-gray-700 group-hover:text-blue-600 transition-colors line-clamp-2 px-1 leading-tight">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CategoryListPopup;
