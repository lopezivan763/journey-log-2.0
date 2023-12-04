const { User, Post } = require("../models"); // Make sure to import the Post model
const { post } = require("../models/Post");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("posts");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    me: async (parent, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    posts: async (parent, { username }) => {
      if (username) {
        return Post.find({ author: username });
      }
      return Post.find();
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Invalid credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Invalid credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    createPost: async (parent, { title, body}, context) => {
      try {
        
        // Update the user's posts array to include the new post
        const post = {
          title,
          body,
          author: context.user._id
        }
        const newUserPost = await User.findByIdAndUpdate({
          _id: context.user._id
        },
          { $push: { posts: post } }, // Change 'post' to an object containing the post details
          { new: true }
        );

        console.log(newUserPost);


        return newUserPost;

      } catch (error) {
        console.error(error);
        throw new AuthenticationError("Failed to create a post!");
      }
    },
  },
};

module.exports = resolvers;
