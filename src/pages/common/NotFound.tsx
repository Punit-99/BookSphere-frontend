import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md rounded-2xl shadow-lg border border-border">
        <CardContent className="flex flex-col items-center text-center p-8 space-y-5">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
            <p className="text-muted-foreground text-sm">
              The page you are looking for does not exist or may have been
              moved.
            </p>
            <p className="text-sm text-muted-foreground">
              Redirecting you to the home page in 3 seconds...
            </p>
          </div>

          <Button onClick={() => navigate("/")} className="w-full">
            Go to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
