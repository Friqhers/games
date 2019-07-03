// eslint-disable
// this is an auto generated file. This will be overwritten

export const getGame = `query GetGame($id: ID!) {
  getGame(id: $id) {
    name
    id
    release_date
    genre
    rating
    description
    images
    videos
    number_of_views
    thumbnail_img
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
      name
      id
      release_date
      genre
      rating
      description
      images
      videos
      number_of_views
      thumbnail_img
    }
    nextToken
  }
}
`;
