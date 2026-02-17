import { useState } from "react";
import { cn } from "@outshine/lib/utils";

interface ProductGalleryWebProps {
  images: string[];
  title: string;
  className?: string;
}

const ProductGalleryWeb = ({
  images,
  title,
  className,
}: ProductGalleryWebProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div
      className={cn(
        "flex flex-col gap-6 bg-white rounded-2xl p-5 border border-gray-200 shadow-sm shadow-black",
        className,
      )}
    >
      {/* Main Large Image */}
      <div className="aspect-square w-full relative overflow-hidden rounded-3xl bg-[#F1F5F9] group">
        <img
          src={images[activeImageIndex]}
          alt={`${title} - Main Image`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveImageIndex(index)}
            className={cn(
              "aspect-square rounded-2xl overflow-hidden border-2 transition-all p-1 bg-white shadow-sm",
              index === activeImageIndex
                ? "border-[#2563EB] scale-[1.02]"
                : "border-transparent hover:border-gray-200",
            )}
          >
            <img
              src={img}
              alt={`${title} - Thumbnail ${index + 1}`}
              className="w-full h-full object-cover rounded-xl"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGalleryWeb;
