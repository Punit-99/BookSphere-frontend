import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { graphqlRequest } from "@/api/graphql";
import {
  GET_HOME_MOVIES,
  GET_LATEST_MOVIES,
} from "@/api/graphql/images/movie.queries";

// -------------------- TYPES --------------------

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

type HomePageState = {
  homeMovies: Movie[];
  latestMovies: Movie[];
  homeLoading: boolean;
  latestLoading: boolean;
  error: string | null;
};

// -------------------- THUNKS --------------------

export const fetchHomeMovies = createAsyncThunk(
  "homePageMovies/fetchHomeMovies",
  async () => {
    const res = (await graphqlRequest(GET_HOME_MOVIES)) as {
      homeMovies: Movie[];
    };

    return res.homeMovies;
  },
);

export const fetchLatestMovies = createAsyncThunk(
  "homePageMovies/fetchLatestMovies",
  async () => {
    const res = (await graphqlRequest(GET_LATEST_MOVIES)) as {
      latestMovies: Movie[];
    };

    return res.latestMovies;
  },
);

// -------------------- STATE --------------------

const initialState: HomePageState = {
  homeMovies: [],
  latestMovies: [],
  homeLoading: false,
  latestLoading: false,
  error: null,
};

// -------------------- SLICE --------------------

const homePageMoviesSlice = createSlice({
  name: "homePageMovies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ---------------- HOME MOVIES ----------------
    builder
      .addCase(fetchHomeMovies.pending, (state) => {
        state.homeLoading = true;
      })
      .addCase(fetchHomeMovies.fulfilled, (state, action) => {
        state.homeLoading = false;
        state.homeMovies = action.payload;
      })
      .addCase(fetchHomeMovies.rejected, (state, action) => {
        state.homeLoading = false;
        state.error = action.error.message || "Failed to fetch home movies";
      });

    // ---------------- LATEST MOVIES ----------------
    builder
      .addCase(fetchLatestMovies.pending, (state) => {
        state.latestLoading = true;
      })
      .addCase(fetchLatestMovies.fulfilled, (state, action) => {
        state.latestLoading = false;
        state.latestMovies = action.payload;
      })
      .addCase(fetchLatestMovies.rejected, (state, action) => {
        state.latestLoading = false;
        state.error = action.error.message || "Failed to fetch latest movies";
      });
  },
});

export default homePageMoviesSlice.reducer;
