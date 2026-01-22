import useSWR from "swr";
import { fetcherOSStore } from "@/lib/axios";

// Frontend interface (backwards compatible)
export interface ProductItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  discount?: number; // percent
  isWishlisted?: boolean;
  // Metadata for filtering
  sizes: string[];
  colors: string[];
  category: string;
  rating: number;
  // New fields from API
  description?: string;
  isPo?: boolean;
  poDpPercent?: number;
  tags?: Array<{ id: string; name: string }>;
  formattedPrice?: string;
  formattedOriginalPrice?: string;
  totalReview?: number;
}

// API Response interfaces
interface APICategory {
  id: string;
  name: string;
}

interface APITag {
  id: string;
  name: string;
}

interface APIDiscount {
  type: string;
  value: number;
}

interface APIPricing {
  original: number;
  discounted: number;
  formattedOriginal: string;
  formattedDiscounted: string;
}

interface APIRating {
  averageRating: number;
  totalReview: number;
}

interface APIProduct {
  id: string;
  name: string;
  description: string;
  category: APICategory;
  basePrice: number;
  isActive: boolean;
  isPo: boolean;
  poDpPercent: number;
  primaryImage: string;
  tags: APITag[];
  discount: APIDiscount | null;
  pricing: APIPricing;
  rating: APIRating;
  createdAt: string;
}

interface ProductsResponse {
  success: boolean;
  message: string;
  data: APIProduct[];
}

const USE_MOCK = false;

// Mock data for development/testing
export const mockProducts: ProductItem[] = [
  {
    id: "1",
    name: "Linear Tech Parka",
    price: 120000,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop",
    isNew: true,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Brown", "Black"],
    category: "Jackets",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Essential Box Tee",
    price: 45000,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Grey"],
    category: "T-Shirts",
    rating: 4.5,
  },
  {
    id: "3",
    name: "Core Oversized Hoodie",
    price: 68000,
    originalPrice: 85000,
    discount: 20,
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Grey", "Black", "Navy"],
    category: "Hoodies",
    rating: 4.7,
  },
  {
    id: "4",
    name: "Urban Utility Cargo",
    price: 95000,
    image:
      "https://images.unsplash.com/photo-1517445312882-641029cabc7b?q=80&w=1000&auto=format&fit=crop",
    sizes: ["28", "30", "32", "34"],
    colors: ["Navy", "Olive", "Black"],
    category: "Pants",
    rating: 4.6,
  },
  {
    id: "5",
    name: "Cloud Knit Sweater",
    price: 110000,
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop",
    sizes: ["S", "M", "L"],
    colors: ["Cream", "Grey"],
    category: "Sweaters",
    rating: 4.9,
  },
  {
    id: "6",
    name: "Heritage Denim Jacket",
    price: 89000,
    image:
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=1000&auto=format&fit=crop",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Light Blue"],
    category: "Jackets",
    rating: 4.4,
  },
];

// Export for backwards compatibility with other services
export const mockAPIResult = {
  Message: { Code: 200, Text: "SUCCESS" },
  Data: mockProducts,
};

// Map API product to frontend ProductItem
const mapAPIProductToProductItem = (apiProduct: APIProduct): ProductItem => {
  const isNew = apiProduct.tags?.some(
    (tag) => tag.name.toLowerCase() === "new",
  );

  return {
    id: apiProduct.id,
    name: apiProduct.name,
    description: apiProduct.description,
    price: apiProduct.pricing?.discounted ?? apiProduct.basePrice,
    originalPrice: apiProduct.discount
      ? apiProduct.pricing?.original
      : undefined,
    image: apiProduct.primaryImage,
    isNew,
    discount:
      apiProduct.discount?.type === "percent"
        ? apiProduct.discount.value
        : undefined,
    category: apiProduct.category?.name ?? "Uncategorized",
    rating: apiProduct.rating?.averageRating ?? 0,
    totalReview: apiProduct.rating?.totalReview ?? 0,
    isPo: apiProduct.isPo,
    poDpPercent: apiProduct.poDpPercent,
    tags: apiProduct.tags,
    formattedPrice: apiProduct.pricing?.formattedDiscounted,
    formattedOriginalPrice: apiProduct.pricing?.formattedOriginal,
    // Default values for backwards compatibility
    sizes: [],
    colors: [],
    isWishlisted: false,
  };
};

export const getProductsData = async (): Promise<ProductItem[]> => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return mockProducts;
  }

  const response =
    await fetcherOSStore.get<ProductsResponse>("/api/v1/products");

  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to fetch products");
  }

  // Only return active products
  return response.data.data
    .filter((product) => product.isActive)
    .map(mapAPIProductToProductItem);
};

export const useGetProducts = () => {
  const { data, error, isLoading, mutate } = useSWR<ProductItem[]>(
    "/api/v1/products",
    getProductsData,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      dedupingInterval: 60000, // Dedupe requests within 60 seconds
    },
  );

  return {
    products: data,
    isLoading,
    isError: error,
    refetch: mutate,
  };
};
