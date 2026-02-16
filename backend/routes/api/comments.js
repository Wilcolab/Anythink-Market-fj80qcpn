const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

// GET comments by postId
router.get("/:postId", (req, res) => {
  Comment.find({ postId: req.params.postId })
    .then((comments) => {
      res.json(comments);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// POST create new comment
router.post("/", (req, res) => {
  const { postId, author, content } = req.body;

  const newComment = new Comment({
    postId,
    author,
    content,
  });

  newComment
    .save()
    .then((savedComment) => {
      res.status(201).json(savedComment);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// DELETE comment by commentId
router.delete("/:commentId", (req, res) => {
  Comment.findByIdAndDelete(req.params.commentId)
    .then((deletedComment) => {
      if (!deletedComment) {
        return res.status(404).json({ error: "Comment not found" });
      }
      res.json({ message: "Comment deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
