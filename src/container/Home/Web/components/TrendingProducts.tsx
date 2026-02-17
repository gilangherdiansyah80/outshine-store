import { useGetTrendingProducts } from "@outshine/services/Home/useGetTrendingProducts";
import CardProduct from "@outshine/components/Card/CardProduct";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@outshine/lib/utils";
import { useNavigate } from "react-router-dom";

const TrendingProducts = ({ className }: { className?: string }) => {
  const { data: products, isLoading } = useGetTrendingProducts();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className={cn("space-y-6", className)}>
        <div className="h-8 w-48 bg-gray-100 rounded-lg animate-pulse" />
        <div className="grid grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-3/4 bg-gray-100 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className={cn("flex flex-col gap-6", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#2563EB]">Sedang Tren</h2>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:text-[#2563EB] hover:border-[#2563EB] transition-all">
            <ChevronLeft size={20} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:text-[#2563EB] hover:border-[#2563EB] transition-all">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product) => (
          <CardProduct
            key={product.id}
            id={product.id}
            imageSrc={product.image}
            name={product.name}
            price={product.formattedPrice || product.price}
            originalPrice={
              product.formattedOriginalPrice || product.originalPrice
            }
            isNew={product.isNew}
            isPo={product.isPo}
            discount={product.discount}
            rating={product.rating}
            aspectRatio="square"
            onAddToCart={() => console.log("Add to cart:", product.name)}
            onClick={() => navigate(`/outshine/product/${product.id}`)}
          />
        ))}
      </div>
    </section>
  );
};

export default TrendingProducts;
