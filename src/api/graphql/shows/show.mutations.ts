export const CREATE_SHOW = `
mutation CreateShow(
  $movie: ID!,
  $theatre: ID!,
  $showTime: String!,
  $totalSeats: Int!,
  $price: Float!
) {
  createShow(
    movie: $movie,
    theatre: $theatre,
    showTime: $showTime,
    totalSeats: $totalSeats,
    price: $price
  ) {
    id
  }
}
`;

export const UPDATE_SHOW = `
mutation UpdateShow($id: ID!, $input: ShowInput!) {
  updateShow(id: $id, input: $input) {
    id
  }
}
`;

export const DELETE_SHOW = `
mutation DeleteShow($id: ID!) {
  deleteShow(id: $id)
}
`;
