// path: src/hooks/useAuth.ts

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { RootState } from "@/store/store";

import { setAuth, logout as logoutAction } from "@/store/auth/authSlice";
import { graphqlRequest } from "@/api/graphql";
import { toast } from "sonner";

// 🔥 GraphQL queries
const LOGIN_MUTATION = `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user { id role name }
    }
  }
`;

const REGISTER_MUTATION = `
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      user { id role name }
    }
  }
`;

const LOGOUT_MUTATION = `
  mutation {
    logout {
      success
    }
  }
`;

export const useAuth = () => {
  const dispatch = useAppDispatch();

  // ✅ GET STATE FROM REDUX
  const { user, isAuthenticated, loading } = useAppSelector(
    (state: RootState) => state.auth,
  );

  const role = user?.role || null;

  // ✅ ACTIONS
  const login = async (values: { email: string; password: string }) => {
    try {
      const res = await graphqlRequest<{
        login: { user: { id: string; role: string; name?: string } };
      }>(LOGIN_MUTATION, values);

      const user = res.login.user;

      dispatch(setAuth(user));
      toast.success("Login successful 🎉");

      return {
        success: true,
        user,
      };
    } catch (err: any) {
      toast.error(err.message || "Login failed ❌");
      return { success: false };
    }
  };

  const register = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const res = await graphqlRequest<{
        register: {
          user: { id: string; role: string; name?: string };
        };
      }>(REGISTER_MUTATION, values);

      dispatch(setAuth(res.register.user));
      toast.success("Account created 🚀");

      return true;
    } catch (err: any) {
      toast.error(err.message || "Registration failed ❌");
      return false;
    }
  };

  const logout = async () => {
    try {
      await graphqlRequest(LOGOUT_MUTATION);
      toast.success("Logged out 👋");
    } catch {
      toast.error("Logout failed");
    } finally {
      dispatch(logoutAction());
    }
  };

  // ✅ RETURN EVERYTHING
  return {
    user,
    role,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };
};
