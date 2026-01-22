import { useBrowserNavigation } from "@/lib/browser-navigation";
import { ResponsiveSearchParamsSync } from "@/lib/url-sync";
import type { ResponsiveProviderProps } from "@/lib/types";

interface ProviderProps extends ResponsiveProviderProps {
  basePath?: string;
}

/**
 * Responsive navigation provider that orchestrates all navigation logic.
 * Wraps the application to provide virtual navigation capabilities on mobile.
 */
export const ResponsiveProvider = ({
  children,
  basePath = "/",
}: ProviderProps) => {
  useBrowserNavigation();

  return (
    <>
      <ResponsiveSearchParamsSync basePath={basePath} />
      {children}
    </>
  );
};
