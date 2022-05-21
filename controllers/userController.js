const { ObjectId } = require("mongoose").Types;
// const res = require("express/lib/response");
const { User } = require("../models");

module.exports = {
  getAllUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObject = {
          users,
        };
        return res.json(userObject);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "Not found" })
          : res.json({
              user,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // delte a user by id
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "Not found." })
          : res.json({ message: "Deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },
  // update a user by id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user ? res.status(404).json({ message: "Not found." }) : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
