// Success.tsx
import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, Loader2 } from "lucide-react";

import { REST } from "@/api/axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Success() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const hasCalled = useRef(false);

  useEffect(() => {
    if (hasCalled.current) return;

    const sessionId = searchParams.get("session_id");

    if (!sessionId) return;

    hasCalled.current = true;

    REST.post("/api/payment/confirm-booking", {
      sessionId,
    })
      .then(() => {
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md rounded-3xl border shadow-xl">
        <CardContent className="flex flex-col items-center text-center p-8 gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Payment Successful
            </h1>
            <p className="text-muted-foreground">
              Your booking has been confirmed successfully.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Redirecting to home page in a few seconds...
          </div>

          <Button className="w-full rounded-xl" onClick={() => navigate("/")}>
            Go to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
