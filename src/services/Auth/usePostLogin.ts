import useSWRMutation from "swr/mutation";
import { fetcherOSStore } from "@/lib/axios";

// Flag to toggle between mock and real API
const USE_MOCK = false;

export interface LoginRequest {
  email: string;
  password?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

/**
 * Helper function to handle the login request (Mock or Real)
 */
async function loginUser(
  url: string,
  { arg }: { arg: LoginRequest },
): Promise<LoginResponse> {
  if (USE_MOCK) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate success response
    return {
      success: true,
      message: "Login successful",
      data: {
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
        user: {
          id: "mock-user-id",
          email: arg.email,
          fullName: "Mock User",
        },
      },
    };
  }

  // Real API call
  const response = await fetcherOSStore.post(url, arg);
  return response.data;
}

/**
 * Hook for user login
 */
export const usePostLogin = () => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    "/api/v1/auth/login",
    loginUser,
  );

  return {
    trigger,
    data,
    isLoading: isMutating,
    isError: error,
  };
};
