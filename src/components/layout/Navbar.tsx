import { useAppSelector } from "react-redux";
import type { RootState } from "@/store/store";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import UserMenu from "./UserMenu";
import { useAuthModal } from "@/hooks/useAuthModal";
import { siteName } from "@/lib/constant";

interface NavbarProps {
  showSiteName?: boolean;
  leftContent?: React.ReactNode; // ✅ ADD THIS
}

const Navbar = ({ showSiteName = true, leftContent }: NavbarProps) => {
  const { openAuth } = useAuthModal();
  const user = useAppSelector((state: RootState) => state.auth.user);

  return (
    <div className="flex justify-between items-center p-4 border-b">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">
        {leftContent}

        {showSiteName && <h1 className="font-bold text-lg">{siteName}</h1>}
      </div>

      {/* RIGHT SIDE */}
      <div className="flex gap-4 items-center">
        <ThemeToggle />

        {user ? (
          <UserMenu user={user} />
        ) : (
          <Button onClick={openAuth}>Login</Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
