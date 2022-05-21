// const response = require("express/lib/response");
const { Post, User } = require("../models");

module.exports = {
  getPost(req, res) {
    Post.find()
      .then((posts) => res.json(posts))
      .catch((err) => res.status(500).json(err));
  },

  getOnePost(req, res) {
    Post.findOne({ _id: req.params.postId })
      .select("-__v")
      .then((post) =>
        !post ? res.status(404).json({ message: "Not found" }) : res.json(post)
      )
      .catch((err) => res.status(500).json(err));
  },

  createPost(req, res) {
    Post.create(req.body)
      .then((post) => {
        res.json(post);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  deletePost(req, res) {
    Post.findOneAndDelete({ _id: req.params.postId })
      .then((post) => {
        !post
          ? res.status(404).json({ message: "Not found" })
          : res.json({ message: "Deleted" });
        return User.findOneAndUpdate(
          {
            posts: req.params.postId,
          },
          {
            $pull: { posts: req.params.postId },
          },
          { new: true }
        );
      })
      .catch((err) => res.status(500).json(err));
  },

  updatePost(req, res) {
    Post.findOneAndUpdate(
      { _id: req.params.postId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((post) =>
        !post ? res.status(404).json({ message: "Not found" }) : res.json(post)
      )
      .catch((err) => res.status(500).json(err));
  },
};
