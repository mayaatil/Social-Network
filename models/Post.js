const { Schema, model } = require("mongoose");
const dateFormat = require("./../utils/dateFormat");
const reactionSchema = require("./Reaction");

const postSchema = new Schema(
  {
    myPost: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

postSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Post = model("post", postSchema);

module.exports = Post;
