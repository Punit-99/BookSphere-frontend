// store/slices/movieConstants.slice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { graphqlRequest } from "@/api/graphql";
import { GET_CONSTANTS } from "@/api/graphql/common/constant.querires";

export const fetchConstants = createAsyncThunk("constants/fetch", async () => {
  const res = await graphqlRequest(GET_CONSTANTS);
  return res.constants;
});

type ConstantsState = {
  genres: string[];
  languages: string[];
  locations: string[];
  loading: boolean;
  error: string | null;
};

const initialState: ConstantsState = {
  genres: [],
  languages: [],
  locations: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "constants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConstants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConstants.fulfilled, (state, action) => {
        state.loading = false;
        state.genres = action.payload.genres || [];
        state.languages = action.payload.languages || [];
        state.locations = action.payload.locations || [];
      })
      .addCase(fetchConstants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch constants";
      });
  },
});

export default slice.reducer;
