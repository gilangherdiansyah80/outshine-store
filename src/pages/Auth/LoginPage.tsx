import { useDevice, useHasMounted } from "@/hooks/use-device";
import Loading from "@/components/Loader/Loading";
import LoginResponsive from "@/container/Login/Responsive/LoginResponsive";

export default function LoginPage() {
  const { isMobile } = useDevice();
  const hasMounted = useHasMounted();

  console.log("Rendering LoginPage, isMobile:", isMobile);

  if (!hasMounted) {
    return <Loading />;
  }

  return <>{isMobile ? <LoginResponsive /> : <p>Desktop Wishlist</p>}</>;
}
