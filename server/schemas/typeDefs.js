const typeDefs = `
  type User {
    _id: ID!
    username: String
    email: String
    password: String
    posts: [Post]
  }

  type Post {
    _id: ID!
    title : String!
    body: String!
    author: ID!
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String

  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    post(id: ID!): Post
    posts(username: String): [Post]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    createPost(title: String!, body: String!): User
    addComment(postId: ID!, commentText: String!): Post
  }
  `;

module.exports = typeDefs;