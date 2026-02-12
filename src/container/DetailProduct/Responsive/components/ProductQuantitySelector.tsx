import React from "react";
import { Minus, Plus } from "lucide-react";

interface ProductQuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  maxQuantity?: number;
}

const ProductQuantitySelector: React.FC<ProductQuantitySelectorProps> = ({
  quantity,
  onQuantityChange,
  maxQuantity = 99,
}) => {
  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-100 py-6 mt-4">
      <span className="text-sm font-medium text-gray-900">Jumlah</span>
      <div className="flex items-center border border-gray-200 rounded-md overflow-hidden h-9">
        <button
          onClick={handleDecrement}
          disabled={quantity <= 1}
          className="w-10 h-full flex items-center justify-center bg-white hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-white transition-colors border-r border-gray-200"
        >
          <Minus className="w-4 h-4 text-gray-600" />
        </button>
        <div className="w-12 h-full flex items-center justify-center bg-white text-sm font-medium text-gray-900">
          {quantity}
        </div>
        <button
          onClick={handleIncrement}
          disabled={quantity >= maxQuantity}
          className="w-10 h-full flex items-center justify-center bg-white hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-white transition-colors border-l border-gray-200"
        >
          <Plus className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default ProductQuantitySelector;
