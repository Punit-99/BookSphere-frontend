export const CREATE_MOVIE = `
  mutation CreateMovie(
    $title: String!
    $description: String
    $duration: Int!
    $language: [String!]!
    $genre: [String!]!
    $releaseDate: String
    $poster: [String]
  ) {
    createMovie(
      title: $title
      description: $description
      duration: $duration
      language: $language
      genre: $genre
      releaseDate: $releaseDate
      poster: $poster
    ) {
      id
      title
    }
  }
`;

export const UPDATE_MOVIE = `
  mutation UpdateMovie(
    $id: ID!
    $input: MovieInput!
  ) {
    updateMovie(id: $id, input: $input) {
      id
      title
      genre
      language
    }
  }
`;

export const DELETE_MOVIE = `
  mutation DeleteMovie($id: ID!) {
    deleteMovie(id: $id)
  }
`;
