import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { graphqlRequest } from "@/api/graphql";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isApproved: boolean;
}

interface UsersState {
  users: User[];
  loading: boolean;
}

const initialState: UsersState = {
  users: [],
  loading: false,
};

// ✅ FETCH ADMINS ONLY
export const fetchAdmins = createAsyncThunk("users/fetchAdmins", async () => {
  const data = await graphqlRequest<{ admins: User[] }>(`
    query {
      admins {
        id
        name
        email
        role
        isApproved
      }
    }
  `);

  return data.admins;
});

// ✅ TOGGLE APPROVAL
export const updateUserApproval = createAsyncThunk(
  "users/toggleAdminApproval",
  async (userId: string) => {
    const data = await graphqlRequest<{ toggleAdminApproval: User }>(
      `
      mutation ($userId: ID!) {
        toggleAdminApproval(userId: $userId) {
          id
          name
          email
          role
          isApproved
        }
      }
      `,
      { userId },
    );

    return data.toggleAdminApproval;
  },
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmins.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAdmins.rejected, (state) => {
        state.loading = false;
      })

      .addCase(updateUserApproval.fulfilled, (state, action) => {
        const updated = action.payload;

        const user = state.users.find((u) => u.id === updated.id);
        if (user) {
          user.isApproved = updated.isApproved;
        }
      });
  },
});

export default usersSlice.reducer;
