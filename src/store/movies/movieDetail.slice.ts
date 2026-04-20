import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { graphqlRequest } from "@/api/graphql";
import { GET_MOVIE_BY_ID } from "@/api/graphql/bookings/booking.queries";

// ---------------- TYPES ----------------
type Movie = {
  id: string;
  title: string;
  description?: string;
  poster?: string[];
  duration?: number;
  language?: string[];
  genre?: string[];
  releaseDate?: string;
};

type MovieDetailState = {
  movie: Movie | null;
  loading: boolean;
  error: string | null;
};

// ---------------- THUNK ----------------
export const fetchMovieById = createAsyncThunk(
  "movieDetail/fetchMovieById",
  async (movieId: string) => {
    const res = await graphqlRequest(GET_MOVIE_BY_ID, {
      id: movieId,
    });

    return res.movie;
  },
);

// ---------------- STATE ----------------
const initialState: MovieDetailState = {
  movie: null,
  loading: false,
  error: null,
};

// ---------------- SLICE ----------------
const movieDetailSlice = createSlice({
  name: "movieDetail",
  initialState,
  reducers: {
    clearMovie(state) {
      state.movie = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch movie details";
      });
  },
});

export const { clearMovie } = movieDetailSlice.actions;
export default movieDetailSlice.reducer;
