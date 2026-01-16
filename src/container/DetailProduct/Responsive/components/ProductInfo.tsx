import { Star } from "lucide-react";

interface ProductInfoProps {
  title: string;
  price: number;
  rating: number;
  reviewCount: number;
}

const ProductInfo = ({
  title,
  price,
  rating,
  reviewCount,
}: ProductInfoProps) => {
  return (
    <>
      <div className="flex justify-between items-start gap-4">
        <h1 className="text-2xl font-bold leading-tight flex-1">{title}</h1>
        <span className="text-xl font-bold text-white">
          ${price ? price.toFixed(2) : "0.00"}
        </span>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= Math.round(rating)
                  ? "text-blue-500 fill-blue-500"
                  : "text-gray-600 fill-gray-600"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-400">({reviewCount} reviews)</span>
      </div>
    </>
  );
};

export default ProductInfo;
