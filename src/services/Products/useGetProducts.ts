import useSWR from "swr";

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  discount?: number; // percent
  isWishlisted?: boolean;
}

const mockProducts: ProductItem[] = [
  {
    id: "1",
    name: "Linear Tech Parka",
    price: 120.0,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: "2",
    name: "Essential Box Tee",
    price: 45.0,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Core Oversized Hoodie",
    price: 68.0,
    originalPrice: 85.0,
    discount: 20,
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Urban Utility Cargo",
    price: 95.0,
    image:
      "https://images.unsplash.com/photo-1517445312882-641029cabc7b?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "5",
    name: "Cloud Knit Sweater",
    price: 110.0,
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "6",
    name: "Heritage Denim Jacket",
    price: 89.0,
    image:
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=1000&auto=format&fit=crop",
  },
];

const fetcher = async (): Promise<ProductItem[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockProducts;
};

export const useGetProducts = () => {
  const { data, error, isLoading } = useSWR<ProductItem[]>(
    "/api/products/responsive",
    fetcher
  );

  return {
    products: data,
    isLoading,
    isError: error,
  };
};
