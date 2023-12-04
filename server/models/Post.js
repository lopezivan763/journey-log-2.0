const { Schema, Types } = require('mongoose');

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: Types.ObjectId, 
      ref: 'User', 
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = postSchema;
