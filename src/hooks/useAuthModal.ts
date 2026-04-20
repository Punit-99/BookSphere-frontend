import { useContext } from "react";
import { AuthUIContext } from "@/providers/AuthProvider";

export const useAuthModal = () => {
  const ctx = useContext(AuthUIContext);

  if (!ctx) {
    throw new Error("useAuthModal must be used inside AuthProvider");
  }

  return ctx;
};