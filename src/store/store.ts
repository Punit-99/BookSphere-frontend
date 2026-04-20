// path:src/store/store.ts

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import usersReducer from "./user/usersSlice";
import movieReducer from "./movies/movieSlice";
import theatreReducer from "./theatres/theatreSlice";
import showReducer from "./shows/showSlice";
import constantReducer from "./constant/ConstantsSlice";
import homePageMoviesReducer from "./homePageMovies/homePageMoviesSlice";
import movieDetailReducer from "./movies/movieDetail.slice";
import bookingReducer from "./booking/bookingSlice";
import myBookingsReducer from "./booking/myBookingSlice";
import paymentReducer from "./payment/paymentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    movies: movieReducer,
    theatres: theatreReducer,
    shows: showReducer,
    constant: constantReducer,
    homePageMovies: homePageMoviesReducer,
    movieDetail: movieDetailReducer,
    booking: bookingReducer,
    myBookings: myBookingsReducer,
    payment: paymentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
