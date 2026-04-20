import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { fetchShows, deleteShow } from "@/store/shows/showSlice";
import { formatShowTime } from "@/lib/utils";
import type { ShowListMap } from "@/lib/types";
import AppSkeleton from "@/components/common/AppSkeleton";

const ShowList = ({ movieId, onEdit }: any) => {
  const dispatch = useAppDispatch();
  const { shows, loading } = useAppSelector((s: any) => s.shows);

  useEffect(() => {
    dispatch(fetchShows(movieId) as any);
  }, [dispatch, movieId]);

  const handleDelete = async (id: string) => {
    await dispatch(deleteShow(id) as any);
    toast.success("Show deleted");
  };

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-4 p-4">
        <AppSkeleton variant="show" count={6} />
      </div>
    );
  }

  if (!shows.length) {
    return (
      <div className="flex items-center justify-center h-[200px] text-gray-500 border rounded-lg">
        No shows found 🎭
      </div>
    );
  }
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {shows.map((s: ShowListMap) => (
        <div key={s.id} className="border rounded-lg p-4 space-y-2">
          {/* MOVIE */}
          <h2 className="font-semibold">{s.movie?.title}</h2>

          {/* THEATRE */}
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-800">Theatre:</span>{" "}
            {s.theatre?.name}
          </p>

          {/* TIME */}
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-800">Show:</span>{" "}
            {formatShowTime(s.showTime)}
          </p>

          {/* SEATS */}
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-800">Seats:</span>{" "}
            {s.availableSeats}/{s.totalSeats}
          </p>

          {/* PRICE */}
          <p className="text-sm">
            <span className="font-medium text-gray-800">Price:</span> ₹{s.price}
          </p>

          {/* ACTIONS */}
          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline" onClick={() => onEdit?.(s)}>
              Edit
            </Button>

            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleDelete(s.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowList;
