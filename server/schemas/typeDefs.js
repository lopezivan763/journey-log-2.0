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
  }

  type Comment {
    id: ID!
    text: String!
    post: Post!
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
    addComment(text: String!, postId: ID!): Comment
  }
  `;

module.exports = typeDefs;