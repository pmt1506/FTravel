import { commentDAO } from "../repositories/index.js";

// Comment Controller

// Add Comment
const addComment = async (req, res) => {
  try {
    const { content, userID, serviceID } = req.body;
    const newComment = await commentDAO.addComment({
      content,
      userID,
      serviceID,
    });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

//Get comments by serviceID use req,res

const getCommentsByServiceID = async (req, res) => {
  try {
    const { serviceID } = req.params;
    const serviceComments = await commentDAO.getCommentsByServiceID(serviceID);
    res.status(201).json(serviceComments);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

//Edit comments

const editComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { id } = req.params;
    const editedComment = await commentDAO.editComment(id, content);
    if (!editedComment || !content) {
      throw new Error("Comment cannot be empty");
    } else {
      res.status(200).json(editedComment);
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const markCommentAsViolatingTerms = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedComment = await commentDAO.markCommentAsViolatingTerms(id);

    if (!updatedComment || updatedComment.content === undefined) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Log a message indicating that the comment has been marked as violating terms
    console.log(`Comment with ID ${id} has been marked as violating terms`);

    res.status(200).json(updatedComment);
  } catch (error) {
    console.error("Error in markCommentAsViolatingTerms:", error);
    res.status(500).json({ error: error.toString() });
  }
};

//Delete comments

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = await commentDAO.deleteComment(id);

    if (!deletedComment || deletedComment.content === undefined) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Log a message indicating that the comment has been deleted
    console.log(`Comment with ID ${id} has been deleted`);

    res.status(204).send(); // 204 No Content - Indicating successful deletion without a response body
  } catch (error) {
    console.error("Error in deleteComment:", error);
    res.status(500).json({ error: error.toString() });
  }
};

export default {
  addComment,
  getCommentsByServiceID,
  editComment,
  deleteComment,
  markCommentAsViolatingTerms,
};
