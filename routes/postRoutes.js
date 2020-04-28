const express = require("express");
const authController = require("./../controllers/authController");
const postController = require("./../controllers/postController");

const router = express.Router();

// Protects all routes after this one, puts user in req (req.user)
router.use(authController.protect);

router.patch("/like/:id", postController.addLike);
router.patch("/unlike/:id", postController.unlike);

router.post("/", postController.addPostToUser);
router.get("/", postController.getPosts);
router.get("/all", postController.getAllPosts);
router.get("/:id", postController.getPost);
router.delete("/:id", postController.deletePost);

router.patch("/addComment/:id", postController.addComment);
router.patch("/removeComment/:id/:commentId", postController.removeComment);

module.exports = router;
