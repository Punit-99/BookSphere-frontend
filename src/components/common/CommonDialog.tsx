import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { AppDialogProps } from "@/lib/types";

const CommonDialog = ({
  title,
  children,
  open,
  onOpenChange,
}: AppDialogProps) => {
  const close = () => onOpenChange(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-auto max-w-[95vw] max-h-[90vh] overflow-auto">
        {title && (
          <DialogHeader>
            <DialogTitle className="text-center">{title}</DialogTitle>
          </DialogHeader>
        )}

        <div className="w-full">
          {typeof children === "function" ? children(close) : children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommonDialog;
