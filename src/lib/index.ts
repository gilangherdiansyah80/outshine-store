/**
 * Responsive Navigation System Public API
 */

// Core types and interfaces
export type {
  NavigationActions,
  NavigationState,
  ResponsiveProviderProps,
  ResponsiveRouteProps,
  StackEntry,
} from "./types";

// Store access
export { useNavigationStore } from "./store";

// Hooks
export {
  useNavigationActions,
  useNavigationState,
  useResponsiveNavigation,
  useResponsiveRouteParams,
} from "@outshine/hooks/use-responsive-navigation";

// Components
export { ResponsiveRoute } from "./components";
export { ResponsiveProvider } from "./provider";
export { ResponsiveSearchParamsSync } from "./url-sync";
export type { Props as ResponsiveSearchParamsSyncProps } from "./url-sync";

// Utilities
export {
  createScreenSearchParam,
  isValidScreenPath,
  parseScreenSearchParam,
} from "./utils";

// Browser logic
export { useBrowserNavigation } from "./browser-navigation";

// Type guards
export { isValidStackEntry } from "./types";
