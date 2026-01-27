import { useLocation } from "react-router-dom";
import { useNavigationState } from "@outshine/hooks/use-responsive-navigation.ts";
import { cn } from "@outshine/lib/utils.ts";
import ResponsiveHeader from "./ResponsiveHeader";
import ResponsiveFooter from "./ResponsiveFooter";

interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

const ResponsiveLayout = ({ children }: ResponsiveLayoutProps) => {
  const stack = useNavigationState((s) => s.stack);
  const { pathname } = useLocation();
  const currentPath = stack[stack.length - 1]?.path;

  // Hide header/footer for filter, sort, and detail product pages
  const isFullScreen =
    currentPath === "/filter" ||
    currentPath === "/sort" ||
    pathname?.includes("/cart") ||
    pathname?.includes("/checkout") ||
    pathname?.includes("/outshine/product/");

  const hideHeader =
    isFullScreen ||
    pathname?.includes("/outshine/orders") ||
    pathname?.includes("/outshine/setting");
  const hideFooter = isFullScreen || pathname?.includes("/outshine/setting");

  return (
    <main
      className={cn(
        "transition-all duration-300",
        !hideHeader ? "pt-16" : "pt-0",
        !hideFooter ? "pb-24" : "pb-0",
      )}
    >
      {!hideHeader && <ResponsiveHeader />}
      {children}
      {!hideFooter && <ResponsiveFooter />}
    </main>
  );
};

export default ResponsiveLayout;
