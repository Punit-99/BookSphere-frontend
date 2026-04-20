// store/myBookings/myBookingsSlice.ts

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { graphqlRequest } from "@/api/graphql";
import { GET_MY_BOOKINGS } from "@/api/graphql/bookings/booking.queries";

export const fetchMyBookings = createAsyncThunk(
  "myBookings/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const data = (await graphqlRequest(GET_MY_BOOKINGS)) as {
        myBookings: any[];
      };

      return data.myBookings;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch bookings");
    }
  },
);

const myBookingsSlice = createSlice({
  name: "myBookings",
  initialState: {
    bookings: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchMyBookings.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default myBookingsSlice.reducer;
