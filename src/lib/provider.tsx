// import { useBrowserNavigation } from "@outshine/lib/browser-navigation";
import type { ResponsiveProviderProps } from "@outshine/lib/types";
// import { ResponsiveSearchParamsSync } from "@outshine/lib/url-sync";

/**
 * Responsive navigation provider that orchestrates all navigation logic.
 * Wraps the application to provide virtual navigation capabilities on mobile.
 *
 * TEMPORARILY DISABLED: URL sync and browser navigation to debug infinite loop.
 */
export const ResponsiveProvider = ({ children }: ResponsiveProviderProps) => {
  // TEMPORARILY DISABLED: Handle browser back/forward buttons
  // useBrowserNavigation();

  return (
    <>
      {/* TEMPORARILY DISABLED: URL sync component */}
      {/* <ResponsiveSearchParamsSync basePath={basePath} /> */}
      {children}
    </>
  );
};
