import { useNavigate } from "react-router-dom";
import { useGetDetailCategory } from "@/services/Category/useGetDetailCategory";
import { ChevronLeft, LayoutGrid, List } from "lucide-react";
import CardProduct from "@/components/Card/CardProduct";
import Loading from "@/components/Loader/Loading";
import DataNotFound from "@/components/DataNotFound/DataNotFound";
import { cn } from "@outshine/lib/utils";
import { useState } from "react";

interface DetailCategoryResponsiveProps {
  categoryId: string;
}

export default function DetailCategoryResponsive({
  categoryId,
}: DetailCategoryResponsiveProps) {
  const navigate = useNavigate();
  const { category, products, isLoading } = useGetDetailCategory(categoryId);
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  if (isLoading) return <Loading />;

  if (!category) {
    return (
      <main className="min-h-screen bg-white">
        <div className="sticky top-0 z-50 bg-[#0F172A] px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-1 rounded-full bg-white"
          >
            <ChevronLeft size={22} color="#0F172A" />
          </button>
          <h1 className="text-lg font-bold text-white">Category</h1>
        </div>
        <div className="p-8">
          <DataNotFound
            title="Kategori Tidak Ditemukan"
            description="Maaf, kategori yang Anda cari tidak tersedia."
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pb-10">
      {/* Dynamic Header */}
      <div className="relative h-[250px]">
        <img
          src={category.imageUrl}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

        <div className="absolute top-4 left-4 z-20">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white"
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        <div className="absolute bottom-6 left-6 right-6 space-y-2">
          <h1 className="text-3xl font-black text-white leading-none">
            {category.name}
          </h1>
          <p className="text-white/70 text-sm font-medium">
            {products.length} Produk Tersedia
          </p>
        </div>
      </div>

      {/* Control Bar */}
      <div className="p-4 flex items-center justify-between border-b border-gray-50 sticky top-0 bg-white z-10">
        <span className="text-sm font-bold text-[#0F172A]">Daftar Produk</span>
        <div className="flex items-center bg-gray-50 rounded-lg p-1">
          <button
            onClick={() => setLayout("grid")}
            className={cn(
              "p-1.5 rounded-md transition-all",
              layout === "grid"
                ? "bg-white shadow-sm text-[#2563EB]"
                : "text-gray-400",
            )}
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => setLayout("list")}
            className={cn(
              "p-1.5 rounded-md transition-all",
              layout === "list"
                ? "bg-white shadow-sm text-[#2563EB]"
                : "text-gray-400",
            )}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Product List */}
      <div className="p-4 mt-2">
        {products.length > 0 ? (
          <div
            className={cn(
              "grid gap-6",
              layout === "grid" ? "grid-cols-2" : "grid-cols-1",
            )}
          >
            {products.map((product) => (
              <CardProduct
                key={product.id}
                id={product.id}
                imageSrc={product.image}
                name={product.name}
                price={product.formattedPrice || product.price}
                originalPrice={
                  product.formattedOriginalPrice || product.originalPrice
                }
                discount={product.discount}
                isNew={product.isNew}
                isPo={product.isPo}
                rating={product.rating}
                layout={layout}
                aspectRatio={layout === "grid" ? "portrait" : "square"}
                onClick={() => navigate(`/outshine/product/${product.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <DataNotFound
              title="Belum Ada Produk"
              description={`Kategori ${category.name} belum memiliki koleksi.`}
            />
          </div>
        )}
      </div>
    </main>
  );
}
