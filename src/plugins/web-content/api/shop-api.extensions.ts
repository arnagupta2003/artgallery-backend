import gql from 'graphql-tag';

export const shopApiExtensions = gql`
  type Content {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    code: String!
    quotation: String
    homeintroduction: String
    artistAchievements: [String!]
    artistPhotoHome: String
    age: Int
    nationality: String
    aboutintroductionpara1: String
    aboutintroductionpara2: String
    artistPhotoAbout: String
    instagram: String
    twitter: String
    whatsapp: String
    achievements: [Achievement!]
    exhibitions: [Exhibition!]
    mediamentions: [Mediamentions!]
  }

  type Achievement {
    award: String!
    venue: String!
    year: Int!
    photo:String!
    link:String!
  }

  type Exhibition {
    coverPhoto: String!
    title: String!
    venue: String!
    date: String!
    link:String!
  }

  type Mediamentions{
    photo:String!
    description:String!
    year:Int!
    link:String!
}

  type ContentList {
    items: [Content!]!
    totalItems: Int!
  }

  input ContentListOptions {
    take: Int
    skip: Int
    sortBy: String
  }

  extend type Query {
    content(id: ID!): Content
    contents(options: ContentListOptions): ContentList!
  }
`;
