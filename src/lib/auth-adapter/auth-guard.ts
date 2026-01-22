export const getIsPublicRoute = (publicRoutes: PublicRoute[] = []) => {
  const pathname = window?.location?.pathname;
  if (!pathname) return false;

  return publicRoutes.some((route) => {
    let isMatch = false;
    switch (route.method) {
      case "exact":
        isMatch = pathname === route.path;
        break;
      case "includes":
        isMatch = pathname.includes(route.path as string);
        break;
      case "regex":
        isMatch = route.path instanceof RegExp && route.path.test(pathname);
        break;
    }
    return isMatch;
  });
};

// Route configuration types
export type RouteMethod = "exact" | "includes" | "regex";

export interface PublicRoute {
  path: string | RegExp;
  method: RouteMethod;
}

// Default public routes list
export const DEFAULT_PUBLIC_ROUTES: PublicRoute[] = [
  {
    path: "/",
    method: "exact",
  },
  {
    path: "/login",
    method: "exact",
  },
];
