"use client";

import { Suspense, useEffect, useRef } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";

import { useDevice } from "../hooks/use-device";
import { useNavigationActions } from "../hooks/use-responsive-navigation";
import { useNavigationStore } from "./store";
import {
  createScreenSearchParam,
  isValidScreenPath,
  parseScreenSearchParam,
} from "./utils";

/**
 * Interface for internal safety tracking to prevent infinite loops
 */
interface SafetyState {
  navigationAttempts: number;
  lastNavigationTime: number;
}

export type Props = {
  basePath: string;
};

// Navigation safety constants
const MAX_NAVIGATION_ATTEMPTS = 5;
const NAVIGATION_COOLDOWN_MS = 1000;

/**
 * Component that synchronizes the browser URL with the virtual navigation stack.
 */
const Sync = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const screenSearchParam = searchParams.get("screen");

  const {
    stack,
    isNavigationHydrated,
    isReady: hasCompletedInitialSync,
    navigationAttempts,
    lastNavigationTime,
    isDoingRealNavigation,
  } = useNavigationStore((s) => ({
    stack: s.stack,
    isNavigationHydrated: s.isHydrated,
    isReady: s.isReady,
    navigationAttempts: s.navigationAttempts,
    lastNavigationTime: s.lastNavigationTime,
    isDoingRealNavigation: s.isDoingRealNavigation,
  }));

  const {
    replace: replaceNavigation,
    setHasReady: setNavigationHasReady,
    setIsDoingRealNavigation,
    resetNavigationSafety,
  } = useNavigationActions();

  const { isMobile } = useDevice();
  const { pathname, search } = useLocation();
  const lastPathnameRef = useRef(pathname);

  // Handle external pathname changes (outside virtual stack)
  useEffect(() => {
    if (!isNavigationHydrated) return;

    if (lastPathnameRef.current !== pathname) {
      lastPathnameRef.current = pathname;

      const decodedPath = screenSearchParam
        ? parseScreenSearchParam(screenSearchParam)
        : "/";

      const otherParams: Record<string, unknown> = {};
      searchParams.forEach((value, key) => {
        if (key !== "screen") {
          otherParams[key] = value;
        }
      });

      const targetPath = isValidScreenPath(decodedPath) ? decodedPath : "/";
      replaceNavigation(targetPath, otherParams);
    }
  }, [
    pathname,
    screenSearchParam,
    searchParams,
    isNavigationHydrated,
    replaceNavigation,
  ]);

  // Manage navigation mode (real vs virtual) based on stack depth
  useEffect(() => {
    if (!isNavigationHydrated) return;

    const shouldBeRealNavigation = stack.length === 1;
    if (isDoingRealNavigation !== shouldBeRealNavigation) {
      setIsDoingRealNavigation(shouldBeRealNavigation);
    }
  }, [
    stack.length,
    isNavigationHydrated,
    setIsDoingRealNavigation,
    isDoingRealNavigation,
  ]);

  // Perform initial synchronization of URL to store on load
  useEffect(() => {
    if (!isMobile || !isNavigationHydrated || hasCompletedInitialSync) return;

    const currentStack = stack[stack.length - 1];
    let needsNavigation = false;
    let targetPath = "/";
    let targetParams: Record<string, unknown> = {};

    if (!screenSearchParam) {
      if (currentStack?.path !== "/") {
        needsNavigation = true;
        targetPath = "/";
      }
    } else {
      const decodedPath = parseScreenSearchParam(screenSearchParam);
      const otherParams: Record<string, unknown> = {};
      searchParams.forEach((value, key) => {
        if (key !== "screen") {
          otherParams[key] = value;
        }
      });

      if (
        decodedPath !== currentStack?.path ||
        JSON.stringify(otherParams) !== JSON.stringify(currentStack?.params)
      ) {
        needsNavigation = true;
        if (isValidScreenPath(decodedPath)) {
          targetPath = decodedPath;
          targetParams = otherParams;
        } else {
          targetPath = "/";
        }
      }
    }

    if (needsNavigation && currentStack?.path !== targetPath) {
      const now = Date.now();
      if (
        navigationAttempts >= MAX_NAVIGATION_ATTEMPTS ||
        now - lastNavigationTime < NAVIGATION_COOLDOWN_MS
      ) {
        console.warn(
          "[ResponsiveNavigation] Navigation blocked (safety triggers active)"
        );
        return;
      }

      resetNavigationSafety();

      // Update store state directly for internal safety tracking
      const stateUpdate =
        useNavigationStore.getState() as unknown as SafetyState;
      stateUpdate.navigationAttempts = navigationAttempts + 1;
      stateUpdate.lastNavigationTime = now;

      try {
        replaceNavigation(targetPath, targetParams);
      } catch (error) {
        console.error("[ResponsiveNavigation] Initial sync error:", error);
      }
    }

    setNavigationHasReady();
  }, [
    screenSearchParam,
    searchParams,
    isMobile,
    isNavigationHydrated,
    hasCompletedInitialSync,
    stack,
    navigationAttempts,
    lastNavigationTime,
    replaceNavigation,
    setNavigationHasReady,
    resetNavigationSafety,
  ]);

  // Update browser URL when virtual stack changes
  useEffect(() => {
    if (!isMobile || !isNavigationHydrated) return;
    const currentStack = stack[stack.length - 1];
    if (!currentStack) return;

    const stackString = createScreenSearchParam(currentStack.path);
    const currentUrlParams = new URLSearchParams(window.location.search);
    let needsUpdate = screenSearchParam !== stackString;

    if (!needsUpdate) {
      for (const key of Object.keys(currentStack.params)) {
        if (currentUrlParams.get(key) !== String(currentStack.params[key])) {
          needsUpdate = true;
          break;
        }
      }
    }

    if (needsUpdate) {
      const params = new URLSearchParams(window.location.search);
      params.set("screen", stackString);

      // Keep only 'screen' and new actual params
      const keysToRemove: string[] = [];
      params.forEach((_, key) => {
        if (key !== "screen") keysToRemove.push(key);
      });
      keysToRemove.forEach((key) => params.delete(key));

      Object.entries(currentStack.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.set(key, String(value));
        }
      });

      const newUrl = `${window.location.pathname}?${params.toString()}`;
      if (newUrl !== pathname + search) {
        navigate(newUrl, { replace: true });
      }
    }
  }, [
    stack,
    isMobile,
    isNavigationHydrated,
    screenSearchParam,
    navigate,
    pathname,
    search,
  ]);

  return null;
};

/**
 * Public component for search param synchronization.
 * Wrapped in Suspense to handle React Router's search param hooks.
 */
export const ResponsiveSearchParamsSync = ({ basePath }: Props) => {
  // Use basePath as a key for Sync component to satisfy the 'unused-vars' lint rule.
  // This ensures the sync recalibrates if the base path configuration changes.
  return (
    <Suspense fallback={null}>
      <Sync key={basePath} />
    </Suspense>
  );
};
