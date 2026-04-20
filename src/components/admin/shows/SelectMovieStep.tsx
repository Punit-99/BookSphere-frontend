import MovieCard from "@/components/common/MovieCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchMovies } from "@/store/movies/movieSlice";
import AppSkeleton from "@/components/common/AppSkeleton";

export default function SelectMovieStep({ selected, onSelect }: any) {
  const dispatch = useDispatch();
  const { movies, loading } = useSelector((s: any) => s.movies);

  useEffect(() => {
    if (!movies.length) {
      dispatch(fetchMovies());
    }
  }, []);

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
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Select Movie</h2>

      {selected && (
        <div className="text-sm text-green-600">Selected: {selected.title}</div>
      )}

      <div className="grid grid-cols-4 gap-4">
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
