import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { graphqlRequest } from "@/api/graphql";

import { GET_THEATRES } from "@/api/graphql/theatres/theatre.queries";
import {
  CREATE_THEATRE,
  UPDATE_THEATRE,
  DELETE_THEATRE,
} from "@/api/graphql/theatres/theatre.mutations";

// ================= TYPES =================
export type Theatre = {
  id: string;
  name: string;
  state: string;
  city: string;
  address?: string;
  screens: number;
};

// ================= STATE =================
type TheatreState = {
  theatres: Theatre[];
  loading: boolean;
  error: string | null;
};

const initialState: TheatreState = {
  theatres: [],
  loading: false,
  error: null,
};

// ================= FETCH =================
export const fetchTheatres = createAsyncThunk(
  "theatres/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await graphqlRequest(GET_THEATRES);

      return res?.adminTheatres || [];
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

// ================= CREATE =================
export const createTheatre = createAsyncThunk(
  "theatres/create",
  async (input: any, { dispatch, rejectWithValue }) => {
    try {
      const res = await graphqlRequest(CREATE_THEATRE, input);
      dispatch(fetchTheatres());
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

// ================= UPDATE =================
export const updateTheatre = createAsyncThunk(
  "theatres/update",
  async ({ id, input }: any, { dispatch, rejectWithValue }) => {
    try {
      const res = await graphqlRequest(UPDATE_THEATRE, {
        id,
        input,
      });
      dispatch(fetchTheatres());
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

// ================= DELETE =================
export const deleteTheatre = createAsyncThunk(
  "theatres/delete",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      await graphqlRequest(DELETE_THEATRE, { id });
      dispatch(fetchTheatres());
      return id;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

// ================= SLICE =================
const theatreSlice = createSlice({
  name: "theatres",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchTheatres.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTheatres.fulfilled, (state, action) => {
        state.loading = false;
        state.theatres = action.payload;
      })
      .addCase(fetchTheatres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // DELETE (optimistic update)
      .addCase(deleteTheatre.fulfilled, (state, action) => {
        state.theatres = state.theatres.filter((t) => t.id !== action.payload);
      });
  },
});

export default theatreSlice.reducer;
