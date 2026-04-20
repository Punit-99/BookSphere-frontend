import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "@/components/common/MovieCard";
import { fetchLatestMovies } from "@/store/homePageMovies/homePageMoviesSlice";

const LatestReleases = () => {
  const dispatch = useDispatch();

  const { latestMovies, loading } = useSelector((s: any) => s.homePageMovies);

  useEffect(() => {
    if (!latestMovies?.length) {
      dispatch(fetchLatestMovies() as any);
    }
  }, [dispatch, latestMovies?.length]);

  if (loading && !latestMovies.length) {
    return <div className="h-40 bg-gray-200 animate-pulse rounded" />;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Latest Releases</h2>

      <div className="grid grid-cols-5 gap-4">
        {latestMovies?.slice(0, 10).map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} mode="user" />
        ))}
      </div>
    </div>
  );
};

export default LatestReleases;
