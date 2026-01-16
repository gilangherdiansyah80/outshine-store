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
    pathname?.includes("/wishlist") ||
    pathname?.includes("/product/saas/") ||
    pathname?.includes("/product/template/");

  return (
    <main
      className={cn(
        "transition-all duration-300",
        !isFullScreen ? "pt-16 pb-24" : "pt-0 pb-0"
      )}
    >
      {!isFullScreen && <ResponsiveHeader />}
      {children}
      {!isFullScreen && <ResponsiveFooter />}
    </main>
  );
};

export default ResponsiveLayout;
