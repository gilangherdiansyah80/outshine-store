// Detail Product Screen Component
import { useState } from "react";
import {
  ChevronLeft,
  Share2,
  Heart,
  ShoppingBag,
  Star,
  ChevronRight,
  Ruler,
} from "lucide-react";

import type { ProductDetail } from "@outshine/services/Products/useGetDetailProduct";

import { Link } from "react-router-dom";

interface DetailProductScreenProps {
  product: ProductDetail;
}

const DetailProductScreen: React.FC<DetailProductScreenProps> = ({
  product,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white pb-24 font-sans">
      {/* Header Image Section */}
      <div className="relative w-full aspect-3/4 max-h-[60vh] overflow-hidden">
        {/* Top Navigation Overlay */}
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4 pt-6 bg-linear-to-b from-black/50 to-transparent">
          <Link
            to="/outshine/products"
            className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </Link>
          <div className="flex gap-3">
            <button className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors">
              <Share2 className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors">
              <Heart className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Carousel Images */}
        <div
          className="flex transition-transform duration-500 ease-out h-full w-full"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product.title} - View ${index + 1}`}
              className="w-full h-full object-cover shrink-0"
            />
          ))}
        </div>

        {/* Carousel Controls (Hidden on mobile usually, implementing per design which implies swipe or simple dots) */}
        {/* Helper Touch/Click areas for prev/next */}
        <div
          className="absolute inset-y-0 left-0 w-1/4 z-0"
          onClick={handlePrevImage}
        />
        <div
          className="absolute inset-y-0 right-0 w-1/4 z-0"
          onClick={handleNextImage}
        />

        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {product.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Content Info */}
      <div className="px-5 pt-6 space-y-6">
        {/* Title and Price */}
        <div className="flex justify-between items-start gap-4">
          <h1 className="text-2xl font-bold leading-tight flex-1">
            {product.title}
          </h1>
          <span className="text-xl font-bold text-white">
            ${product.price ? product.price.toFixed(2) : "0.00"}
          </span>
        </div>

        {/* Reviews */}
        <div className="flex items-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= Math.round(product.rating)
                    ? "text-blue-500 fill-blue-500"
                    : "text-gray-600 fill-gray-600"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-400">
            ({product.reviewCount} reviews)
          </span>
        </div>

        {/* Size Selection */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-300 tracking-wider">
              SELECT SIZE
            </span>
            <button className="flex items-center gap-1 text-sm text-blue-500 font-medium">
              Size Guide <Ruler className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-3 rounded-lg border text-sm font-semibold transition-all ${
                  selectedSize === size
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-900/50"
                    : "bg-[#141925] border-transparent text-gray-300 hover:border-gray-600"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#1F2430] text-gray-300 hover:bg-[#2A3040] transition-colors">
            <ShoppingBag className="w-6 h-6" />
          </button>
          <button className="flex-1 h-14 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-900/40">
            Add to Cart
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Info Cards */}
        <div className="space-y-3 pt-4">
          {/* Fabric & Care */}
          <div className="p-4 rounded-2xl bg-[#141925] border border-white/5 space-y-2">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-1.5 rounded-full bg-blue-500/20 text-blue-400">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.38 3.4a1.6 1.6 0 0 1 .58 1.57c-.23 1.34-.69 2.62-1.34 3.78a2.94 2.94 0 0 1-3.23.95 2.93 2.93 0 0 1-2.92-2.92 2.94 2.94 0 0 1 .95-3.23c1.16-.65 2.44-1.11 3.78-1.34a1.6 1.6 0 0 1 1.18 1.19Z" />
                  <path d="M11 21c-3.14-.14-6-2.5-7.73-5.59A3 3 0 0 1 4.7 11.7 12.02 12.02 0 0 0 11 21Z" />
                </svg>
              </div>
              <span className="font-semibold text-white">Fabric & Care</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {product.fabricAndCare}
            </p>
          </div>

          {[
            { label: "Delivery & Returns", icon: ChevronRight },
            { label: "Sustainability Impact", icon: ChevronRight },
          ].map((item, idx) => (
            <button
              key={idx}
              className="w-full p-4 flex justify-between items-center rounded-2xl bg-[#0B0F19] border-b border-white/10 hover:bg-white/5 transition-colors"
            >
              <span className="font-semibold text-white">{item.label}</span>
              <item.icon className="w-5 h-5 text-gray-500" />
            </button>
          ))}
        </div>

        {/* Customer Reviews Summary */}
        <div className="pt-6 pb-8">
          <h3 className="text-lg font-bold text-white mb-4">
            Customer Reviews
          </h3>
          <div className="flex items-center gap-6 mb-6">
            <div>
              <div className="text-5xl font-bold text-white leading-none">
                {product.rating}
              </div>
              <div className="flex gap-1 mt-2 text-blue-500">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-4 h-4 fill-blue-500"
                    size={16}
                    strokeWidth={0}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-400 mt-1">
                {product.reviewCount} reviews
              </p>
            </div>

            {/* Rating Bars */}
            <div className="flex-1 space-y-2">
              {[
                { star: 5, pct: "80%" },
                { star: 4, pct: "15%" },
                { star: 3, pct: "5%" },
              ].map((row) => (
                <div key={row.star} className="flex items-center gap-3 text-xs">
                  <span className="font-bold text-white w-2">{row.star}</span>
                  <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: row.pct }}
                    />
                  </div>
                  <span className="text-gray-400 w-6 text-right">
                    {row.pct}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProductScreen;
