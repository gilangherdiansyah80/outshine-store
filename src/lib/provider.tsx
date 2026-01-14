"use client";

import { useRef, useEffect } from "react";
import { useBrowserNavigation } from "./browser-navigation";
import { useNavigationActions } from "../hooks/use-responsive-navigation";
import { useNavigationStore } from "./store";
import type { ResponsiveProviderProps } from "./types";
import { ResponsiveSearchParamsSync } from "./url-sync";
import { useDevice } from "../hooks/use-device";

/**
 * Responsive navigation provider that orchestrates all navigation logic.
 * Wraps the application to provide virtual navigation capabilities on mobile.
 */
export const ResponsiveProvider = ({
  children,
  basePath = "/",
}: ResponsiveProviderProps) => {
  const { isMobile } = useDevice();

  const { stack, isHydrated: isNavigationHydrated } = useNavigationStore(
    (state) => ({
      stack: state.stack,
      isHydrated: state.isHydrated,
    })
  );

  const { replace: replaceNavigation, setHasReady: setNavigationHasReady } =
    useNavigationActions();

  const hasCheckedInitial = useRef(false);

  // Handle browser back/forward buttons
  useBrowserNavigation();

  // Initialize navigation state on mobile to sync with current URL or home
  useEffect(() => {
    if (hasCheckedInitial.current || !isMobile || !isNavigationHydrated) return;
    hasCheckedInitial.current = true;

    const currentStack = stack[stack.length - 1];
    if (currentStack?.path !== "/") {
      // Optional: force to home on initial load if needed
    }
    setNavigationHasReady();
  }, [
    stack,
    isMobile,
    isNavigationHydrated,
    replaceNavigation,
    setNavigationHasReady,
  ]);

  return (
    <>
      <ResponsiveSearchParamsSync basePath={basePath} />
      {children}
    </>
  );
};
