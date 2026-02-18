import { useLocation } from "react-router-dom";
import DesktopHeader from "./DesktopHeader";
import DesktopFooter from "./DesktopFooter";
import { cn } from "@outshine/lib/utils";

const DesktopLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/outshine/welcome" ||
    location.pathname === "/outshine/login" ||
    location.pathname.startsWith("/outshine/register");

  return (
    <main className={cn(!isAuthPage && "pt-28")}>
      {!isAuthPage && <DesktopHeader />}
      {children}
      {!isAuthPage && <DesktopFooter />}
    </main>
  );
};

export default DesktopLayout;
