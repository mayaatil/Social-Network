const router = require("express").Router();
const {
  getPost,
  getOnePost,
  createPost,
  deletePost,
  updatePost,
} = require("../../controllers/postController");

router.route("/").get(getPost).post(createPost);

router.route("/:postId").get(getOnePost).delete(deletePost).put(updatePost);

module.exports = router;
