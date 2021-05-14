const { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    loginUser(data: LoginUserInput!): AuthPayload!
    getMe: User!
    getAllUsers: [User!]!

    # accounts: [Account]

    # notes: [Note]

    # note(id: ID!): Note

    # categories: [Category]
  }

  type Mutation {
    signupUser(data: SignupUserInput!): AuthPayload!
    updateUser(data: UpdateUserInput!): AuthPayload!
    removeAllUsers: DefaultPayload!
  }

  type User {
    _id: ID!
    email: String!
    password: String!
    name: String
  }

  # type Account {
  #   _id: ID!
  #   name: String
  #   sum: Int!
  # }

  # type Category {
  #   _id: ID!
  #   name: String
  # }

  # type Note {
  #   _id: ID!
  #   sum: Int!
  #   date: String!
  #   type(type: NoteType): String
  # }

  type DefaultPayload {
    success: Boolean!
    message: String
  }

  type AuthPayload {
    success: Boolean!
    message: String
    token: String
  }

  input SignupUserInput {
    email: String!
    name: String!
    password: String!
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  input UpdateUserInput {
    password: String
    name: String!
  }

  # enum NoteType {
  #   INCREASE
  #   DECREASE
  # }
`;
