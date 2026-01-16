import { useDevice, useHasMounted } from "@/hooks/use-device";
import HomeResponsive from "@/container/Home/Responsive/HomeResponsive";

import Loading from "@/components/Loader/Loading";

export default function HomePage() {
  const { isMobile } = useDevice();
  const hasMounted = useHasMounted();

  // Render null on server to avoid hydration mismatch
  if (!hasMounted) {
    return <Loading />;
  }

  return <>{isMobile ? <HomeResponsive /> : <p>Desktop</p>}</>;
}
