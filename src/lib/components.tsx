"use client";

import React from "react";
import { useNavigationStore } from "./store";
import type { ResponsiveRouteProps } from "./types";

/**
 * Component that conditionally renders based on current navigation path
 */
export const ResponsiveRoute = React.memo(
  ({ path, component }: ResponsiveRouteProps) => {
    const { currentPath, isReady } = useNavigationStore((state) => ({
      currentPath: state.stack[state.stack.length - 1]?.path,
      isReady: state.isReady,
    }));

    if (path !== currentPath || !isReady) return null;

    return <>{component}</>; // Wrapping in fragment to be safe
  },
  (prevProps, nextProps) => {
    // Custom comparison function for optimal performance
    return (
      prevProps.path === nextProps.path &&
      prevProps.component === nextProps.component
    );
  }
);

ResponsiveRoute.displayName = "ResponsiveRoute";
