import { useNavigate } from "react-router-dom";
import CardProduct from "@/components/Card/CardProduct";
import DataNotFound from "@/components/DataNotFound/DataNotFound";
import { cn } from "@outshine/lib/utils";
import type { ProductItem } from "@/services/Products/useGetProducts";

interface CategoryProductsProps {
  products: ProductItem[];
  categoryName: string;
  categoryId: string;
  layout: "grid" | "list";
}

const CategoryProducts = ({
  products,
  categoryName,
  categoryId,
  layout,
}: CategoryProductsProps) => {
  const navigate = useNavigate();

  if (products.length === 0) {
    return (
      <div className="py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
        <DataNotFound
          title="Belum Ada Produk"
          description={`Saat ini belum tersedia produk untuk kategori ${categoryName}. Silakan cek kembali nanti!`}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-8",
        layout === "grid"
          ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          : "grid-cols-1",
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
          onClick={() =>
            navigate(`/outshine/product/${product.id}`, {
              state: {
                from: categoryName,
                path: `/outshine/category/${categoryId}`,
              },
            })
          }
        />
      ))}
    </div>
  );
};

export default CategoryProducts;
