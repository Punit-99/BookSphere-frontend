import MovieCard from "@/components/common/MovieCard";
import { useEffect } from "react";
import { fetchMovies } from "@/store/movies/movieSlice";
import AppSkeleton from "@/components/common/AppSkeleton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function SelectMovieStep({ selected, onSelect }: any) {
  const dispatch = useAppDispatch();
  const { movies, loading } = useAppSelector((s) => s.movies);

  useEffect(() => {
    if (!movies.length) {
      dispatch(fetchMovies());
    }
  }, [dispatch, movies.length]);

  if (loading) {
    return (
      <div className="grid grid-cols-4 gap-4">
        <AppSkeleton variant="card" count={3} />
      </div>
    );
  }

  if (!movies.length) {
    return <div className="text-center text-gray-500">No movies found 🎬</div>;
  }

  return (
    <div className="space-y-4 w-full">
      {selected && (
        <div className="text-sm text-green-600">Selected: {selected.title}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {movies.map((m: any) => (
          <MovieCard
            key={m.id}
            mode="select"
            movie={m}
            selected={selected?.id === m.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
