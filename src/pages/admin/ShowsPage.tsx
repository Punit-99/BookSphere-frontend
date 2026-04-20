import { useState } from "react";

import { Button } from "@/components/ui/button";
import CommonDialog from "@/components/common/CommonDialog";

import ShowList from "@/components/admin/shows/ShowList";
import CreateShowWizard from "@/components/admin/shows/CreateShowForm";

const ShowPage = () => {
  const [open, setOpen] = useState(false);
  const [editingShow, setEditingShow] = useState<any>(null);

  const handleClose = () => {
    setOpen(false);
    setEditingShow(null);
  };

  return (
    <div className="p-5 space-y-5">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Shows</h1>

        <Button
          onClick={() => {
            setEditingShow(null); // create mode
            setOpen(true);
          }}
        >
          + Create Show
        </Button>
      </div>

      {/* LIST */}

      <ShowList
        onEdit={(show: any) => {
          setEditingShow(show); // ✅ IMPORTANT
          setOpen(true);
        }}
      />

      {/* MODAL */}
      <CommonDialog open={open} onOpenChange={handleClose} title="Show">
        {(close) => (
          <CreateShowWizard
            initialShow={editingShow} // ✅ THIS FIXES EVERYTHING
            onClose={() => {
              handleClose();
              close();
            }}
          />
        )}
      </CommonDialog>
    </div>
  );
};

export default ShowPage;
