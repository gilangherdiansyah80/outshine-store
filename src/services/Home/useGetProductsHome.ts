import useSWR from "swr";

const USE_MOCK = true;

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  currency: string;
  imageSrc: string;
  isWishlisted: boolean;
  category: string;
  rating: number;
  soldCount: number;
}

const mockAPIResult = {
  Message: { Code: 200, Text: "SUCCESS" },
  Data: [
    {
      id: "product-1",
      name: "Essential Box Tee",
      price: 45.0,
      currency: "$",
      imageSrc:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
      isWishlisted: false,
      category: "Clothing",
      rating: 4.5,
      soldCount: 120,
    },
    {
      id: "product-2",
      name: "Classic Denim Jacket",
      price: 89.99,
      currency: "$",
      imageSrc:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800",
      isWishlisted: true,
      category: "Clothing",
      rating: 4.8,
      soldCount: 85,
    },
    {
      id: "product-3",
      name: "Minimalist Watch",
      price: 129.0,
      currency: "$",
      imageSrc:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
      isWishlisted: false,
      category: "Accessories",
      rating: 4.7,
      soldCount: 200,
    },
    {
      id: "product-4",
      name: "Wireless Earbuds Pro",
      price: 159.99,
      currency: "$",
      imageSrc:
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800",
      isWishlisted: false,
      category: "Electronics",
      rating: 4.6,
      soldCount: 350,
    },
    {
      id: "product-5",
      name: "Canvas Backpack",
      price: 65.0,
      currency: "$",
      imageSrc:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
      isWishlisted: true,
      category: "Bags",
      rating: 4.4,
      soldCount: 95,
    },
    {
      id: "product-6",
      name: "Premium Sunglasses",
      price: 79.99,
      currency: "$",
      imageSrc:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800",
      isWishlisted: false,
      category: "Accessories",
      rating: 4.3,
      soldCount: 180,
    },
  ],
};

export const getProductsHomeData = async (): Promise<ProductItem[]> => {
  if (USE_MOCK) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockAPIResult.Data as ProductItem[];
  } else {
    // Replace with actual API call when ready
    // const response = await fetcherMock.get("/products-home");
    // return response.data?.Data;
    return [];
  }
};

export const useGetProductsHome = () => {
  const { data, error, isLoading, mutate } = useSWR<ProductItem[]>(
    "/products-home",
    getProductsHomeData,
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
