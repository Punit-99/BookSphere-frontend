// src/pages/admin/TheatrePage.tsx

import { useState } from "react";

import TheatreList from "@/components/admin/theatres/TheatreList";
import CreateTheatreForm from "@/components/admin/theatres/CreateTheatreForm";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const TheatrePage = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Theatres</h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Theatre</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Theatre</DialogTitle>
            </DialogHeader>

            <CreateTheatreForm
              onSuccess={() => {
                setRefreshKey((p) => p + 1);
                setOpen(false); // close dialog
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* List */}
      <TheatreList refreshKey={refreshKey} />
    </div>
  );
};

export default TheatrePage;
