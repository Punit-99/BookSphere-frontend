import { Card } from "@/components/ui/card";
import { Film, Ticket } from "lucide-react";

export const SelectBookingShow = ({
  selectedTheatre,
  selectedShow,
  setSelectedShow,
  setTicketCount,
}: any) => {
  if (!selectedTheatre) return null;

  return (
    <Card className="rounded-3xl border shadow-sm p-6">
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-5">
        <Film className="w-5 h-5" />
        <h2 className="text-xl font-semibold">Select Show</h2>
      </div>

      {/* EMPTY STATE */}
      {(!selectedTheatre.shows || selectedTheatre.shows.length === 0) && (
        <div className="border rounded-2xl p-6 text-center text-muted-foreground">
          No shows available for this theatre.
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedTheatre.shows?.map((show: any) => {
          const isSelected = selectedShow?.id === show.id;
          const isSoldOut = show.availableSeats <= 0;

          return (
            <button
              key={show.id}
              disabled={isSoldOut}
              onClick={() => {
                if (isSoldOut) return;
                setSelectedShow(show);
                setTicketCount?.(1); // 👈 keep reset behavior
              }}
              className={`rounded-2xl border p-5 text-left transition-all ${
                isSoldOut
                  ? "opacity-50 cursor-not-allowed border-gray-200"
                  : isSelected
                    ? "bg-black text-white border-black shadow-md"
                    : "border-gray-200 hover:border-black hover:shadow-sm"
              }`}
            >
              {/* TOP ROW */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-lg">
                    {new Date(Number(show.showTime)).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>

                  <Ticket className="w-4 h-4" />
                </div>

                {/* DATE */}
                <div
                  className={`text-sm ${
                    isSelected ? "text-gray-300" : "text-muted-foreground"
                  }`}
                >
                  {new Date(Number(show.showTime)).toLocaleDateString("en-IN", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
                </div>

                {/* PRICE */}
                <div className="flex items-center justify-between text-sm">
                  <span>Price</span>
                  <span className="font-semibold">₹{show.price}</span>
                </div>

                {/* SEATS */}
                <div className="flex items-center justify-between text-sm">
                  <span>Seats Left</span>
                  <span className="font-semibold">
                    {isSoldOut ? "Sold Out" : show.availableSeats}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
};
