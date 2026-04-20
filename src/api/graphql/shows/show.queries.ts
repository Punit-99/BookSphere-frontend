export const GET_SHOWS = `
  query {
    adminShows {
      id
      showTime
      totalSeats
      availableSeats
      price

      movie {
        id
        title
        poster
      }

      theatre {
        id
        name
        city
      }
    }
  }
`;
