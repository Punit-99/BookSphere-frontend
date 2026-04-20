import { useEffect, useState, createContext } from "react";
import { useDispatch } from "react-redux";
import { setAuth, logout } from "@/store/auth/authSlice";
import { graphqlRequest } from "@/api/graphql";

import AuthDialog from "@/components/auth/AuthDialog";
import AppSkeleton from "@/components/common/AppSkeleton";

interface User {
  id: string;
  role: string;
  name: string;
  email: string;
}

/* =========================
   CONTEXT (IN SAME FILE)
========================= */
type AuthUIContextType = {
  openAuth: () => void;
  closeAuth: () => void;
  isOpen: boolean;
};

const AuthUIContext = createContext<AuthUIContextType | null>(null);

/* =========================
   PROVIDER
========================= */
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await graphqlRequest<{ me: User }>(`
          query {
            me {
              id
              role
              name
              email
            }
          }
        `);

        dispatch(setAuth(res.me));
      } catch {
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  if (loading) {
    return <AppSkeleton variant="page" />;
  }

  return (
    <AuthUIContext.Provider
      value={{
        openAuth: () => setOpen(true),
        closeAuth: () => setOpen(false),
        isOpen: open,
      }}
    >
      {children}

      {/* GLOBAL MODAL */}
      <AuthDialog open={open} onOpenChange={setOpen} />
    </AuthUIContext.Provider>
  );
};

export default AuthProvider;

/* export context ONLY for hook */
export { AuthUIContext };
