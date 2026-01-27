import useSWR from "swr";
import { fetcherOSStore } from "@/lib/axios";

export interface AddressItem {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
}

export interface GetAddressesResponse {
  success: boolean;
  message: string;
  data: AddressItem[];
}

export const getAddressesData = async (
  url: string,
): Promise<GetAddressesResponse> => {
  const response = await fetcherOSStore.get(url);
  return response.data;
};

export const useGetAddresses = () => {
  const { data, error, isLoading, mutate } = useSWR<GetAddressesResponse>(
    "/api/v1/addresses",
    getAddressesData,
  );

  return {
    addresses: data?.data || [],
    isLoading,
    isError: error,
    mutate,
  };
};
