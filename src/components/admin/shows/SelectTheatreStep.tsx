import TheatreCard from "@/components/common/TheatreCard";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";
import { fetchTheatres } from "@/store/theatres/theatreSlice";
import AppSkeleton from "@/components/common/AppSkeleton";

export default function SelectTheatreStep({ selected, onSelect }: any) {
  const dispatch = useAppDispatch();
  const { theatres, loading } = useAppSelector((s: any) => s.theatres);

  useEffect(() => {
    if (!theatres.length) {
      dispatch(fetchTheatres() as any);
    }
  }, [dispatch, theatres.length]);

  if (loading) {
    return (
      <div className="grid grid-cols-4 gap-4">
        <AppSkeleton variant="row" count={3} />
      </div>
    );
  }

  if (!theatres.length) {
    return (
      <div className="text-center text-gray-500">No theatres found 🎬</div>
    );
  }

  return (
    <div className="space-y-4">
      {selected && (
        <div className="text-sm text-green-600">Selected: {selected.name}</div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {theatres.map((t: any) => (
          <TheatreCard
            key={t.id}
            theatre={t}
            mode="select"
            selected={selected?.id === t.id}
            onSelect={onSelect} // ✅ FIXED
          />
        ))}
      </div>
    </div>
  );
}
