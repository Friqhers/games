// eslint-disable
// this is an auto generated file. This will be overwritten

// amplify update api after changes

export const getGame = `query GetGame($id: ID!) {
  getGame(id: $id) {
    id
    name
    description
    location
  }
}
`;




export const listGames = `query ListGames(
  $filter: ModelGameFilterInput
  $limit: Int 
  $nextToken: String
) {
  listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      location
    }
    nextToken
  }
}
`;
