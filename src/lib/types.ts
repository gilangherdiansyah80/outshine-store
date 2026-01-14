import type React from "react";

/**
 * Types for responsive navigation system
 */

export interface StackEntry {
  /** The route path (e.g., "/about") */
  path: string;
  /** The React element to render */
  component?: React.ReactNode;
  /** Optional parameters passed to the route */
  params: Record<string, unknown>;
}

export interface NavigationActions {
  /** Push a new screen to the navigation stack */
  push: (path: string, params?: Record<string, unknown>) => void;
  /** Remove the top screen from the navigation stack */
  pop: () => void;
  /** Pop screens until reaching the specified path */
  popTo: (path: string) => void;
  /** Pop all screens except the first one */
  popToTop: () => void;
  /** Replace the current screen with a new one */
  replace: (path: string, params?: Record<string, unknown>) => void;
}

export interface NavigationState {
  /** Stack of route entries representing the navigation history */
  stack: StackEntry[];
  /** Whether the store has been hydrated from persisted storage */
  isHydrated: boolean;
  /** Whether the navigation system is ready */
  isReady: boolean;
  /** Whether real browser navigation is in progress */
  isDoingRealNavigation: boolean;
  /** Number of navigation attempts (safety mechanism) */
  navigationAttempts: number;
  /** Last navigation timestamp (safety mechanism) */
  lastNavigationTime: number;
  /** Navigation actions */
  actions: NavigationActions & {
    setHasHydrated: () => void;
    setHasReady: () => void;
    setIsDoingRealNavigation: (value: boolean) => void;
    resetNavigationSafety: () => void;
    setNavigationAttempts: (attempts: number) => void;
  };
}

export interface ResponsiveProviderProps {
  children: React.ReactNode;
  basePath?: string;
}

export interface ResponsiveRouteProps {
  path: string;
  component: React.ReactNode;
}

/**
 * Type guards for runtime validation
 */
export const isValidStackEntry = (entry: unknown): entry is StackEntry => {
  return (
    !!entry &&
    typeof entry === "object" &&
    "path" in entry &&
    typeof (entry as { path: unknown }).path === "string" &&
    "params" in entry &&
    typeof (entry as { params: unknown }).params === "object" &&
    (entry as { params: unknown }).params !== null
  );
};
