// PaymentFailed.tsx
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PaymentFailed() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md rounded-3xl border shadow-xl">
        <CardContent className="flex flex-col items-center text-center p-8 gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-10 w-10 text-red-500" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-red-500">
              Payment Cancelled
            </h1>
            <p className="text-muted-foreground">
              Your payment was not completed. You can try booking again.
            </p>
          </div>

          <div className="flex w-full gap-3">
            <Button
              variant="outline"
              className="flex-1 rounded-xl"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>

            <Button className="flex-1 rounded-xl" onClick={() => navigate("/")}>
              Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
