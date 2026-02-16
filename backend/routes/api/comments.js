/**
 * Comments API Routes
 * 
 * Provides endpoints for managing comments in the Anythink Market application.
 * Supports full CRUD operations on comments with error handling.
 * 
 * @module routes/api/comments
 * @requires express
 * @requires mongoose
 */

/**
 * GET /api/comments
 * Retrieves all comments from the database.
 * 
 * @async
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object[]} Array of comment objects
 * @throws {Error} Passes errors to error handling middleware
 */

/**
 * POST /api/comments
 * Creates a new comment in the database.
 * 
 * @async
 * @function
 * @param {Object} req - Express request object
 * @param {string} req.body.text - The comment text content
 * @param {string} req.body.author - The comment author name
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} The newly created comment object with generated ID
 * @throws {Error} Passes errors to error handling middleware
 */

/**
 * GET /api/comments/:id
 * Retrieves a single comment by its ID.
 * 
 * @async
 * @function
 * @param {Object} req - Express request object
 * @param {string} req.params.id - The MongoDB comment ID
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} The comment object if found
 * @returns {Object} 404 error if comment not found
 * @throws {Error} Passes errors to error handling middleware
 */

/**
 * PUT /api/comments/:id
 * Updates an existing comment by its ID.
 * 
 * @async
 * @function
 * @param {Object} req - Express request object
 * @param {string} req.params.id - The MongoDB comment ID
 * @param {string} req.body.text - Updated comment text content
 * @param {string} req.body.author - Updated comment author name
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} The updated comment object
 * @returns {Object} 404 error if comment not found
 * @throws {Error} Passes errors to error handling middleware
 */

/**
 * DELETE /api/comments/:id
 * Deletes a comment by its ID.
 * 
 * @async
 * @function
 * @param {Object} req - Express request object
 * @param {string} req.params.id - The MongoDB comment ID
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} Success message upon deletion
 * @returns {Object} 404 error if comment not found
 * @throws {Error} Passes errors to error handling middleware
 */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");
// Hey GitHub Copilot, can you help me write the routes for the comments API?
// GET /api/comments - Get all comments
router.get("/", async (req, res, next) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        next(err);
    }
});

// POST /api/comments - Create a new comment
router.post("/", async (req, res, next) => {
    try {
        const { text, author } = req.body;
        const newComment = new Comment({ text, author });
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (err) {
        next(err);
    }
});

// GET /api/comments/:id - Get a comment by ID
router.get("/:id", async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) return res.status(404).json({ error: "Comment not found" });
        res.json(comment);
    } catch (err) {
        next(err);
    }
});

// PUT /api/comments/:id - Update a comment by ID
router.put("/:id", async (req, res, next) => {
    try {
        const { text, author } = req.body;
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            { text, author },
            { new: true }
        );
        if (!updatedComment) return res.status(404).json({ error: "Comment not found" });
        res.json(updatedComment);
    } catch (err) {
        next(err);
    }
});

// DELETE /api/comments/:id - Delete a comment by ID
router.delete("/:id", async (req, res, next) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        if (!deletedComment) return res.status(404).json({ error: "Comment not found" });
        res.json({ message: "Comment deleted successfully" });
    } catch (err) {
        next(err);
    }
});
module.exports = router;
