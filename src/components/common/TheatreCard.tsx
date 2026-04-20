import { Button } from "@/components/ui/button";
import type { TheatreCardProps } from "@/lib/types";

export default function TheatreCard({
  theatre,
  mode = "user",
  onEdit,
  onDelete,
  onSelect,
  selected = false,
}: TheatreCardProps) {
  const isSelectable = mode === "select";

  return (
    <div
      onClick={() => {
        if (isSelectable) onSelect?.(theatre);
      }}
      className={`border rounded-lg p-4 space-y-2 transition hover:shadow-sm ${
        isSelectable ? "cursor-pointer" : ""
      } ${selected ? "border-black ring-2 ring-black" : ""}`}
    >
      {/* NAME */}
      <h2 className="font-semibold text-lg">{theatre?.name}</h2>

      {/* LOCATION */}
      <p className="text-sm text-gray-500">
        <span className="font-medium text-gray-700">Location:</span>{" "}
        {theatre?.state} • {theatre?.city}
      </p>

      {/* ADDRESS */}
      {theatre?.address && (
        <p className="text-xs text-gray-500 line-clamp-2">{theatre.address}</p>
      )}

      {/* SCREENS */}
      <p className="text-sm text-gray-500">
        <span className="font-medium text-gray-700">Screens:</span>{" "}
        {theatre?.screens}
      </p>

      {/* ADMIN ACTIONS */}
      {mode === "admin" && (
        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(theatre);
            }}
          >
            Edit
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(theatre.id);
            }}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}
