import { Link } from "react-router-dom";
import { cn } from "@outshine/lib/utils";
import { useGetCategory } from "@/services/Category/useGetCategory";
import {
  Laptop,
  Shirt,
  Home as HomeIcon,
  Sparkles,
  Watch,
  Gamepad2,
  type LucideIcon,
} from "lucide-react";

const categoryIcons: Record<string, LucideIcon> = {
  Elektronik: Laptop,
  Fashion: Shirt,
  "Perabot Rumah": HomeIcon,
  Kecantikan: Sparkles,
  Aksesoris: Watch,
  Gaming: Gamepad2,
};

const PopularCategories = ({ className }: { className?: string }) => {
  const { data: categories, isLoading } = useGetCategory();

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
        <h2 className="text-xl font-bold text-[#0F172A]">Kategori Populer</h2>
        <Link
          to="/outshine/categories"
          className="text-sm font-semibold text-[#2563EB] hover:underline"
        >
          Lihat Semua
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {categories.slice(0, 6).map((category) => {
          const Icon = categoryIcons[category.name] || Sparkles;
          return (
            <Link
              key={category.id}
              to={`/detail-category?categoryName=${category.name}`}
              className="flex items-center justify-start gap-3 px-4 py-3 bg-white border border-gray-100 rounded-xl hover:border-[#2563EB] hover:shadow-md transition-all group"
            >
              <div className="text-[#2563EB] group-hover:scale-110 transition-transform">
                <Icon size={20} />
              </div>
              <span className="text-sm font-semibold text-gray-700 truncate">
                {category.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default PopularCategories;
