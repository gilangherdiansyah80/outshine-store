import { useDevice, useHasMounted } from "@/hooks/use-device";
import SettingResponsive from "@/container/Setting/Responsive/SettingResponsive";
import Loading from "@/components/Loader/Loading";
import SettingWeb from "@/container/Setting/Web/SettingWeb";

export default function SettingPage() {
  const { isMobile } = useDevice();
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return <Loading />;
  }

  return <>{isMobile ? <SettingResponsive /> : <SettingWeb />}</>;
}
