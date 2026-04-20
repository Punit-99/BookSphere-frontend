import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export const SelectBookingTreatre = ({
  theatres,
  selectedTheatre,
  setSelectedTheatre,
  setSelectedShow,
  setTicketCount,
}: any) => {
  return (
    <Card className="rounded-3xl border shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <MapPin className="w-5 h-5" />
        <h2 className="text-xl font-semibold">Select Theatre</h2>
      </div>

      {(!theatres || theatres.length === 0) && (
        <div className="border rounded-2xl p-6 text-center text-muted-foreground">
          No theatres available for this movie right now.
        </div>
      )}

      <div className="space-y-3">
        {theatres?.map((t: any) => {
          const isSelected = selectedTheatre?.theatre?.id === t.theatre.id;

          return (
            <button
              key={t.theatre.id}
              onClick={() => {
                setSelectedTheatre(t);
                setSelectedShow(null);
                setTicketCount(1);
              }}
              className={`w-full rounded-2xl border p-5 text-left transition-all ${
                isSelected
                  ? "border-black bg-black text-white shadow-md"
                  : "border-gray-200 hover:border-black hover:shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold">{t.theatre.name}</div>

                  <div
                    className={`text-sm mt-1 ${
                      isSelected ? "text-gray-300" : "text-muted-foreground"
                    }`}
                  >
                    {t.theatre.city}, {t.theatre.state}
                  </div>
                </div>

                <div
                  className={`text-xs px-3 py-1 rounded-full border ${
                    isSelected
                      ? "border-gray-700 text-gray-300"
                      : "border-gray-200 text-muted-foreground"
                  }`}
                >
                  {t.shows?.length || 0} shows
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
};
