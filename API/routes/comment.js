import express from "express";
import { commentController } from "../controller/index.js";

const commentRouter = express.Router();

// Route to add a new comment
/**
 * @swagger
 * /comment/add:
 *   post:
 *     summary: Add a new comment
 *     tags: [Comments]
 *     requestBody:
 *       description: Comment data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *     responses:
 *       200:
 *         description: Comment added successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
commentRouter.post("/add", commentController.addComment);

// Route to get comments by service ID
/**
 * @swagger
 * /comment/{serviceID}:
 *   get:
 *     summary: Get comments by service ID
 *     tags: [Comments]
 *     parameters:
 *       - name: serviceID
 *         in: path
 *         description: Service ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Service not found
 *       500:
 *         description: Server error
 */
commentRouter.get("/:serviceID", commentController.getCommentsByServiceID);

//Route to edit comment by User
//id is the commentID
/**
 * @swagger
 * /comment/edit/{id}:
 *   patch:
 *     summary: Edit a comment by User
 *     tags: [Comments]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Comment ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated comment data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */
commentRouter.patch("/edit/:id", commentController.editComment);

//Route to hide comment by Admin
//change content of comment
/**
 * @swagger
 * /comment/hide/{id}:
 *   patch:
 *     summary: Hide a comment by Admin
 *     tags: [Comments]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Comment ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated comment data (e.g., content change)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              content
 *     responses:
 *       200:
 *         description: Comment hidden successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */
commentRouter.patch("/hide/:id", commentController.markCommentAsViolatingTerms);
//Route to delete comment by commentID
/**
 * @swagger
 * /comment/delete/{id}:
 *   delete:
 *     summary: Delete a comment by comment ID
 *     tags: [Comments]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Comment ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */
commentRouter.delete("/delete/:id", commentController.deleteComment);

export default commentRouter;
