import useSWRMutation from "swr/mutation";
import { fetcherOSStore } from "@/lib/axios";

// Flag to toggle between mock and real API
const USE_MOCK = false;

export interface RegisterRequest {
  email: string;
  password?: string;
  fullName: string;
  phone: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

/**
 * Helper function to handle the registration request (Mock or Real)
 */
async function registerUser(
  url: string,
  { arg }: { arg: RegisterRequest },
): Promise<RegisterResponse> {
  if (USE_MOCK) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate success response
    return {
      success: true,
      message: "User registered successfully",
      data: {
        id: "mock-id",
        email: arg.email,
        message:
          "Registrasi berhasil. Silakan cek email Anda untuk kode verifikasi.",
      },
    };
  }

  // Real API call
  const response = await fetcherOSStore.post(url, arg);
  return response.data;
}

/**
 * Hook for user registration
 */
export const usePostRegister = () => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    "/api/v1/auth/register",
    registerUser,
  );

  return {
    trigger,
    data,
    isLoading: isMutating,
    isError: error,
  };
};
