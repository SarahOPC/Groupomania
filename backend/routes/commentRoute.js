const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const auth = require("../middleware/auth");

router.post('/:id/:postId/comment', auth, commentController.createComment);
router.delete('/:id/:postId/comment', auth, commentController.deleteComment);
router.get('/:id/:postId/comment', auth, commentController.getAllComments);

module.exports = router;