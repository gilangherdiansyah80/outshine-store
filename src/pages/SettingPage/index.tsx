import { useDevice, useHasMounted } from "@/hooks/use-device";
import SettingResponsive from "@/container/Setting/Responsive/SettingResponsive";
import Loading from "@/components/Loader/Loading";

export default function SettingPage() {
  const { isMobile } = useDevice();
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return <Loading />;
  }

  return <>{isMobile ? <SettingResponsive /> : <p>Desktop Setting</p>}</>;
}
