export const typeDef = `
  extend type Query {
    getAllPhotos(inputTag: String): [Photos]
  }
  type Photos   {
    title: String
    link: String
    description: String
    modified: DateTimeType
    generator: String
    items: [Items]
  }
  type Items   {
    title: String
    media: Media
    date_taken: DateTimeType
    description: String
    published: String
    author: String
    author_id: String
    tags: String
  }
  type Media {
    m: String
  }
`;