import { useNavigate } from "react-router-dom";
import CardProduct from "@/components/Card/CardProduct";
import DataNotFound from "@/components/DataNotFound/DataNotFound";
import { useGetProducts } from "@/services/Products/useGetProducts";
import { useFilterSortStore } from "@outshine/store/filterSortStore";
import { useMemo } from "react";
import { cn } from "@outshine/lib/utils";

interface CategoryProductListProps {
  className?: string;
}

const CategoryProductList = ({ className }: CategoryProductListProps) => {
  const { products, isLoading } = useGetProducts();
  const { selectedCategories } = useFilterSortStore();
  const navigate = useNavigate();

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (selectedCategories.length === 0) return products;

    // Filter by category name or ID depending on what's stored
    // Based on ProductsScreen.tsx, it filters by p.category
    return products.filter((p) => selectedCategories.includes(p.category));
  }, [products, selectedCategories]);

  if (isLoading) {
    return (
      <div className={cn("grid grid-cols-2 gap-4", className)}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="aspect-3/4 bg-gray-200 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className={cn("py-10", className)}>
        <DataNotFound
          title="No Products Found"
          description="There are no products available in this category at the moment."
        />
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-2 gap-x-4 gap-y-6", className)}>
      {filteredProducts.map((product) => (
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
          aspectRatio="portrait"
          onClick={() => navigate(`/outshine/product/${product.id}`)}
        />
      ))}
    </div>
  );
};

export default CategoryProductList;
