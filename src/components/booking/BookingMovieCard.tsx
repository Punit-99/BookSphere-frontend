import { Card } from "@/components/ui/card";
import { CalendarDays, Clock3 } from "lucide-react";

export const BookingMovieCard = ({ movie, formattedReleaseDate }: any) => {
  return (
    <div className="xl:col-span-1">
      <Card className="overflow-hidden rounded-3xl border shadow-sm">
        <img
          src={movie.poster?.[0]}
          alt={movie.title}
          className="w-full h-[420px] object-cover object-center"
        />

        <div className="p-6 space-y-5">
          <h1 className="text-3xl font-bold">{movie.title}</h1>

          <p className="text-sm text-muted-foreground leading-6">
            {movie.description}
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border p-3 space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wide">
                <Clock3 className="w-4 h-4" />
                Duration
              </div>
              <div className="font-semibold">{movie.duration} mins</div>
            </div>

            <div className="rounded-2xl border p-3 space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wide">
                <CalendarDays className="w-4 h-4" />
                Release
              </div>
              <div className="font-semibold">{formattedReleaseDate}</div>
            </div>
          </div>

          {/* ================= RESTORED ================= */}
          <div className="space-y-3">
            <div>
              <div className="text-xs uppercase text-muted-foreground mb-2">
                Languages
              </div>

              <div className="flex flex-wrap gap-2">
                {movie.language?.map((lang: string) => (
                  <span
                    key={lang}
                    className="px-3 py-1 rounded-full bg-muted text-sm"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase text-muted-foreground mb-2">
                Genres
              </div>

              <div className="flex flex-wrap gap-2">
                {movie.genre?.map((genre: string) => (
                  <span
                    key={genre}
                    className="px-3 py-1 rounded-full bg-muted text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
