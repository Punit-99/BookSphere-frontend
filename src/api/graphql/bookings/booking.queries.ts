export const GET_MOVIE_BY_ID = `
  query Movie($id: ID!) {
    movie(id: $id) {
      id
      title
      description
      duration
      language
      genre
      releaseDate
      poster
    }
  }
`;

export const GET_BOOKING_PAGE = `
  query BookingPage($movieId: ID!) {
    bookingPage(movieId: $movieId) {
      movie {
        id
        title
        description
        poster
        duration
        language
        genre
        releaseDate
      }
      theatres {
        theatre {
          id
          name
          city
          state
        }
        shows {
          id
          showTime
          price
          availableSeats
        }
      }
    }
  }
`;

// api/graphql/booking/booking.queries.ts

export const GET_MY_BOOKINGS = `
  query GetMyBookings {
    myBookings {
      id
      seatsBooked
      totalPrice
      status
      paymentStatus
      bookingReference
      createdAt

      show {
        id
        showTime
        price

        movie {
          id
          title
          poster
          duration
          language
        }

        theatre {
          id
          name
          city
          state
        }
      }
    }
  }
`;
