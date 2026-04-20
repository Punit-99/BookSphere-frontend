import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import CommonDialog from "@/components/common/CommonDialog";
import TheatreForm from "./CreateTheatreForm";
import TheatreCard from "@/components/common/TheatreCard";

import { fetchTheatres, deleteTheatre } from "@/store/theatres/theatreSlice";
import AppSkeleton from "@/components/common/AppSkeleton";

const TheatreList = () => {
  const dispatch = useDispatch();
  const { theatres, loading } = useSelector((s: any) => s.theatres);

  const [editingTheatre, setEditingTheatre] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchTheatres() as any);
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    await dispatch(deleteTheatre(id) as any);
    toast.success("Theatre deleted 🎉");
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="grid grid-cols-4 gap-4 p-4">
        <AppSkeleton variant="card" count={8} />
      </div>
    );
  }

  // ================= EMPTY STATE =================
  if (!theatres.length) {
    return (
      <div className="flex items-center justify-center h-[300px] text-gray-500 border rounded-lg">
        No theatres found 🎬
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {theatres.map((t: any) => (
        <TheatreCard
          key={t.id}
          theatre={t}
          mode="admin"
          onEdit={setEditingTheatre}
          onDelete={handleDelete}
        />
      ))}

      {/* EDIT MODAL */}
      <CommonDialog
        title="Edit Theatre"
        open={!!editingTheatre}
        onOpenChange={(open) => !open && setEditingTheatre(null)}
      >
        {(close) =>
          editingTheatre && (
            <TheatreForm
              mode="edit"
              initialData={editingTheatre}
              onSuccess={() => {
                setEditingTheatre(null);
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

export default TheatreList;
