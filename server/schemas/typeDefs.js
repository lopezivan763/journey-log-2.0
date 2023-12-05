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
    author: String
    comments: [Comment]!
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
    post(postId: ID!): Post
    posts(username: String): [Post]
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createPost(title: String!, body: String!): User
    removePost(postId: ID!): User
    addComment(postId: ID!, commentText: String!): Post
    deleteComment(postId: ID!, commentId: ID!): Post
  }
  `;

module.exports = typeDefs;