import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useGetProducts } from "@/services/Products/useGetProducts";
import { useFilterSortStore } from "@outshine/store/filterSortStore";
import { useSearchStore } from "@outshine/store/searchStore";
import { cn } from "@outshine/lib/utils";
import CardProduct from "@/components/Card/CardProduct";
import DataNotFound from "@/components/DataNotFound/DataNotFound";
import Loading from "@/components/Loader/Loading";

import ProductsHeader from "./components/ProductsHeader";
import FilterSidebar from "./components/FilterSidebar";
import Pagination from "@/components/Pagination/Pagination";

export default function ProductsWeb() {
  const { products, isLoading } = useGetProducts();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const itemsPerPage = 12;

  const {
    selectedCategories,
    selectedRating,
    maxPrice,
    sortOption,
    setSortOption,
    clearFilters,
  } = useFilterSortStore();
  const { searchQuery, setSearchQuery } = useSearchStore();

  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return [];

    let result = [...products];

    // Search logic
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((p) => p.name.toLowerCase().includes(query));
    }

    // Filtering logic
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Price filter
    if (maxPrice !== null) {
      result = result.filter((p) => Number(p.price) <= Number(maxPrice));
    }

    // Rating filter (Floor for simplicity assuming integer selection)
    if (selectedRating !== null) {
      result = result.filter((p) => p.rating >= selectedRating);
    }

    // Sorting logic
    switch (sortOption) {
      case "Price: Low to High":
        result.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "Rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "Recommended":
      default:
        // Assume default order
        break;
    }

    return result;
  }, [
    products,
    searchQuery,
    selectedCategories,
    selectedRating,
    maxPrice,
    sortOption,
  ]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="bg-[#F8FAFC] min-h-screen pt-5 -mt-10 pb-20">
      <div className="max-w-7xl mx-auto px-8 flex flex-col gap-10 mt-10">
        <ProductsHeader
          totalProducts={filteredAndSortedProducts.length}
          currentSort={sortOption}
          onSortChange={setSortOption}
          layout={layout}
          onLayoutChange={setLayout}
        />

        <div className="flex gap-10">
          <FilterSidebar />

          <div className="flex-1 flex flex-col gap-10">
            {paginatedProducts.length > 0 ? (
              <>
                <div
                  className={cn(
                    "grid gap-6",
                    layout === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                      : "grid-cols-1",
                  )}
                >
                  {paginatedProducts.map((product) => (
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
                      onClick={() =>
                        navigate(`/outshine/product/${product.id}`, {
                          state: {
                            from: "Katalog",
                            path: "/outshine/products",
                          },
                        })
                      }
                      onWishlistClick={() =>
                        console.log("Wishlist:", product.name)
                      }
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-4">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white p-20 rounded-2xl border border-gray-50 shadow-sm flex items-center justify-center">
                <DataNotFound
                  title="Produk Tidak Ditemukan"
                  description="Maaf, tidak ada produk yang sesuai dengan filter Anda."
                  resetLabel="Hapus Semua Filter"
                  onReset={() => {
                    setSearchQuery("");
                    clearFilters();
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
