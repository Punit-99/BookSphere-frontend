import AppDialog from "@/components/common/CommonDialog";
import AuthLayout from "./AuthLayout";
import type { AuthDialogProps } from "@/lib/types";

const AuthDialog = ({ open, onOpenChange }: AuthDialogProps) => {
  return (
    <AppDialog open={open} onOpenChange={onOpenChange} title="Get Started !">
      {(close) => <AuthLayout close={close} />}
    </AppDialog>
  );
};

export default AuthDialog;
