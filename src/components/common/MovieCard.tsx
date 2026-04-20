import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { formatDuration, formatReleaseDate } from "@/lib/utils";
import type { MovieCardProps } from "@/lib/types";

import { useAuth } from "@/hooks/useAuth";
import { useAuthModal } from "@/hooks/useAuthModal";

export default function MovieCard({
  movie,
  mode = "user",
  onEdit,
  onDelete,
  onSelect,
  onDetails,
  selected = false,
}: MovieCardProps) {
  const isSelectable = mode === "select";

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { openAuth } = useAuthModal();

  const handleBook = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      openAuth();
      return;
    }

    // ✅ LOGGED IN → GO TO BOOKING PAGE (SAFE ROUTE)
    navigate(`/book/${movie.id}`);
  };

  return (
    <div
      onClick={() => {
        if (isSelectable) onSelect?.(movie);
      }}
      className={`border rounded-lg p-3 space-y-2 transition hover:shadow-sm ${
        isSelectable ? "cursor-pointer" : ""
      } ${selected ? "border-black ring-2 ring-black" : ""}`}
    >
      {/* IMAGE */}
      {movie.poster?.length > 0 ? (
        <img
          src={movie.poster[0]}
          className="h-40 w-full object-cover rounded"
        />
      ) : (
        <div className="h-40 w-full flex items-center justify-center bg-gray-50 rounded text-sm text-gray-400">
          No Image
        </div>
      )}

      {/* TITLE */}
      <h2 className="font-semibold">{movie.title}</h2>

      {/* DESCRIPTION */}
      {movie.description && (
        <p className="text-xs text-gray-500 line-clamp-2">
          {movie.description}
        </p>
      )}

      {/* META */}
      <p className="text-sm text-gray-500">
        <span className="font-medium text-gray-700">Genre:</span>{" "}
        {movie.genre?.join(", ")}
      </p>

      <p className="text-sm text-gray-500">
        <span className="font-medium text-gray-700">Language:</span>{" "}
        {movie.language?.join(", ")}
      </p>

      <p className="text-sm">
        <span className="font-medium">Duration:</span>{" "}
        {formatDuration(movie.duration)}
      </p>

      <p className="text-sm">
        <span className="font-medium">Release:</span>{" "}
        {formatReleaseDate(movie.releaseDate)}
      </p>

      {/* ACTIONS */}
      {mode === "admin" && (
        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(movie);
            }}
          >
            Edit
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(movie.id);
            }}
          >
            Delete
          </Button>
        </div>
      )}

      {mode === "user" && (
        <Button className="w-full mt-2" onClick={handleBook}>
          Book
        </Button>
      )}
    </div>
  );
}
