import useSWR from "swr";
import { fetcherOSStore } from "@/lib/axios";

export interface UserProfile {
  id: string;
  email: string;
  roleId: string;
  isActive: boolean;
  roleName: string;
  fullName: string;
  avatarUrl: string;
  phone: string;
  createdAt: string;
}

interface ProfileResponse {
  success: boolean;
  message: string;
  data: UserProfile;
}

const USE_MOCK = false;

// Mock data for development
const mockProfile: UserProfile = {
  id: "d09c5637-cab1-4b8e-9f14-15f218f94b46",
  email: "gilang.10121152@mahasiswa.unikom.ac.id",
  roleId: "c3214054-9259-4638-a8e6-a1b934a91617",
  isActive: true,
  roleName: "customer",
  fullName: "Gilang Herdiansyah Saputra",
  avatarUrl:
    "https://uvetcjmswzqmhcwtkynx.supabase.co/storage/v1/object/public/user-content/avatars/d09c5637-cab1-4b8e-9f14-15f218f94b46-1768983900279.jpg",
  phone: "082116878561",
  createdAt: "2026-01-20T14:10:35.070Z",
};

export const getProfileData = async (): Promise<UserProfile> => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return mockProfile;
  }

  const response =
    await fetcherOSStore.get<ProfileResponse>("/api/v1/users/me");

  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to fetch profile");
  }

  return response.data.data;
};

export const useGetProfile = () => {
  const { data, error, isLoading, mutate } = useSWR<UserProfile>(
    "/api/v1/users/me",
    getProfileData,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000,
    },
  );

  return {
    profile: data,
    isLoading,
    isError: error,
    mutate,
  };
};
