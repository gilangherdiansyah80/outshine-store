import {
  Star,
  // ShieldCheck,
  // Undo2,
  // CreditCard,
  // ChevronRight,
  // Heart,
} from "lucide-react";
import { formatIDR } from "@/lib/utils";

interface ProductInfoProps {
  title: string;
  price: number;
  formattedDiscounted?: string;
  originalPrice?: number;
  formattedOriginal?: string;
  rating: number;
  reviewCount: number;
  totalBuyers: number;
  images: string[];
  isPo?: boolean;
  onSelectImage: (index: number) => void;
}

const ProductInfo = ({
  title,
  price,
  formattedDiscounted,
  formattedOriginal,
  rating,
  reviewCount,
  isPo,
  images,
  totalBuyers,
  onSelectImage,
}: ProductInfoProps) => {
  return (
    <div className="px-4 py-3 space-y-2">
      <div className="flex gap-x-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => onSelectImage(index)}
            className="focus:outline-none w-14 h-14"
          >
            <img src={image} alt={title} className="w-full h-full rounded-sm" />
          </button>
        ))}
      </div>
      {/* Price Section */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#0B0F19]">
              {formattedDiscounted || formatIDR(price)}
            </span>
            {formattedOriginal && formattedOriginal !== formattedDiscounted && (
              <span className="text-sm text-gray-400 line-through">
                {formattedOriginal}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-[#EE4D2D]/10 text-[#0B0F19] text-[10px] font-bold px-1 rounded">
              {isPo ? "Pre Order" : "Ready Stock"}
            </span>
            <h1 className="text-base text-gray-800 line-clamp-2 leading-snug">
              {title}
            </h1>
          </div>
        </div>
        {/* <button className="p-2 text-gray-400 hover:text-[#EE4D2D] transition-colors">
          <Heart className="w-6 h-6" />
        </button> */}
      </div>

      {/* Stats Section */}
      <div className="flex items-center gap-3 divide-x divide-gray-100 py-1">
        <div className="flex items-center gap-1">
          <span className="text-sm font-bold text-gray-900 border-b border-gray-900 leading-none">
            {rating}
          </span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-3 h-3 ${
                  star <= Math.round(rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300 fill-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="pl-3">
          <span className="text-sm text-gray-500">
            <span className="text-gray-900 font-medium">
              {reviewCount > 1000 ? "1,1RB" : reviewCount}
            </span>{" "}
            Penilaian
          </span>
        </div>
        <div className="pl-3">
          <span className="text-sm text-gray-500">
            <span className="text-gray-900 font-medium">
              {totalBuyers > 1000 ? "1,1RB" : totalBuyers}
            </span>{" "}
            Terjual
          </span>
        </div>
      </div>

      {/* Services Section */}
      {/* <div className="pt-2 border-t border-gray-50 space-y-3">
        <div className="flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-[#EE4D2D]" />
            <span className="text-sm text-gray-600">
              Garansi tiba 11 - 12 Februari
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>

        <div className="flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <Undo2 className="w-4 h-4 text-[#EE4D2D]" />
            <span className="text-sm text-gray-600">Bebas Pengembalian</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>

        <div className="flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <CreditCard className="w-4 h-4 text-[#EE4D2D]" />
            <span className="text-sm text-gray-600">
              SPayLater: Cicilan Pasti 0% + Diskon 50RB
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>
      </div> */}
    </div>
  );
};

export default ProductInfo;
