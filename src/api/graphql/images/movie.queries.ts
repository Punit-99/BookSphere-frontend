export const GET_HOME_MOVIES = `
  query {
    homeMovies {
      id
      title
      description
      poster
    }
  }
`;
export const GET_LATEST_MOVIES = `
  query {
    latestMovies {
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

