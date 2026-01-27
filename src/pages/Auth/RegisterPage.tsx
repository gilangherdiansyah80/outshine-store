import { useDevice, useHasMounted } from "@/hooks/use-device";
import Loading from "@/components/Loader/Loading";
import RegisterResponsive from "@/container/Register/Responsive/RegisterResponsive";

export default function RegisterPage() {
  const { isMobile } = useDevice();
  const hasMounted = useHasMounted();

  console.log("Rendering RegisterPage, isMobile:", isMobile);

  if (!hasMounted) {
    return <Loading />;
  }

  return <>{isMobile ? <RegisterResponsive /> : <p>Desktop Wishlist</p>}</>;
}
