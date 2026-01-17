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
          rating={product.rating}
          reviewCount={product.reviewCount}
        />

        <ProductSizeSelector
          sizes={product.sizes}
          selectedSize={selectedSize}
          onSizeChange={setSelectedSize}
        />

        <ProductActions
          id={product.id}
          name={product.title}
          price={product.price}
          image={product.images[0]}
          selectedSize={selectedSize}
        />

        <ProductDetails fabricAndCare={product.fabricAndCare} />

        <ProductReviews
          rating={product.rating}
          reviewCount={product.reviewCount}
        />
      </div>
    </div>
  );
};

export default DetailProductScreen;
