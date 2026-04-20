import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  clearPaymentState,
  createCheckoutSession,
} from "@/store/payment/paymentSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type Props = {
  movieId: string;
  showId: string;
  theatreId: string;
  ticketCount: number;
  pricePerTicket: number;
  disabled?: boolean;
};

const ProceedToPaymentButton = ({
  movieId,
  showId,
  theatreId,
  ticketCount,
  pricePerTicket,
  disabled,
}: Props) => {
  const dispatch = useAppDispatch();

  const { loading, checkoutUrl } = useAppSelector((state) => state.payment);

  const handlePayment = async () => {
    const resultAction = await dispatch(
      createCheckoutSession({
        movieId,
        showId,
        theatreId,
        ticketCount,
      }),
    );

    if (createCheckoutSession.rejected.match(resultAction)) {
      alert(resultAction.payload || "Payment failed");
    }
  };

  useEffect(() => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
      dispatch(clearPaymentState());
    }
  }, [checkoutUrl, dispatch]);

  return (
    <Button
      className="w-full h-12 text-base font-semibold"
      disabled={disabled || loading}
      onClick={handlePayment}
    >
      {loading
        ? "Redirecting..."
        : `Proceed • ${ticketCount} Ticket${ticketCount > 1 ? "s" : ""} • ₹${
            pricePerTicket * ticketCount
          }`}
    </Button>
  );
};

export default ProceedToPaymentButton;
