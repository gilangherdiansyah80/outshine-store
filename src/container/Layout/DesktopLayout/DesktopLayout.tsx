import DesktopHeader from "./DesktopHeader";
import DesktopFooter from "./DesktopFooter";

const DesktopLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="pt-28">
      <DesktopHeader />
      {children}
      <DesktopFooter />
    </main>
  );
};

export default DesktopLayout;
