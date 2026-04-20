export const CREATE_THEATRE = `
  mutation CreateTheatre(
    $name: String!
    $state: String!
    $city: String!
    $address: String
    $screens: Int!
  ) {
    createTheatre(
      name: $name
      state: $state
      city: $city
      address: $address
      screens: $screens
    ) {
      id
      name
      state
      city
      address
      screens
    }
  }
`;

export const UPDATE_THEATRE = `
  mutation UpdateTheatre($id: ID!, $input: TheatreInput!) {
    updateTheatre(id: $id, input: $input) {
      id
      name
      state
      city
      address
      screens
    }
  }
`;

export const DELETE_THEATRE = `
  mutation DeleteTheatre($id: ID!) {
    deleteTheatre(id: $id)
  }
`;
