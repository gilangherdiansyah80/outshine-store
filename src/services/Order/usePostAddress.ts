import { fetcherOSStore } from "@/lib/axios";

export interface PostAddressPayload {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
}

export interface PostAddressResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    fullName: string;
    phone: string;
    street: string;
    city: string;
    province: string;
    postalCode: string;
    isDefault: boolean;
  };
}

export const postAddress = async (
  payload: PostAddressPayload,
): Promise<PostAddressResponse> => {
  const response = await fetcherOSStore.post("/api/v1/addresses", payload);
  return response.data;
};
