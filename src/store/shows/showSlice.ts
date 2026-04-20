import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { graphqlRequest } from "@/api/graphql";

import { GET_SHOWS } from "@/api/graphql/shows/show.queries";
import {
  CREATE_SHOW,
  UPDATE_SHOW,
  DELETE_SHOW,
} from "@/api/graphql/shows/show.mutations";

export type Show = {
  id: string;
  showTime: string;
  price: number;
  totalSeats: number;
  availableSeats: number;
  movie: any;
  theatre: any;
};

type ShowState = {
  shows: Show[];
  loading: boolean;
  error: string | null;
};

const initialState: ShowState = {
  shows: [],
  loading: false,
  error: null,
};

// ================= FETCH =================
export const fetchShows = createAsyncThunk(
  "shows/fetch",
  async (movieId: string | undefined, { rejectWithValue }) => {
    try {
      const res = await graphqlRequest(GET_SHOWS, movieId ? { movieId } : {});
      return res.adminShows || [];
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

// ================= CREATE =================
export const createShow = createAsyncThunk(
  "shows/create",
  async (input: any, { dispatch, rejectWithValue }) => {
    try {
      const res = await graphqlRequest(CREATE_SHOW, input);
      dispatch(fetchShows(undefined));
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

// ================= UPDATE =================
export const updateShow = createAsyncThunk(
  "shows/update",
  async ({ id, input }: any, { dispatch, rejectWithValue }) => {
    try {
      const res = await graphqlRequest(UPDATE_SHOW, { id, input });
      dispatch(fetchShows(undefined));
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

// ================= DELETE =================
export const deleteShow = createAsyncThunk(
  "shows/delete",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      await graphqlRequest(DELETE_SHOW, { id });
      dispatch(fetchShows(undefined));
      return id;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

// ================= SLICE =================
const showSlice = createSlice({
  name: "shows",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchShows.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShows.fulfilled, (state, action) => {
        state.loading = false;
        state.shows = action.payload;
      })
      .addCase(fetchShows.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // DELETE (optimistic update)
      .addCase(deleteShow.fulfilled, (state, action) => {
        state.shows = state.shows.filter((s) => s.id !== action.payload);
      });
  },
});

export default showSlice.reducer;
