import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProceedToPaymentButton from "@/components/booking/ProceedToPaymentButton";

type Props = {
  movieId: string;
  selectedTheatre: any;
  selectedShow: any;
  ticketCount: number;
  setTicketCount: any;
  maxTicketsAllowed: number;
};

export const BookingPanel = ({
  movieId,
  selectedTheatre,
  selectedShow,
  ticketCount,
  setTicketCount,
  maxTicketsAllowed,
}: Props) => {
  if (!selectedShow) return null;

  return (
    <Card className="rounded-3xl border shadow-sm p-6 space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <div className="text-sm text-muted-foreground mb-1">
            Selected Booking
          </div>

          <div className="font-semibold text-lg">
            {selectedTheatre.theatre.name}
          </div>

          <div className="text-sm text-muted-foreground mt-1">
            {new Date(Number(selectedShow.showTime)).toLocaleString("en-IN", {
              weekday: "short",
              day: "numeric",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm text-muted-foreground">Price per ticket</div>
          <div className="text-xl font-bold">₹{selectedShow.price}</div>
        </div>
      </div>

      <div className="border-t" />

      {/* ================= COUNTER ================= */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium">Tickets</div>

          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="outline"
              size="icon"
              disabled={ticketCount <= 1}
              onClick={() => setTicketCount((p: number) => Math.max(1, p - 1))}
            >
              -
            </Button>

            <div className="w-10 text-center font-semibold">{ticketCount}</div>

            <Button
              variant="outline"
              size="icon"
              disabled={ticketCount >= maxTicketsAllowed}
              onClick={() =>
                setTicketCount((p: number) =>
                  Math.min(p + 1, maxTicketsAllowed),
                )
              }
            >
              +
            </Button>
          </div>

          <div className="text-xs text-muted-foreground mt-2">
            Max allowed: {maxTicketsAllowed}
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm text-muted-foreground">Total</div>
          <div className="text-2xl font-bold">
            ₹{selectedShow.price * ticketCount}
          </div>
        </div>
      </div>

      {/* ================= CTA (STRIPE) ================= */}
      <ProceedToPaymentButton
        movieId={movieId}
        showId={selectedShow.id}
        theatreId={selectedTheatre.theatre.id}
        ticketCount={ticketCount}
        pricePerTicket={selectedShow.price}
        disabled={selectedShow.availableSeats <= 0}
      />
    </Card>
  );
};
