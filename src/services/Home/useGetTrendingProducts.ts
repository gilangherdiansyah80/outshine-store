import useSWR from "swr";
import { fetcherOSStore } from "@/lib/axios";
import { type ProductItem } from "../Products/useGetProducts";
import { mockProducts } from "../Products/useGetProducts";

const USE_MOCK = false;

// Re-export ProductItem as TrendingProductItem for compatibility
export type TrendingProductItem = ProductItem;

// Mock result for compatibility (using shared mock data)
export const mockAPIResult = {
  Message: { Code: 200, Text: "SUCCESS" },
  Data: mockProducts,
};

// API Types (Copied locally or imported if centralized)
interface APIProduct {
  id: string;
  name: string;
  description: string;
  category: { id: string; name: string };
  basePrice: number;
  isActive: boolean;
  isPo: boolean;
  poDpPercent: number;
  primaryImage: string;
  tags: { id: string; name: string }[];
  discount: { type: string; value: number } | null;
  pricing: {
    original: number;
    discounted: number;
    formattedOriginal: string;
    formattedDiscounted: string;
  };
  rating: { averageRating: number; totalReview: number };
}

interface ProductsResponse {
  success: boolean;
  message: string;
  data: APIProduct[];
}

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

export const getTrendingProductsData = async (): Promise<ProductItem[]> => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return mockProducts;
  }

  const response = await fetcherOSStore.get<ProductsResponse>(
    "/api/v1/products?isNew=true&isTrending=true",
  );

  if (!response.data.success) {
    throw new Error(
      response.data.message || "Failed to fetch trending products",
    );
  }

  return response.data.data
    .filter((product) => product.isActive)
    .map(mapAPIProductToProductItem);
};

export const useGetTrendingProducts = () => {
  const { data, error, isLoading, mutate } = useSWR<ProductItem[]>(
    "/api/v1/products?isNew=true&isTrending=true",
    getTrendingProductsData,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000,
    },
  );

  return {
    products: data ?? [], // Changed from 'data' to 'products' to match other hooks pattern if needed, but keeping 'data' return in hook standard
    data: data ?? [], // Keeping 'data' for existing consumers
    isLoading,
    isError: error,
    mutate,
  };
};
