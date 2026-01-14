import { useNavigate } from "react-router-dom";
import { useNavigationStore } from "@outshine/lib/store";
import type { NavigationState } from "@outshine/lib/types";

/**
 * Simple selector hook for navigation state
 */
export const useNavigationState = <T>(
  selector: (state: NavigationState) => T
): T => {
  return useNavigationStore(selector);
};

/**
 * Access the navigation actions
 */
export const useNavigationActions = (): NavigationState["actions"] => {
  return useNavigationStore((s) => s.actions);
};

/**
 * Hook for responsive navigation with router integration
 */
export const useResponsiveNavigation = () => {
  const navigate = useNavigate();
  const {
    push,
    pop: popFromStack,
    popTo,
    popToTop,
    replace,
  } = useNavigationStore((s) => s.actions);
  const stack = useNavigationStore((s) => s.stack);

  const pop = () => {
    if (stack.length > 1) {
      popFromStack();
    } else {
      navigate(-1);
    }
  };

  return {
    push,
    pop,
    popTo,
    popToTop,
    replace,
    stack,
    currentScreen: stack[stack.length - 1],
  };
};

/**
 * Hook to access current route parameters
 */
export const useResponsiveRouteParams = <
  T extends Record<string, unknown> = Record<string, unknown>
>(): T => {
  return useNavigationStore(
    (s) => (s.stack[s.stack.length - 1]?.params as T) || ({} as T)
  );
};
