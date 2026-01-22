import useSWRMutation from "swr/mutation";
import { fetcherOSStore } from "@/lib/axios";
import { useTokenStore } from "@/lib/auth-adapter/tokenStore";

// Flag to toggle between mock and real API
const USE_MOCK = false;

export interface LogoutRequest {
  refreshToken: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

/**
 * Helper function to handle the logout request
 */
async function logoutUser(
  url: string,
  { arg }: { arg: LogoutRequest },
): Promise<LogoutResponse> {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      success: true,
      message: "Logout successful",
      data: null,
    };
  }

  const response = await fetcherOSStore.post(url, arg);
  return response.data;
}

/**
 * Hook for user logout
 */
export const usePostLogout = () => {
  const refreshToken = useTokenStore((state) => state.refreshToken);

  const { trigger, data, error, isMutating } = useSWRMutation(
    "/api/v1/auth/logout",
    logoutUser,
  );

  const logout = async () => {
    return trigger({ refreshToken });
  };

  return {
    trigger: logout,
    data,
    isLoading: isMutating,
    isError: error,
  };
};
