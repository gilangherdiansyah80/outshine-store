import { useDevice } from "@outshine/hooks/use-device";
import { Outlet } from "react-router-dom";
import DesktopLayout from "@outshine/container/Layout/DesktopLayout/DesktopLayout";
import ResponsiveLayout from "@outshine/container/Layout/ResponsiveLayout/ResponsiveLayout";
import { ResponsiveProvider } from "@outshine/lib/provider";

const MainLayout = () => {
  const { isMobile, mounted } = useDevice();

  if (!mounted) return null; // Avoid hydration mismatch

  return isMobile ? (
    <ResponsiveProvider basePath="/outshine">
      <ResponsiveLayout>
        <Outlet />
      </ResponsiveLayout>
    </ResponsiveProvider>
  ) : (
    <DesktopLayout>
      <Outlet />
    </DesktopLayout>
  );
};

export default MainLayout;
