const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const auth = require("../middleware/auth");

router.post('/:id/comment', auth, commentController.createComment);
router.delete('/:id/comment', auth, commentController.deleteComment);
router.get('/:id/comment', auth, commentController.getAllComments);

module.exports = router;