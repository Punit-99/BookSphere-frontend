// path: src/pages/admin/MoviesPage.tsx

import { useState } from "react";
import { Button } from "@/components/ui/button";
import CommonDialog from "@/components/common/CommonDialog";
import MovieList from "@/components/admin/movies/MovieList";
import CreateMovieForm from "@/components/admin/movies/CreateMovieForm";

const MoviesPage = () => {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
    // MovieList will refetch automatically (we’ll improve later if needed)
  };

  return (
    <div className="p-5 space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Movies</h1>

        <Button onClick={() => setOpen(true)}>+ Create Movie</Button>
      </div>

      {/* List */}

      <MovieList />

      {/* Modal */}
      <CommonDialog open={open} onOpenChange={setOpen} title="Create Movie">
        {(close) => (
          <CreateMovieForm
            onSuccess={() => {
              handleSuccess();
              close();
            }}
          />
        )}
      </CommonDialog>
    </div>
  );
};

export default MoviesPage;
