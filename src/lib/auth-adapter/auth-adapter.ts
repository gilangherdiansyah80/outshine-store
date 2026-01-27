import type { PublicRoute } from "./auth-guard";

export type AppRouterInstance = (path: string) => void;

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser {
  name?: string | null;
  email?: string | null;
  photo?: string | null;
  phone?: string | null;
  data?: unknown;
}

export interface DefaultAuthUserWithLoggedIn extends AuthUser {
  isLoggedIn: boolean;
}

export interface AuthMatrix {
  [key: string]: unknown;
}

type Username = {
  type: "username";
  username: string;
  password: string;
  [key: string]: unknown;
};

type Phone = {
  type: "phone";
  phone: string;
  password: string;
  [key: string]: unknown;
};

type Email = {
  type: "email";
  email: string;
  password: string;
  [key: string]: unknown;
};

export type AuthCredential = Username | Phone | Email;

export interface AuthAdapter<
  TUser extends AuthUser = AuthUser,
  TMatrix extends AuthMatrix = AuthMatrix,
> {
  guard?: {
    publicRoutes?: PublicRoute[];
    loggedOutRedirectTo?: string | null;
    loggedInRedirectTo?: string | null;
  };

  login: (credential: AuthCredential) => Promise<{
    loggedIn: boolean;
    accessToken?: string | null;
    refreshToken?: string | null;
  }>;
  getSession(
    accessToken: string,
    refreshToken: string,
  ): Promise<{ user: TUser; matrix?: TMatrix }>;
  logout(
    router: AppRouterInstance,
    accessToken: string,
    refreshToken: string,
  ): Promise<void>;
  isLoggedIn: (user: TUser, matrix: TMatrix | null) => boolean;
}

// 🎯 Type inference helper - extracts TUser from adapter
export type InferAdapterUser<T extends AuthAdapter> =
  T extends AuthAdapter<infer U, AuthMatrix> ? U : DefaultAuthUserWithLoggedIn;

// 🎯 Type inference helper - extracts TMatrix from adapter
export type InferAdapterMatrix<T extends AuthAdapter> =
  T extends AuthAdapter<AuthUser, infer M> ? M : AuthMatrix;
