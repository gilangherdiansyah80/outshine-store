import { useEffect } from "react";
import { useNavigationActions } from "@/hooks/use-responsive-navigation";
import { useNavigationStore } from "@/store/navigationStore";
import { parseScreenSearchParam } from "@/lib/utils";
import { useDevice } from "@/hooks/use-device";

/**
 * Hook to handle browser back/forward navigation
 * Syncs the browser URL with the virtual navigation stack on mobile.
 */
export const useBrowserNavigation = () => {
  const { popTo, replace, setIsDoingRealNavigation } = useNavigationActions();
  const { isMobile } = useDevice();

  useEffect(() => {
    // Browser navigation syncing only needed on mobile where we have virtual stack
    if (!isMobile) return;

    const handlePopState = () => {
      try {
        const state = useNavigationStore.getState();

        // If we're doing a real navigation (e.g. from router.back()), don't interfere
        if (state.isDoingRealNavigation) {
          setIsDoingRealNavigation(false);
          return;
        }

        const searchParams = new URLSearchParams(window.location.search);
        const newScreen = searchParams.get("screen") ?? "/";
        const decodedScreen = parseScreenSearchParam(newScreen);

        const currentStack = state.stack;
        const topOfStackPath = currentStack[currentStack.length - 1]?.path;

        // Only sync if the URL state is different from the stack state
        if (decodedScreen !== topOfStackPath) {
          // Check if the target screen exists in our stack
          const targetIndex = currentStack.findIndex(
            (entry) => entry.path === decodedScreen,
          );

          if (targetIndex !== -1) {
            // If target exists in stack, pop to it
            popTo(decodedScreen);
          } else {
            // If target doesn't exist in stack, it means we went back beyond our virtual navigation
            // Reset to the target screen or home
            replace(decodedScreen);
          }
        }
      } catch (error) {
        console.error("[ResponsiveNavigation] Popstate handler error:", error);
        // Reset to safe home state on error
        replace("/");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isMobile, popTo, replace, setIsDoingRealNavigation]);
};
