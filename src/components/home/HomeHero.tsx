import ImageCarousel from "@/components/common/ImageCarousel";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeMovies } from "@/store/homePageMovies/homePageMoviesSlice";

const HomeHero = () => {
  const dispatch = useDispatch();
  const { homeMovies, loading } = useSelector((s: any) => s.homePageMovies);

  useEffect(() => {
    if (!homeMovies.length) {
      dispatch(fetchHomeMovies() as any);
    }
  }, [dispatch, homeMovies.length]);

  if (loading) {
    return (
      <div className="h-[420px] w-full bg-gray-200 animate-pulse rounded-xl" />
    );
  }

  if (!homeMovies?.length) {
    return (
      <div className="text-center text-gray-500 py-10">
        No movies available 🎬
      </div>
    );
  }

  return (
    <div className="h-[420px]">
      <ImageCarousel
        mode="viewer"
        images={homeMovies.map((movie: any) => ({
          url: movie.poster?.[0],
          title: movie.title,
          description: movie.description,
        }))}
      />
    </div>
  );
};

export default HomeHero;
