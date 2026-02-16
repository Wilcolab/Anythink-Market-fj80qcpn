/**
 * Express router for handling comment-related API endpoints.
 * Provides functionality to retrieve comments for a specific post and create new comments.
 * 
 * @module routes/api/comments
 * @requires express
 * @requires mongoose
 */

/**
 * GET /:postId
 * Retrieves all comments for a specific post.
 * Populates the userId field with the username of the comment author.
 * 
 * @async
 * @route GET /:postId
 * @param {Object} req - Express request object
 * @param {string} req.params.postId - The ID of the post to fetch comments for
 * @param {Object} res - Express response object
 * @returns {Object[]} Array of comment objects with userId populated as username
 * @throws {Error} 500 - Failed to fetch comments
 */

/**
 * POST /
 * Creates a new comment for a post.
 * 
 * @async
 * @route POST /
 * @param {Object} req - Express request object
 * @param {string} req.body.postId - The ID of the post to comment on
 * @param {string} req.body.userId - The ID of the user creating the comment
 * @param {string} req.body.content - The text content of the comment
 * @param {Object} res - Express response object
 * @returns {Object} The newly created comment object
 * @throws {Error} 500 - Failed to create comment
 */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).populate(
      "userId",
      "username"
    );
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

router.post("/", async (req, res) => {
    const { postId, userId, content } = req.body;
    try {
        const newComment = new Comment({ postId, userId, content });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(500).json({ error: "Failed to create comment" });
    }
});
module.exports = router;
