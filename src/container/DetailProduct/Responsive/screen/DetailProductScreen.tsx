import React, { useState } from "react";
import type { ProductDetail } from "@outshine/services/Products/useGetDetailProduct";
import ProductActions from "../components/ProductActions";
import ProductDetails from "../components/ProductDetails";
import ProductImageGallery from "../components/ProductImageGallery";
import ProductInfo from "../components/ProductInfo";
import ProductReviews from "../components/ProductReviews";
import ProductSizeSelector from "../components/ProductSizeSelector";

interface DetailProductScreenProps {
  product: ProductDetail;
}

const DetailProductScreen: React.FC<DetailProductScreenProps> = ({
  product,
}) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white pb-24 font-sans">
      <ProductImageGallery
        id={product.id}
        images={product.images}
        title={product.title}
        price={product.price}
      />

      <div className="px-5 pt-6 space-y-6">
        <ProductInfo
          title={product.title}
          price={product.price}
          formattedDiscounted={product.formattedDiscounted}
          formattedOriginal={product.formattedOriginal}
          rating={product.rating}
          reviewCount={product.reviewCount}
        />

        <ProductSizeSelector
          sizes={product.sizes}
          selectedSize={selectedSize}
          onSizeChange={setSelectedSize}
        />

        <ProductDetails
          description={product.description}
          specs={product.specs}
          fabricAndCare={product.fabricAndCare}
        />

        <ProductReviews
          rating={product.rating}
          reviewCount={product.reviewCount}
          ratingDistribution={product.ratingDistribution}
          reviews={product.reviews}
        />
      </div>

      <ProductActions
        id={product.id}
        name={product.title}
        price={product.price}
        originalPrice={product.originalPrice || product.price}
        formattedDiscounted={product.formattedDiscounted || ""}
        formattedOriginal={product.formattedOriginal || ""}
        isPo={product.isPo}
        poDpPercent={product.poDpPercent}
        image={product.images[0]}
        selectedSize={selectedSize}
        sizeId={product.sizes.find((s) => s.name === selectedSize)?.id}
      />
    </div>
  );
};

export default DetailProductScreen;
