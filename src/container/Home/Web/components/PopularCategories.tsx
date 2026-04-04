import { Link } from "react-router-dom";
import { cn } from "@outshine/lib/utils";
import { useGetCategory } from "@/services/Category/useGetCategory";
import { useState } from "react";
import CategoryListPopup from "./CategoryListPopup";

const PopularCategories = ({ className }: { className?: string }) => {
  const { data: categories, isLoading } = useGetCategory();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  if (isLoading) {
    return (
      <div className={cn("grid grid-cols-6 gap-4", className)}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-12 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <section className={cn("flex flex-col gap-6", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#0F172A]">Kategori Produk</h2>
      </div>

      <div className="grid grid-cols-6 md:grid-cols-9 gap-2">
        {categories.slice(0, 5).map((category) => (
          <Link
            key={category.id}
            to={`/outshine/category/${category.id}`}
            className="flex h-[152px] w-[120px] cursor-pointer flex-col items-center justify-center gap-3 rounded-md border border-neutral-400 bg-white p-3 transition-colors hover:bg-neutral-50"
          >
            <div className="inline-flex size-[76px] items-center justify-center rounded-[7px] bg-neutral-200 p-3">
              <img
                src={category.imageUrl}
                alt={category.name}
                loading="lazy"
                className="w-10 h-10 object-cover"
              />
            </div>
            <span className="flex h-10 w-24 items-center justify-center text-center text-xs font-medium leading-[14px] text-neutral-900 line-clamp-2 px-1">
              {category.name}
            </span>
          </Link>
        ))}

        {/* View All Button */}
        <button
          onClick={() => setIsPopupOpen(true)}
          className="flex h-[152px] w-[120px] cursor-pointer flex-col items-center justify-center gap-3 rounded-md border border-neutral-400 bg-white p-3 transition-colors hover:bg-neutral-50 group"
        >
          <div className="inline-flex size-[76px] items-center justify-center rounded-[7px] bg-neutral-200 p-3 group-hover:bg-neutral-300 transition-colors">
            <img
              src="/images/category.png"
              alt="Semua Kategori"
              loading="lazy"
              className="w-10 h-10 object-cover"
            />
          </div>
          <span className="flex h-10 w-24 items-center justify-center text-center text-xs font-medium leading-[14px] text-neutral-900 group-hover:text-blue-600 transition-colors">
            Semua Kategori
          </span>
        </button>
      </div>

      <CategoryListPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        categories={categories}
      />
    </section>
  );
};

export default PopularCategories;
