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
  isPo?: boolean; // pre-order status
  // Metadata for filtering
  sizes: string[];
  colors: string[];
  category: string;
  rating: number;
}

const USE_MOCK = true;

export const mockAPIResult = {
  Message: { Code: 200, Text: "SUCCESS" },
  Data: [
    {
      id: "1",
      name: "Linear Tech Parka",
      price: 120.0,
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop",
      isNew: true,
      isPo: true,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Brown", "Black"],
      category: "Jackets",
      rating: 4.8,
    },
    {
      id: "2",
      name: "Essential Box Tee",
      price: 45.0,
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
      price: 68.0,
      originalPrice: 85.0,
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
      price: 95.0,
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
      price: 110.0,
      image:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop",
      isPo: true,
      sizes: ["S", "M", "L"],
      colors: ["Cream", "Grey"],
      category: "Sweaters",
      rating: 4.9,
    },
    {
      id: "6",
      name: "Heritage Denim Jacket",
      price: 89.0,
      image:
        "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=1000&auto=format&fit=crop",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Blue", "Light Blue"],
      category: "Jackets",
      rating: 4.4,
    },
  ],
};

export const getProductsData = async (): Promise<ProductItem[]> => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return mockAPIResult.Data;
  } else {
    const response = await fetch("/api/products/responsive");
    if (!response.ok) throw new Error("Failed to fetch products");
    const result = await response.json();
    return result.Data || [];
  }
};

export const useGetProducts = () => {
  const { data, error, isLoading } = useSWR<ProductItem[]>(
    "/api/products/responsive",
    getProductsData,
  );

  return {
    products: data,
    isLoading,
    isError: error,
  };
};
