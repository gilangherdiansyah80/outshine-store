import useSWR from "swr";

export interface ProductDetail {
  id: string;
  title: string;
  price: number;
  rating: number;
  reviewCount: number;
  images: string[];
  sizes: string[];
  description: string;
  fabricAndCare: string;
  deliveryAndReturns: string;
  sustainabilityImpact: string;
}

import { mockAPIResult as productsData } from "./useGetProducts";
import {
  mockAPIResult as trendingData,
  type TrendingProductItem,
} from "../Home/useGetTrendingProducts";

const USE_MOCK = true;

const defaultDetail = {
  rating: 4.8,
  reviewCount: 124,
  images: [
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=1000&auto=format&fit=crop",
  ],
  sizes: ["S", "M", "L", "XL"],
  description:
    "This heavyweight tee is pre-shrunk and features a luxurious carbon finish for a soft-touch hand feel.",
  fabricAndCare:
    "Crafted from 100% organic cotton (280GSM). This heavyweight tee is pre-shrunk and features a luxurious carbon finish for a soft-touch hand feel.",
  deliveryAndReturns: "Free delivery on orders over $50. 30-day return policy.",
  sustainabilityImpact:
    "Made with 100% organic cotton. Reduced water consumption in production.",
};

export const getDetailProductData = async (
  id?: string
): Promise<ProductDetail> => {
  if (USE_MOCK) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Find the product in the shared list
    const foundProduct = productsData.Data.find((p) => p.id === id);

    if (foundProduct) {
      return {
        ...defaultDetail,
        id: foundProduct.id,
        title: foundProduct.name, // Map name to title
        price: foundProduct.price,
        // Using the image from the list as the first image
        images: [foundProduct.image, ...defaultDetail.images.slice(1)],
      };
    }

    // Find the product in the trending list
    const foundTrending = trendingData.Data.find(
      (p: TrendingProductItem) => p.id === id
    );

    if (foundTrending) {
      return {
        ...defaultDetail,
        id: foundTrending.id,
        title: foundTrending.name,
        price: foundTrending.price,
        images: [foundTrending.imageSrc, ...defaultDetail.images.slice(1)],
      };
    }

    // Fallback if not found (though usually should be found)
    return {
      ...defaultDetail,
      id: id || "1",
      title: "Product Not Found",
      price: 0,
    };
  } else {
    // API Call implementation
    if (!id) throw new Error("Product ID is required");
    const response = await fetch(`/api/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const result = await response.json();
    return result.Data || result;
  }
};

export const useGetDetailProduct = (id?: string) => {
  const { data, error, isLoading } = useSWR<ProductDetail>(
    id ? `/products/${id}` : null,
    () => getDetailProductData(id)
  );

  return {
    product: data,
    isLoading,
    isError: error,
  };
};
