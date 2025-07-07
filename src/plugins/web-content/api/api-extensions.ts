import { Mediamentions } from './../entities/content.entity';
import gql from 'graphql-tag';

export const contentAdminApiExtensions = gql`
  type Content implements Node {
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

  type ContentList implements PaginatedList {
    items: [Content!]!
    totalItems: Int!
  }

  input ContentListOptions

  type Achievement {
    award: String!
    venue: String!
    year: Int!
    photo: String!
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

  input AchievementInput {
    award: String!
    venue: String!
    year: Int!
    photo: String!
    link:String!
  }

  input ExhibitionInput {
    coverPhoto: String!
    title: String!
    venue: String!
    date: String!
    link:String!
  }

  input MediamentionsInput{
    photo:String!
    description:String!
    year:Int!
    link:String!
  }

  extend type Query {
    content(id: ID!): Content
    contents(options: ContentListOptions): ContentList!
  }

  input CreateContentInput {
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
    achievements: [AchievementInput!]
    exhibitions: [ExhibitionInput!]
    mediamentions: [MediamentionsInput!]
  }

  input UpdateContentInput {
    id: ID!
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
    achievements: [AchievementInput!]
    exhibitions: [ExhibitionInput!]
    mediamentions: [MediamentionsInput!]
  }

  extend type Mutation {
    createContent(input: CreateContentInput!): Content!
    updateContent(input: UpdateContentInput!): Content!
    deleteContent(id: ID!): DeletionResponse!
  }
`;
