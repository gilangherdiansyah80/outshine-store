import type {
  DefaultAuthUserWithLoggedIn,
  AuthMatrix,
  AuthAdapter,
  AuthCredential,
} from "@/lib/auth-adapter/auth-adapter";
import { createAuthAdapter } from "@/lib/auth-adapter/create-auth";

import { getUserStatusV3 } from "@/services/Shared/User";

import { PUBLIC_ROUTES } from "./publicRoute";

const adapter: AuthAdapter<DefaultAuthUserWithLoggedIn, AuthMatrix> = {
  guard: {
    publicRoutes: PUBLIC_ROUTES,
    loggedOutRedirectTo: `/${import.meta.env.VITE_ASSET_REVERSE}/welcome`,
    loggedInRedirectTo: `/${import.meta.env.VITE_ASSET_REVERSE}/home`,
  },
  getSession: async (accessToken: string, _refreshToken: string) => {
    try {
      const response = await getUserStatusV3(accessToken);
      return {
        user: {
          isLoggedIn: Boolean(response.data.Data.ID),
          name: response.data.Data.Name,
          email: response.data.Data.Email,
          ...response.data.Data,
        },
      };
    } catch (_err) {
      return {
        user: {
          isLoggedIn: false,
        } as DefaultAuthUserWithLoggedIn,
      };
    }
  },
  isLoggedIn: (
    user: DefaultAuthUserWithLoggedIn,
    _matrix: AuthMatrix | null,
  ) => {
    return Boolean(user.isLoggedIn);
  },
  login: async (credential: AuthCredential) => {
    // Note: The credential type here is currently specialized in auth-adapter.ts
    // For now, we use the provided structure but you should align AuthCredential
    // with your actual login form fields (Email, Password).
    const { email, password } = credential as unknown as Record<string, string>;

    // In a real project, you would call your login endpoint here:
    // const response = await fetcher.post('/login', { email, password });

    // Mock successful login for now to match project flow
    if (email && password) {
      return {
        loggedIn: true,
        accessToken: "mock_access_token",
        refreshToken: "mock_refresh_token",
      };
    }

    throw new Error("Invalid credentials");
  },
  logout: async (
    _navigate: (path: string) => void,
    _accessToken: string,
    _refreshToken: string,
  ) => {
    // Clear session and redirect to welcome
    window.location.href = `/${import.meta.env.VITE_ASSET_REVERSE}/welcome`;
  },
};

export const { AuthProvider, useAuth } = createAuthAdapter(adapter);
