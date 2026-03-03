import { useGetDetailCategory } from "@/services/Category/useGetDetailCategory";
import Loading from "@/components/Loader/Loading";
import DataNotFound from "@/components/DataNotFound/DataNotFound";
import { useState } from "react";
import { CategoryHero, CategoryHeader, CategoryProducts } from "./components";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface DetailCategoryWebProps {
  categoryId: string;
}

interface NavigationState {
  from?: string;
  path?: string;
}

export default function DetailCategoryWeb({
  categoryId,
}: DetailCategoryWebProps) {
  const { category, products, isLoading } = useGetDetailCategory(categoryId);
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const location = useLocation();
  const state = location.state as NavigationState;

  if (isLoading) return <Loading />;

  if (!category) {
    return (
      <main className="min-h-screen pt-32 pb-20 px-8">
        <DataNotFound
          title="Kategori Tidak Ditemukan"
          description="Maaf, kategori yang Anda cari tidak tersedia."
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-8 space-y-5">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-medium text-gray-400">
          <Link
            to={state?.path || "/outshine/home"}
            className="hover:text-[#2563EB] transition-colors"
          >
            {state?.from || "Home"}
          </Link>
          <ChevronRight size={12} />
          <span className="text-gray-600 truncate max-w-[200px]">
            {category.name}
          </span>
        </nav>

        <CategoryHero name={category.name} imageUrl={category.imageUrl} />

        <CategoryHeader
          categoryName={category.name}
          productCount={products.length}
          layout={layout}
          onLayoutChange={setLayout}
        />

        <CategoryProducts
          products={products}
          categoryName={category.name}
          categoryId={category.id}
          layout={layout}
        />
      </div>
    </main>
  );
}
