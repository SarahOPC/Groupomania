const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const auth = require("../middleware/auth");
const fileUploader = require("../middleware/fileUploader");

router.post('/:id', auth, fileUploader.saveFile, postController.createPost);
router.put('/:id/:postId', auth, fileUploader.saveFile, postController.updatePost);
router.delete('/:id/:postId', auth, postController.deletePost);
router.get('/', auth, postController.getAllPosts);
router.get('/:id/:postId', auth, postController.getOnePost);
router.post('/:id/like', auth, postController.ratingPost);

module.exports = router;