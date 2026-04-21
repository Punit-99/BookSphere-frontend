import { ShieldAlert, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { ROLES } from "@/lib/constant";

const Unauthorized = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleRedirect = () => {
    if (!user) {
      navigate("/");
      return;
    }

    switch (user.role) {
      case ROLES.USER:
        navigate("/");
        break;

      case ROLES.ADMIN:
        navigate("/admin");
        break;

      case ROLES.SUPERADMIN:
        navigate("/superadmin");
        break;

      default:
        navigate("/");
    }
  };

  const getButtonText = () => {
    if (!user) return "Go Home";

    switch (user.role) {
      case ROLES.ADMIN:
        return "Go to Admin Dashboard";

      case ROLES.SUPERADMIN:
        return "Go to Super Admin Dashboard";

      default:
        return "Go Home";
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <Card className="w-full max-w-md border-destructive/20 shadow-xl">
        <CardContent className="flex flex-col items-center space-y-6 p-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <ShieldAlert className="h-8 w-8 text-destructive" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              403 Unauthorized
            </h1>

            <p className="text-sm text-muted-foreground">
              You do not have permission to access this page.
            </p>
          </div>

          <Button onClick={handleRedirect} className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {getButtonText()}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Unauthorized;
