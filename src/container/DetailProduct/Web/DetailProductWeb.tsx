import { useParams, Link, useLocation } from "react-router-dom";
import { useGetDetailProduct } from "@outshine/services/Products/useGetDetailProduct";
import Loading from "@/components/Loader/Loading";
import { ChevronRight } from "lucide-react";

import ProductGalleryWeb from "./components/ProductGalleryWeb";
import ProductInfoWeb from "./components/ProductInfoWeb";
import ProductDetailsTabs from "./components/ProductDetailsTabs";
import ReviewsWeb from "./components/ReviewsWeb";

interface NavigationState {
  from?: string;
  path?: string;
}

export default function DetailProductWeb() {
  const { id } = useParams();
  const location = useLocation();
  const state = location.state as NavigationState;
  const { product, isLoading, isError } = useGetDetailProduct(id);

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8FAFC] gap-4">
        <div className="text-center p-12 bg-white rounded-3xl border border-gray-100 shadow-xl max-w-sm">
          <h2 className="text-2xl font-black text-[#0F172A] mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-400 text-sm mb-8 font-medium">
            Maaf, kami tidak dapat menemukan produk yang Anda cari. Silakan
            kembali ke katalog.
          </p>
          <Link
            to="/outshine/products"
            className="inline-block bg-[#2563EB] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-100"
          >
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-[#F8FAFC] min-h-screen -mt-10 pb-8">
      <div className="max-w-7xl mx-auto px-8 flex flex-col gap-5">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-medium text-gray-400 mt-12">
          <Link
            to={state?.path || "/outshine/home"}
            className="hover:text-[#2563EB] transition-colors"
          >
            {state?.from || "Home"}
          </Link>
          <ChevronRight size={12} />
          <span className="text-gray-600 truncate max-w-[200px]">
            {product.title}
          </span>
        </nav>

        {/* Main Section: Gallery & Info */}
        <div className="grid grid-cols-12 gap-7">
          <div className="md:col-span-7">
            <ProductGalleryWeb images={product.images} title={product.title} />
          </div>
          <div className="md:col-span-5">
            <ProductInfoWeb product={product} />
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewsWeb
          productId={product.id}
          rating={product.rating}
          reviewCount={product.reviewCount}
        />

        {/* Detailed Tabs Section */}
        <div className="mt-20">
          <ProductDetailsTabs
            description={product.description}
            specs={product.specs}
          />
        </div>
      </div>
    </main>
  );
}
