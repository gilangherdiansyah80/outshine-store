import { cn } from "@outshine/lib/utils";
import { TruckIcon } from "@programmer-molor/my-icons";

interface ShippingBannerProps {
  className?: string;
}

/**
 * Free global shipping banner component
 */
const ShippingBanner = ({ className }: ShippingBannerProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 rounded-xl bg-[#0A2665]",
        className
      )}
    >
      {/* Text Content */}
      <div className="flex flex-col">
        <span className="text-white font-semibold text-base">
          Free Global Shipping
        </span>
        <span className="text-gray-300 text-sm">
          On all orders over $150.00
        </span>
      </div>

      {/* Icon */}
      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500/20">
        <TruckIcon size={28} color="#60a5fa" />
      </div>
    </div>
  );
};

export default ShippingBanner;
