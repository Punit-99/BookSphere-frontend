import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchBookingPage } from "@/store/booking/bookingSlice";
import { BookingPanel } from "@/components/booking/BookingPanel";
import { SelectBookingTreatre } from "@/components/booking/SelectBookingTreatre";
import { SelectBookingShow } from "@/components/booking/SelectBookingShow";
import { BookingMovieCard } from "@/components/booking/BookingMovieCard";

const MAX_TICKETS = 6;

const BookingPage = () => {
  const { movieId } = useParams();
  const dispatch = useDispatch<any>();

  const { movie, theatres, loading } = useSelector(
    (state: any) => state.booking,
  );

  const [selectedTheatre, setSelectedTheatre] = useState<any>(null);
  const [selectedShow, setSelectedShow] = useState<any>(null);
  const [ticketCount, setTicketCount] = useState(1);

  useEffect(() => {
    if (movieId) dispatch(fetchBookingPage(movieId));
  }, [movieId]);

  const maxTicketsAllowed = useMemo(() => {
    if (!selectedShow) return MAX_TICKETS;
    return Math.min(selectedShow.availableSeats, MAX_TICKETS);
  }, [selectedShow]);

  useEffect(() => {
    if (!selectedShow) return;
    setTicketCount((p) => Math.min(Math.max(p, 1), maxTicketsAllowed));
  }, [selectedShow, maxTicketsAllowed]);

  const formattedReleaseDate = useMemo(() => {
    if (!movie?.releaseDate) return "N/A";

    return new Date(Number(movie.releaseDate)).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }, [movie]);

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found</div>;
  
  return (
    <div className="max-w-7xl mx-auto grid xl:grid-cols-3 gap-8">
      <BookingMovieCard
        movie={movie}
        formattedReleaseDate={formattedReleaseDate}
      />

      <div className="xl:col-span-2 space-y-6">
        <SelectBookingTreatre
          theatres={theatres}
          selectedTheatre={selectedTheatre}
          setSelectedTheatre={setSelectedTheatre}
          setSelectedShow={setSelectedShow}
          setTicketCount={setTicketCount}
        />

        <SelectBookingShow
          selectedTheatre={selectedTheatre}
          selectedShow={selectedShow}
          setSelectedShow={setSelectedShow}
        />

        <BookingPanel
          movieId={movie.id}
          selectedTheatre={selectedTheatre}
          selectedShow={selectedShow}
          ticketCount={ticketCount}
          setTicketCount={setTicketCount}
          maxTicketsAllowed={maxTicketsAllowed}
        />
      </div>
    </div>
  );
};

export default BookingPage;
