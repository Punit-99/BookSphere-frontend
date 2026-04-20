import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { graphqlRequest } from "@/api/graphql";

import { GET_MOVIES } from "@/api/graphql/movies/movie.queries";
import {
  CREATE_MOVIE,
  UPDATE_MOVIE,
  DELETE_MOVIE,
} from "@/api/graphql/movies/movie.mutations";

export type Movie = {
  id: string;
  title: string;
  description?: string;
  duration: number;
  language: string[];
  genre: string[];
  releaseDate?: string;
  poster?: string[];
};

type MovieState = {
  movies: Movie[];
  loading: boolean;
  error: string | null;
};

const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
};

// ================= FETCH =================
export const fetchMovies = createAsyncThunk(
  "movies/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = (await graphqlRequest(GET_MOVIES)) as {
        adminMovies: Movie[];
      };

      return res.adminMovies || [];
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

// ================= CREATE =================
export const createMovie = createAsyncThunk(
  "movies/create",
  async (input: any, { dispatch, rejectWithValue }) => {
    try {
      const res = await graphqlRequest(CREATE_MOVIE, input);
      dispatch(fetchMovies());
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

// ================= UPDATE =================
export const updateMovie = createAsyncThunk(
  "movies/update",
  async ({ id, input }: any, { dispatch, rejectWithValue }) => {
    try {
      const res = await graphqlRequest(UPDATE_MOVIE, { id, input });
      dispatch(fetchMovies());
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

// ================= DELETE =================
export const deleteMovie = createAsyncThunk(
  "movies/delete",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      await graphqlRequest(DELETE_MOVIE, { id });
      dispatch(fetchMovies());
      return id;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

// ================= SLICE =================
const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter((m) => m.id !== action.payload);
      });
  },
});

export default movieSlice.reducer;
