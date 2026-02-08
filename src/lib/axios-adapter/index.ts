import xior from "xior";
import type { XiorInstance as BaseXiorInstance } from "xior";

import { useTokenStore } from "@/lib/auth-adapter/tokenStore";
import { useUserStore } from "@/lib/auth-adapter/userStore";
import { useWishlistStore } from "@/store/wishlistStore";
import {
  DEFAULT_PUBLIC_ROUTES,
  getIsPublicRoute,
} from "@/lib/auth-adapter/auth-guard";

// Route configuration types
export type RouteMethod = "exact" | "includes" | "regex";

export interface PublicRoute {
  path: string | RegExp;
  method: RouteMethod;
}

// Token interface
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// Axios configuration options
export interface CreateAxiosOptions {
  baseURL?: string;
  getToken?: () => AuthTokens;
  getLanguageId?: () => string;
  clearSession?: () => void;
  languageId?: string;

  maintenance?: {
    redirectTo?: string;
    statusCode?: number;
  };

  guard?: {
    publicRoutes?: PublicRoute[];
    statusCode?: number[];
    loggedOutRedirectTo?: string;
  };
}

// Xior instance type (from xior package)
export type XiorInstance = BaseXiorInstance;

/**
 * Creates a configured Xior (axios-like) instance with authentication and error handling.
 */
export const createAxiosAdapter = ({
  baseURL = "/",
  getToken = () => {
    const token = useTokenStore.getState();
    return {
      accessToken: token?.accessToken || "",
      refreshToken: token?.refreshToken || "",
    };
  },
  clearSession = () => {
    useTokenStore.getState().actions.clearToken();
    useUserStore.getState().actions.clearUser();
    useWishlistStore.getState().clearWishlist();
  },

  getLanguageId = () => "",
  maintenance: maintenanceProps,
  guard: guardProps,
}: CreateAxiosOptions): XiorInstance => {
  const maintenance = {
    redirectTo: `${import.meta.env.VITE_INTERNAL_WEB || "/"}sistem`,
    statusCode: 503,
    ...maintenanceProps,
  };

  const guard: CreateAxiosOptions["guard"] = {
    publicRoutes: DEFAULT_PUBLIC_ROUTES,
    statusCode: [401],
    loggedOutRedirectTo: "/login",
    ...guardProps,
  };

  const fetcher = xior.create({
    baseURL,
    timeout: 30000, // 30 seconds timeout
  });

  // Request interceptor - Add authentication tokens to all requests if they exist
  fetcher.interceptors.request.use(
    (config) => {
      const token = getToken();

      // Check if the request is for a public API endpoint
      // Adjust this logic based on your API structure.
      // Typically, public GET endpoints (like products) shouldn't need sensitive headers that trigger preflight.
      const isPublicEndpoint =
        config.url?.includes("/auth/") ||
        (config.method?.toLowerCase() === "get" &&
          config.url?.includes("/products"));

      const isRefreshEndpoint = config.url?.includes("/auth/refresh");

      if (token?.accessToken && !isPublicEndpoint && !isRefreshEndpoint) {
        config.headers.Authorization = `Bearer ${token.accessToken}`;
      }

      // Only send refresh token on refresh endpoint
      if (token?.refreshToken && isRefreshEndpoint) {
        // Use lowercase for better compatibility
        config.headers["refresh-token"] = token.refreshToken;
      }

      const languageid = getLanguageId();
      if (languageid) config.headers["languageid"] = languageid;

      return config;
    },
    (error) => Promise.reject(error),
  );

  // Response interceptor - Handle global error responses
  fetcher.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        if (error.response.status === maintenance.statusCode) {
          console.warn(
            "Service Unavailable (503). Redirecting to maintenance page.",
          );
          window.location.replace(maintenance.redirectTo);
        }
        if (guard.statusCode?.includes(error.response.status)) {
          clearSession();
          const isPublicRoute = getIsPublicRoute(guard.publicRoutes || []);
          if (window?.location && !isPublicRoute) {
            window.location.replace(guard.loggedOutRedirectTo!);
          }
        }
      } else if (error instanceof Error) {
        console.error("Request setup error:", error.message);
      }

      return Promise.reject(error);
    },
  );

  return fetcher;
};
