import { useDevice } from "@outshine/hooks/use-device";
import { Outlet, useLocation } from "react-router-dom";
import DesktopLayout from "@outshine/container/Layout/DesktopLayout/DesktopLayout";
import ResponsiveLayout from "@outshine/container/Layout/ResponsiveLayout/ResponsiveLayout";
import { ResponsiveProvider } from "@outshine/lib/provider";
import { useLoadingStore } from "@/store/loadingStore";
import { AuthProvider } from "@/lib/auth";
import Loading from "@/components/Loader/Loading";
import { useEffect } from "react";

const MainLayout = () => {
  const { isMobile, mounted } = useDevice();
  const { isLoading, setRouteLoading } = useLoadingStore();
  const location = useLocation();

  // Simulate loading on route change and reset scroll position
  useEffect(() => {
    window.scrollTo(0, 0);
    setRouteLoading(true);
    const timer = setTimeout(() => {
      setRouteLoading(false);
    }, 600); // Smooth transition duration

    return () => clearTimeout(timer);
  }, [location.pathname, setRouteLoading]);

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <AuthProvider>
      {isLoading && <Loading />}
      {isMobile ? (
        <ResponsiveProvider basePath="/outshine">
          <ResponsiveLayout>
            <Outlet />
          </ResponsiveLayout>
        </ResponsiveProvider>
      ) : (
        <DesktopLayout>
          <Outlet />
        </DesktopLayout>
      )}
    </AuthProvider>
  );
};

export default MainLayout;
