import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ROLES } from "@/lib/constant";
import HomePage from "@/pages/user/HomePage";
import AppSkeleton from "@/components/common/AppSkeleton";

const RootRedirect = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <AppSkeleton variant="page" />;
  }

  if (!isAuthenticated || !user) {
    return <HomePage />;
  }

  if (user.role === ROLES.ADMIN) return <Navigate to="/admin" replace />;
  if (user.role === ROLES.SUPERADMIN) {
    return <Navigate to="/superadmin" replace />;
  }
  // if (user.role === ROLES.USER) return <Navigate to="/" replace />;

  return <HomePage />;
};

export default RootRedirect;
