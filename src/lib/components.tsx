"use client";

import React from "react";
import { useNavigationStore } from "@outshine/lib/store";
import type { ResponsiveRouteProps } from "@outshine/lib/types";

/**
 * Component that conditionally renders based on current navigation path
 */
export const ResponsiveRoute = ({ path, component }: ResponsiveRouteProps) => {
  const currentPath = useNavigationStore(
    (state) => state.stack[state.stack.length - 1]?.path
  );
  const isReady = useNavigationStore((state) => state.isReady);

  // If sync is disabled, we might want to treat isReady as true or fix the store initialization
  // For now, let's allow rendering if path matches
  if (path !== currentPath || !isReady) return null;

  return <>{component}</>;
};

ResponsiveRoute.displayName = "ResponsiveRoute";
