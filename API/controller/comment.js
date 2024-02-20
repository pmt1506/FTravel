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
      res.status(201).json(editedComment);
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

export default { addComment, getCommentsByServiceID, editComment };
