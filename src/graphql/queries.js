// eslint-disable
// this is an auto generated file. This will be overwritten

export const getGame = `query GetGame($id: ID!) {
  getGame(id: $id) {
    id
    name
    description
    platform
    release_date
    genre
    rating
    images
    thumbnail_img
    video
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
      platform
      release_date
      genre
      rating
      images
      thumbnail_img
      video
    }
    nextToken
  }
}
`;
