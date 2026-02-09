import { Star } from "lucide-react";
import { formatIDR } from "@/lib/utils";

interface ProductInfoProps {
  title: string;
  price: number;
  formattedDiscounted?: string;
  originalPrice?: number;
  formattedOriginal?: string;
  rating: number;
  reviewCount: number;
}

const ProductInfo = ({
  title,
  price,
  formattedDiscounted,
  formattedOriginal,
  rating,
  reviewCount,
}: ProductInfoProps) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold leading-tight text-gray-900">
          {title}
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-[#0F172A]">
            {formattedDiscounted || formatIDR(price)}
          </span>
          {formattedOriginal && formattedOriginal !== formattedDiscounted && (
            <span className="text-sm text-gray-400 line-through">
              {formattedOriginal}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= Math.round(rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-600 fill-gray-600"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-400">({reviewCount} ulasan)</span>
      </div>
    </>
  );
};

export default ProductInfo;
