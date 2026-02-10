import { ShieldCheck, ChevronRight, Truck, Headset } from "lucide-react";
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
  // rating,
  // reviewCount,
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
            <img
              src={image}
              alt={title}
              className="w-full h-full rounded-sm object-cover"
            />
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
      <div className="pt-2 border-t border-gray-50 space-y-4">
        {/* Quality Control */}
        <div className="flex items-start justify-between group">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#EE4D2D] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="text-sm font-semibold text-gray-900 block">
                Outshine Quality Control
              </span>
              <span className="text-xs text-gray-500 block">
                Setiap produk melalui pengecekan detail sebelum dikirim.
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 self-center" />
        </div>

        {/* Fast Handling */}
        <div className="flex items-start justify-between group">
          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-[#EE4D2D] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="text-sm font-semibold text-gray-900 block">
                Outshine Fast Handling
              </span>
              <span className="text-xs text-gray-500 block">
                Pesanan diproses cepat & aman oleh tim Outshine.
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 self-center" />
        </div>

        {/* Customer Support */}
        <div className="flex items-start justify-between group">
          <div className="flex items-start gap-3">
            <Headset className="w-5 h-5 text-[#EE4D2D] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="text-sm font-semibold text-gray-900 block">
                Outshine Customer Support
              </span>
              <span className="text-xs text-gray-500 block">
                Siap bantu sebelum & sesudah pembelian.
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 self-center" />
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
