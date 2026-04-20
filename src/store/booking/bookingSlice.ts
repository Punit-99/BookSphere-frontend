import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { graphqlRequest } from "@/api/graphql";
import { GET_BOOKING_PAGE } from "@/api/graphql/bookings/booking.queries";

type BookingPageResponse = {
  bookingPage: {
    movie: any;
    theatres: any[];
  };
};

export const fetchBookingPage = createAsyncThunk(
  "booking/fetchBookingPage",
  async (movieId: string) => {
    const res = (await graphqlRequest(GET_BOOKING_PAGE, {
      movieId,
    })) as BookingPageResponse;

    return res.bookingPage;
  },
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    movie: null,
    theatres: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookingPage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookingPage.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload.movie;
        state.theatres = action.payload.theatres;
      })
      .addCase(fetchBookingPage.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default bookingSlice.reducer;
