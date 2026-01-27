import { useNavigationStore } from "@outshine/lib/store";
import type { ResponsiveRouteProps } from "@outshine/lib/types";

/**
 * Component that conditionally renders based on current navigation path
 */
export const ResponsiveRoute = ({ path, component }: ResponsiveRouteProps) => {
  const stack = useNavigationStore((state) => state.stack);
  const currentPath = stack[stack.length - 1]?.path || "/";
  const isReady = useNavigationStore((state) => state.isReady);

  const isMatch = path === currentPath;

  if (!isMatch || !isReady) {
    console.log(
      `[ResponsiveRoute] Hidden - path: ${path}, currentPath: ${currentPath}, isReady: ${isReady}`,
    );
    return null;
  }

  return <>{component}</>;
};

ResponsiveRoute.displayName = "ResponsiveRoute";
