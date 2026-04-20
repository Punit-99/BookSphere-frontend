export const GET_MOVIES = `
  query {
    adminMovies {
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
