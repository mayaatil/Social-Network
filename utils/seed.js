const connection = require("../config/connection");
const { User, Post } = require("../models");
const { users, posts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  await Post.deleteMany({});
  await User.deleteMany({});

  await Post.collection.insertMany(posts);

  await User.collection.insertMany(users);

  console.table(posts);
  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
