const { User, Post } = require("../models"); // Make sure to import the Post model
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("posts");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('posts');
    },
    me: async (parent, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('posts');
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    post: async (parent, { postId }) => {
      return Post.findById({ _id: postId });
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
      if (context.user) {
        const post = await Post.create({
          title,
          body,
          author: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { posts: post._id } }
        );
        console.log(post);

        return post;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
    removePost: async (parent, { postId }, context) => {
      if (context.user) {
        const post = await Post.findOneAndDelete({
          _id: postId,
          author: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { posts: post._id } }
        );

        return post;
      }
      throw AuthenticationError;
      
      // try {
      //   if (!context.user) {
      //     throw new AuthenticationError('You need to be logged in!');
      //   }
    
      //   const user = await User.findOneAndUpdate(
      //     { _id: context.user._id },
      //     { $pull: { posts: { _id: postId } } },
      //     { new: true }
      //   ).populate('posts');
    
      //   if (!user) {
      //     throw new Error('User not found');
      //   }
    
      //   return user;
      // } catch (error) {
      //   console.error(error);
      //   throw new AuthenticationError('Failed to delete the post!');
      // }
    },

    addComment: async (parent, { postId, commentText }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    
    deleteComment: async (parent, { postId, commentId }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};



module.exports = resolvers;
