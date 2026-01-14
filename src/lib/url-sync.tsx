"use client";

import { Suspense, useEffect, useRef } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";

import { useDevice } from "@outshine/hooks/use-device";
import { useNavigationActions } from "@outshine/hooks/use-responsive-navigation";
import { useNavigationStore } from "@outshine/lib/store";
import { isValidScreenPath, parseScreenSearchParam } from "@outshine/lib/utils";

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
  } = useNavigationStore((s) => ({
    stack: s.stack,
    isNavigationHydrated: s.isHydrated,
    isReady: s.isReady,
  }));

  const { replace: replaceNavigation, setHasReady: setNavigationHasReady } =
    useNavigationActions();

  const { isMobile } = useDevice();
  const { pathname, search } = useLocation();

  // Refs to prevent circular updates
  const isUpdatingFromUrl = useRef(false);
  const isUpdatingFromStack = useRef(false);
  const hasInitialized = useRef(false);

  // Get current stack path for comparison
  const currentStackPath = stack[stack.length - 1]?.path ?? "/";
  // Stringify params for stable comparison in effect dependencies
  const currentStackParamsJson = JSON.stringify(
    stack[stack.length - 1]?.params ?? {}
  );

  // Initial sync effect - runs once when hydrated
  useEffect(() => {
    if (!isMobile || !isNavigationHydrated || hasInitialized.current) return;
    hasInitialized.current = true;

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
  }, [
    isMobile,
    isNavigationHydrated,
    screenSearchParam,
    currentStackPath,
    replaceNavigation,
    setNavigationHasReady,
  ]);

  // Sync URL to match stack (when stack changes from user navigation)
  useEffect(() => {
    // Skip if not mobile, not hydrated, or if we're updating from URL
    if (!isMobile || !isNavigationHydrated || !hasCompletedInitialSync) return;
    if (isUpdatingFromUrl.current) return;

    const urlScreenPath = screenSearchParam ?? "";

    // Only update URL if stack path is different from URL
    if (urlScreenPath === currentStackPath) return;

    // Prevent this from triggering URL->stack sync
    isUpdatingFromStack.current = true;

    // Build new URL
    const params = new URLSearchParams();
    params.set("screen", currentStackPath);

    // Parse params from JSON string
    const currentStackParams = JSON.parse(currentStackParamsJson) as Record<
      string,
      unknown
    >;
    Object.entries(currentStackParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.set(key, String(value));
      }
    });

    const newUrl = `${pathname}?${params.toString()}`;
    const currentUrl = pathname + search;

    if (newUrl !== currentUrl) {
      navigate(newUrl, { replace: true });
    }

    // Reset flag after navigation completes
    setTimeout(() => {
      isUpdatingFromStack.current = false;
    }, 0);
  }, [
    currentStackPath,
    currentStackParamsJson,
    isMobile,
    isNavigationHydrated,
    hasCompletedInitialSync,
    screenSearchParam,
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

    // Only update stack if URL path is different
    if (urlScreenPath === currentStackPath) return;
    if (!isValidScreenPath(urlScreenPath)) return;

    // Prevent this from triggering stack->URL sync
    isUpdatingFromUrl.current = true;

    const otherParams: Record<string, unknown> = {};
    searchParams.forEach((value, key) => {
      if (key !== "screen") {
        otherParams[key] = value;
      }
    });

    replaceNavigation(urlScreenPath, otherParams);

    // Reset flag after state update
    setTimeout(() => {
      isUpdatingFromUrl.current = false;
    }, 0);
  }, [
    screenSearchParam,
    searchParams,
    currentStackPath,
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
