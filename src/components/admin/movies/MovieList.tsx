import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toast } from "sonner";
import CommonDialog from "@/components/common/CommonDialog";
import CreateMovieForm from "./CreateMovieForm";
import { deleteMovie, fetchMovies } from "@/store/movies/movieSlice";

import MovieCard from "@/components/common/MovieCard";
import AppSkeleton from "@/components/common/AppSkeleton";

const MovieList = () => {
  const dispatch = useAppDispatch();
  const { movies, loading } = useAppSelector((s: any) => s.movies);

  const [editingMovie, setEditingMovie] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchMovies() as any);
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    await dispatch(deleteMovie(id) as any);
    toast.success("Movie deleted");
  };

  if (loading) {
    return (
      <div className="grid grid-cols-4 gap-4">
        <AppSkeleton variant="card" count={8} />
      </div>
    );
  }

  if (!movies.length) {
    return (
      <div className="flex items-center justify-center h-[300px] text-gray-500">
        No movies found 🎬
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {movies.map((movie: any) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          mode="admin"
          onEdit={setEditingMovie}
          onDelete={handleDelete}
        />
      ))}

      {/* EDIT MODAL */}
      <CommonDialog
        title="Edit Movie"
        open={!!editingMovie}
        onOpenChange={(o) => !o && setEditingMovie(null)}
      >
        {(close) =>
          editingMovie && (
            <CreateMovieForm
              mode="edit"
              initialData={editingMovie}
              onSuccess={() => {
                setEditingMovie(null);
                close();
              }}
              onClose={close}
            />
          )
        }
      </CommonDialog>
    </div>
  );
};

export default MovieList;
