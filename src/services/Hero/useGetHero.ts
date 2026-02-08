import useSWR from "swr";
import { fetcherOSStore } from "@/lib/axios";

export interface HeroSection {
  id: string;
  badgeText: string;
  title: string;
  buttonText: string;
  backgroundImage: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetHeroResponse {
  success: boolean;
  message: string;
  data: HeroSection[];
}

export const useGetHero = () => {
  const { data, error, isLoading, mutate } = useSWR<GetHeroResponse>(
    "/api/v1/hero-sections",
    (url: string) => fetcherOSStore.get(url).then((res) => res.data),
  );

  return {
    heroData: data?.data,
    isLoading,
    isError: error,
    mutate,
  };
};
