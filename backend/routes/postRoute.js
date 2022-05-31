const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const multer = require('multer');

// ajouter auth quand middleware sera fait
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getOnePost);
router.post('/:id/like', postController.ratingPost);

module.exports = router;