import type { ProductSize } from "@outshine/services/Products/useGetDetailProduct";

interface ProductSizeSelectorProps {
  sizes: ProductSize[];
  selectedSize: string | null;
  onSizeChange: (size: string) => void;
}

const ProductSizeSelector = ({
  sizes,
  selectedSize,
  onSizeChange,
}: ProductSizeSelectorProps) => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {sizes.map((size) => (
        <button
          key={size.id}
          onClick={() => onSizeChange(size.name)}
          className={`py-3 rounded-lg border text-sm font-semibold transition-all ${
            selectedSize === size.name
              ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-900/50"
              : "bg-[#141925] border-transparent text-gray-300 hover:border-gray-600"
          }`}
        >
          {size.name}
        </button>
      ))}
    </div>
  );
};

export default ProductSizeSelector;
