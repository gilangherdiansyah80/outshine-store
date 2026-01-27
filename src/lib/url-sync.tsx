"use client";

import { Suspense, useEffect, useRef, useMemo } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

import { useDevice } from "@/hooks/use-device";
import { useNavigationActions } from "@/hooks/use-responsive-navigation";
import { useNavigationStore } from "@/lib/store";
import { isValidScreenPath, parseScreenSearchParam } from "@/lib/utils";
import type { NavigationState } from "@/lib/types";

export type Props = {
  basePath: string;
};

/**
 * Component that synchronizes the browser URL with the virtual navigation stack.
 * Uses refs to prevent circular updates between URL and store.
 */
const Sync = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const screenSearchParam = searchParams.get("screen");

  const {
    stack,
    isNavigationHydrated,
    isReady: hasCompletedInitialSync,
  } = useNavigationStore(
    useShallow((s: NavigationState) => ({
      stack: s.stack,
      isNavigationHydrated: s.isHydrated,
      isReady: s.isReady,
    })),
  );

  const { replace: replaceNavigation, setHasReady: setNavigationHasReady } =
    useNavigationActions();

  const { isMobile } = useDevice();
  const { pathname, search } = useLocation();

  // Refs to prevent circular updates
  const isUpdatingFromUrl = useRef(false);
  const isUpdatingFromStack = useRef(false);

  // Get current stack path and params for comparison
  const currentStackEntry = stack[stack.length - 1];
  const currentStackPath = currentStackEntry?.path ?? "/";
  const currentStackParams = useMemo(
    () => currentStackEntry?.params ?? {},
    [currentStackEntry],
  );

  // Initial sync effect - runs when hydrated or when top-level pathname changes
  useEffect(() => {
    if (!isMobile || !isNavigationHydrated) return;

    // Decode screen param from URL
    const urlScreenPath = screenSearchParam
      ? parseScreenSearchParam(screenSearchParam)
      : "/";

    // If URL has a valid screen that's different from stack, sync store to URL
    if (
      isValidScreenPath(urlScreenPath) &&
      urlScreenPath !== currentStackPath
    ) {
      isUpdatingFromUrl.current = true;
      replaceNavigation(urlScreenPath, {});
      // Reset flag after a tick
      setTimeout(() => {
        isUpdatingFromUrl.current = false;
      }, 0);
    }

    setNavigationHasReady();
    // currentStackPath omitted to prevent reverting purposeful stack changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isMobile,
    isNavigationHydrated,
    screenSearchParam,
    pathname,
    search,
    replaceNavigation,
    setNavigationHasReady,
  ]);

  // Sync URL to match stack (when stack changes from user navigation)
  useEffect(() => {
    // Skip if not mobile, not hydrated, or if we're updating from URL
    if (!isMobile || !isNavigationHydrated || !hasCompletedInitialSync) return;
    if (isUpdatingFromUrl.current) return;

    // Build params from stack
    const newParams = new URLSearchParams();
    newParams.set("screen", currentStackPath);

    // Add extra params from stack, sorted by key for stability
    const keys = Object.keys(currentStackParams).sort();
    keys.forEach((key) => {
      const value = currentStackParams[key];
      if (value !== undefined && value !== null) {
        newParams.set(key, String(value));
      }
    });

    const newSearch = `?${newParams.toString()}`;
    // Compare new search string with current search string stably
    const currentSearch = search;

    // Only update URL if something is actually different
    if (newSearch !== currentSearch) {
      isUpdatingFromStack.current = true;
      navigate(`${pathname}${newSearch}`, { replace: true });

      // Reset ref in a microtask
      setTimeout(() => {
        isUpdatingFromStack.current = false;
      }, 0);
    }
  }, [
    currentStackPath,
    currentStackParams,
    isMobile,
    isNavigationHydrated,
    hasCompletedInitialSync,
    navigate,
    pathname,
    search,
  ]);

  // Sync stack to match URL (when URL changes from browser navigation)
  useEffect(() => {
    // Skip if not mobile, not hydrated, or if we're updating from stack
    if (!isMobile || !isNavigationHydrated || !hasCompletedInitialSync) return;
    if (isUpdatingFromStack.current) return;

    const urlScreenPath = screenSearchParam
      ? parseScreenSearchParam(screenSearchParam)
      : "/";

    // Extract other params from searchParams
    const otherParams: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      if (key !== "screen") {
        otherParams[key] = value;
      }
    });

    // Check if stack already matches URL to prevent loops
    const paramsMatch =
      JSON.stringify(otherParams) === JSON.stringify(currentStackParams);
    if (urlScreenPath === currentStackPath && paramsMatch) return;

    if (!isValidScreenPath(urlScreenPath)) return;

    // Prevent this from triggering stack->URL sync
    isUpdatingFromUrl.current = true;

    replaceNavigation(urlScreenPath, otherParams);

    // Reset flag after state update
    setTimeout(() => {
      isUpdatingFromUrl.current = false;
    }, 0);
    setNavigationHasReady();
    // currentStackPath/Params omitted to prevent reverting purposeful stack changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    screenSearchParam,
    searchParams,
    isMobile,
    isNavigationHydrated,
    hasCompletedInitialSync,
    replaceNavigation,
  ]);

  return null;
};

/**
 * Public component for search param synchronization.
 * Wrapped in Suspense to handle React Router's search param hooks.
 */
export const ResponsiveSearchParamsSync = ({ basePath }: Props) => {
  return (
    <Suspense fallback={null}>
      <Sync key={basePath} />
    </Suspense>
  );
};
