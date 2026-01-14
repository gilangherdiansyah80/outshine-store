import useSWR from "swr";

const USE_MOCK = true;

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
}

const mockAPIResult = {
  Message: { Code: 200, Text: "SUCCESS" },
  Data: [
    { id: "cat-1", name: "Tees", slug: "tees" },
    { id: "cat-2", name: "Hoodies", slug: "hoodies" },
    { id: "cat-3", name: "Pants", slug: "pants" },
    { id: "cat-4", name: "Shorts", slug: "shorts" },
    { id: "cat-5", name: "Jackets", slug: "jackets" },
    { id: "cat-6", name: "Shoes", slug: "shoes" },
  ],
};

export const getCategoryData = async (): Promise<CategoryItem[]> => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockAPIResult.Data as CategoryItem[];
  } else {
    return [];
  }
};

export const useGetCategory = () => {
  const { data, error, isLoading } = useSWR<CategoryItem[]>(
    "/categories",
    getCategoryData,
    {
      fallbackData: [],
      revalidateOnFocus: false,
    }
  );

  return {
    data: data ?? [],
    isLoading,
    isError: error,
  };
};
