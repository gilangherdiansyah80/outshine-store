import { useNavigate, useSearchParams } from "react-router-dom";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useShallow } from "zustand/react/shallow";

import type {
  AuthAdapter,
  AuthMatrix,
  AuthUser,
} from "@/lib/auth-adapter/auth-adapter";
import {
  DEFAULT_PUBLIC_ROUTES,
  getIsPublicRoute,
} from "@/lib/auth-adapter/auth-guard";
import { useTokenActions, useTokenStore } from "@/lib/auth-adapter/tokenStore";
import { useUserActions, useUserStore } from "@/lib/auth-adapter/userStore";

export interface AuthenticationProviderProps {
  children: React.ReactNode;
}

export interface AuthContextValue<
  TUser extends AuthUser = AuthUser,
  TMatrix extends AuthMatrix = AuthMatrix,
> {
  isLoggedIn: boolean;
  dataUser: TUser | null;
  dataMatrix?: TMatrix | null; // Optional matrix data
  logout: AuthAdapter<TUser, TMatrix>["logout"];
  login: AuthAdapter<TUser, TMatrix>["login"];
}

/**
 * This context is now used *only* to pass the adapter instance
 * from the AuthProvider down to the useAuth hook.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AdapterContext = createContext<AuthAdapter<any, any> | null>(null);

export const createAuthAdapter = <
  TUser extends AuthUser = AuthUser,
  TMatrix extends AuthMatrix = AuthMatrix,
>(
  adapter: AuthAdapter<TUser, TMatrix>,
) => {
  /**
   * The provider component. Its jobs are:
   * 1. Run the one-time session initialization.
   * 2. Provide the adapter instance to the rest of the app via context.
   */
  const AuthProvider = ({ children }: AuthenticationProviderProps) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const { accessToken, refreshToken } = useTokenStore();
    const { isLoading, dataUser } = useUserStore(
      useShallow((s) => ({ isLoading: s.isLoading, dataUser: s.dataUser })),
    );
    const { setToken, clearToken } = useTokenActions();
    const { setLoading, setDataMatrix, setUser, clearUser } = useUserActions();

    const [hasInitAuth, setHasInitAuth] = useState(false);
    const hasCheckAccess = useRef(false);

    const guard: AuthAdapter["guard"] = {
      publicRoutes: DEFAULT_PUBLIC_ROUTES,
      loggedOutRedirectTo: "/login",
      loggedInRedirectTo: "/",
      ...adapter.guard,
    };

    useEffect(() => {
      const initAuth = async () => {
        setLoading(true);

        const accessTokenParams = searchParams.get("accessToken");
        const refreshTokenParams = searchParams.get("refreshToken");

        let activeAccessToken = accessToken;
        let activeRefreshToken = refreshToken;

        if (accessTokenParams && refreshTokenParams) {
          activeAccessToken = accessTokenParams;
          activeRefreshToken = refreshTokenParams;
          setToken({
            accessToken: accessTokenParams,
            refreshToken: refreshTokenParams,
          });
          // Clean URL params directly in the component
          const url = new URL(window.location.href);
          url.searchParams.delete("accessToken");
          url.searchParams.delete("refreshToken");
          window.history.replaceState({}, "", url.toString());
        }

        // Delegate the entire session initialization to the adapter
        try {
          const data = await adapter.getSession(
            activeAccessToken,
            activeRefreshToken,
          );
          setUser({
            isLoggedIn: adapter.isLoggedIn(data.user, data.matrix || null),
            ...data.user,
          });
          if (data?.matrix) setDataMatrix(data.matrix);
        } catch (error) {
          console.warn("Error when trying to get session", error);
        } finally {
          setHasInitAuth(true);
          setLoading(false);
        }
      };

      initAuth();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // adapter is a stable class instance

    useEffect(() => {
      if (hasCheckAccess.current) return;

      if (hasInitAuth) {
        const isPublicRoute = getIsPublicRoute(guard.publicRoutes);

        if (
          !dataUser?.isLoggedIn &&
          !isPublicRoute &&
          guard.loggedOutRedirectTo &&
          window.location.pathname !== guard.loggedOutRedirectTo
        ) {
          window.location.replace(guard.loggedOutRedirectTo);
        } else if (
          dataUser?.isLoggedIn &&
          isPublicRoute &&
          guard.loggedInRedirectTo &&
          window.location.pathname !== guard.loggedInRedirectTo
        ) {
          window.location.replace(guard.loggedInRedirectTo);
        }

        hasCheckAccess.current = true;
      }
    }, [
      hasInitAuth,
      dataUser?.isLoggedIn,
      guard.loggedInRedirectTo,
      guard.loggedOutRedirectTo,
      guard.publicRoutes,
    ]);

    const login = useCallback(
      async (credential: import("./auth-adapter").AuthCredential) => {
        const response = await adapter.login(credential);
        setToken({
          accessToken: response.accessToken || "",
          refreshToken: response.refreshToken || "",
        });

        const data = await adapter.getSession(
          response.accessToken || "",
          response.refreshToken || "",
        );
        setUser({
          isLoggedIn: adapter.isLoggedIn(data.user, data.matrix || null),
          ...data.user,
        });
        if (data?.matrix) setDataMatrix(data.matrix);

        return response;
      },
      [setToken, setDataMatrix, setUser],
    );

    const logout = useCallback(() => {
      clearToken();
      clearUser();
      return adapter.logout(navigate, accessToken, refreshToken);
    }, [accessToken, refreshToken, navigate, clearToken, clearUser]);

    const isPublic = getIsPublicRoute(adapter.guard?.publicRoutes);

    console.log(
      `[AuthProvider] Render - isLoading: ${isLoading}, isPublic: ${isPublic}`,
    );

    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <AdapterContext.Provider value={{ ...adapter, logout, login } as any}>
        {!isLoading || isPublic ? children : null}
      </AdapterContext.Provider>
    );
  };

  /**
   * Hook to consume Authentication state and actions.
   * It gets the adapter from context and uses its hooks/methods.
   * @returns {AuthContextValue} with fully inferred types
   */
  const useAuth = (): AuthContextValue<TUser, TMatrix> => {
    const adapterInstance = useContext(AdapterContext) as AuthAdapter<
      TUser,
      TMatrix
    >;
    if (adapterInstance === null) {
      throw new Error("useAuth must be used within an AuthProvider");
    }

    // 1. Get state by calling the adapter's state hooks
    const dataUser = useUserStore((state) => state.dataUser) as TUser | null;

    // 2. Get optional matrix data (may be null if adapter doesn't support it)
    const dataMatrix = useUserStore(
      (state) => state.dataMatrix,
    ) as TMatrix | null;

    // 3. Get derived state by calling the adapter's logic hook
    const isLoggedIn = dataUser
      ? adapter.isLoggedIn(dataUser, dataMatrix)
      : false;

    return {
      dataMatrix,
      dataUser,
      isLoggedIn,
      logout: adapterInstance.logout,
      login: adapterInstance.login,
    };
  };

  return { AuthProvider, useAuth };
};
