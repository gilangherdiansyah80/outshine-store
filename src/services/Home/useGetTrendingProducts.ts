import useSWR from "swr";

const USE_MOCK = true;

export interface TrendingProductItem {
  id: string;
  name: string;
  variant: string;
  price: number;
  originalPrice?: number;
  currency: string;
  imageSrc: string;
  isNew: boolean;
  isSale: boolean;
  category: string;
}

const mockAPIResult = {
  Message: { Code: 200, Text: "SUCCESS" },
  Data: [
    {
      id: "trending-1",
      name: "Premium Boxy Tee",
      variant: "Stone White",
      price: 45.0,
      currency: "$",
      imageSrc:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
      isNew: true,
      isSale: false,
      category: "tees",
    },
    {
      id: "trending-2",
      name: "Essential Hoodie",
      variant: "Carbon Grey",
      price: 89.0,
      currency: "$",
      imageSrc:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
      isNew: false,
      isSale: false,
      category: "hoodies",
    },
    {
      id: "trending-3",
      name: "Relaxed Cargo Pants",
      variant: "Olive Drab",
      price: 110.0,
      currency: "$",
      imageSrc:
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800",
      isNew: false,
      isSale: false,
      category: "pants",
    },
    {
      id: "trending-4",
      name: "Phantom Runner X",
      variant: "Hyper Red",
      price: 125.0,
      originalPrice: 180.0,
      currency: "$",
      imageSrc:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
      isNew: false,
      isSale: true,
      category: "shoes",
    },
    {
      id: "trending-5",
      name: "Urban Denim Jacket",
      variant: "Washed Blue",
      price: 145.0,
      currency: "$",
      imageSrc:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800",
      isNew: true,
      isSale: false,
      category: "jackets",
    },
    {
      id: "trending-6",
      name: "Classic Shorts",
      variant: "Navy Blue",
      price: 55.0,
      originalPrice: 75.0,
      currency: "$",
      imageSrc:
        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=800",
      isNew: false,
      isSale: true,
      category: "shorts",
    },
  ],
};

export const getTrendingProductsData = async (): Promise<
  TrendingProductItem[]
> => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockAPIResult.Data as TrendingProductItem[];
  } else {
    return [];
  }
};

export const useGetTrendingProducts = () => {
  const { data, error, isLoading, mutate } = useSWR<TrendingProductItem[]>(
    "/trending-products",
    getTrendingProductsData,
    {
      fallbackData: [],
      revalidateOnFocus: false,
    }
  );

  return {
    data: data ?? [],
    isLoading,
    isError: error,
    mutate,
  };
};
