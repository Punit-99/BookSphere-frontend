import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { REST } from "@/api/axios";

type CreateCheckoutPayload = {
  movieId: string;
  showId: string;
  theatreId: string;
  ticketCount: number;
};

type PaymentState = {
  loading: boolean;
  error: string | null;
  checkoutUrl: string | null;
};

const initialState: PaymentState = {
  loading: false,
  error: null,
  checkoutUrl: null,
};

export const createCheckoutSession = createAsyncThunk(
  "payment/createCheckoutSession",
  async (
    { movieId, showId, theatreId, ticketCount }: CreateCheckoutPayload,
    thunkAPI,
  ) => {
    try {
      const response = await REST.post(
        "/api/payment/create-checkout-session",
        {
          movieId,
          showId,
          theatreId,
          tickets: ticketCount,
        },
        {
          withCredentials: true,
        },
      );

      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || "Payment failed",
      );
    }
  },
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    clearPaymentState: (state) => {
      state.loading = false;
      state.error = null;
      state.checkoutUrl = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCheckoutSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCheckoutSession.fulfilled, (state, action) => {
        state.loading = false;
        state.checkoutUrl = action.payload?.url || null;
      })
      .addCase(createCheckoutSession.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || "Payment failed";
      });
  },
});

export const { clearPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
