import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect to welcome but save the current location to redirect back after login
    return (
      <Navigate to="/outshine/welcome" state={{ from: location }} replace />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
