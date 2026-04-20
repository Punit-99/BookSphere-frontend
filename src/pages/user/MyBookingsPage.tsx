// src/pages/MyBookingsPage.tsx

import { fetchMyBookings } from "@/store/booking/myBookingSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const MyBookingsPage = () => {
  const dispatch = useDispatch<any>();

  const { bookings, loading, error } = useSelector(
    (state: any) => state.myBookings,
  );

  useEffect(() => {
    dispatch(fetchMyBookings());
  }, [dispatch]);

  if (loading) {
    return <div className="p-6">Loading bookings...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <p className="text-muted-foreground mt-1">
          View all your movie bookings
        </p>
      </div>

      {!bookings.length ? (
        <div className="border rounded-xl p-10 text-center text-muted-foreground">
          No bookings found
        </div>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking: any) => (
            <div
              key={booking.id}
              className="border rounded-2xl p-5 flex flex-col md:flex-row gap-5"
            >
              <img
                src={booking.show.movie.poster?.[0]}
                alt={booking.show.movie.title}
                className="w-full md:w-40 h-56 object-cover rounded-xl"
              />

              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold">
                      {booking.show.movie.title}
                    </h2>

                    <p className="text-sm text-muted-foreground">
                      {booking.show.theatre.name} • {booking.show.theatre.city},{" "}
                      {booking.show.theatre.state}
                    </p>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="text-sm text-muted-foreground space-y-1">
                  <p>
                    Show Time:{" "}
                    {new Date(Number(booking.show.showTime)).toLocaleString()}
                  </p>

                  <p>Tickets: {booking.seatsBooked}</p>

                  <p>Total Paid: ₹{booking.totalPrice}</p>

                  <p>Payment: {booking.paymentStatus}</p>

                  <p>Booking Ref: {booking.bookingReference}</p>

                  <p>
                    Booked On:{" "}
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
