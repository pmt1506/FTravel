import Comment from "../models/comment.js";

// Operation CRUD MONGODB -> Comment

//add comment

const addComment = async ({ content, userID, serviceID }) => {
  try {
    const newComment = await Comment.create({ content, userID, serviceID });
    return newComment._doc;
  } catch (error) {
    throw new Error(error.toString());
  }
};

//get comments by serviceID

const getCommentsByServiceID = async (serviceID) => {
  try {
    const serviceComments = await Comment.find({ serviceID: serviceID }).exec();
    return serviceComments;
  } catch (error) {
    throw new Error(error.toString());
  }
};

//edit comment
const editComment = async (id, content) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );
    if (!updatedComment) {
      throw new Error("Comment not found");
    }
    return updatedComment;
  } catch (error) {
    throw new Error(error.toString());
  }
};

//mark as violating comments
const markCommentAsViolatingTerms = async (commentId) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { content: "This comment is violating our Terms" },
      { new: true }
    );

    if (!updatedComment) {
      throw new Error("Comment not found");
    }

    return updatedComment;
  } catch (error) {
    throw new Error(error.toString());
  }
};

//delete comment by id

const deleteComment = async (id) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      throw new Error("Comment not found");
    }
    return deletedComment;
  } catch (error) {
    throw new Error(error.toString());
  }
};

export default {
  addComment,
  getCommentsByServiceID,
  editComment,
  deleteComment,
  markCommentAsViolatingTerms,
};
