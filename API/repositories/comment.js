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

//edit comments
const editComment = async (id, content) => {
  try {
    const updateContent = await Comment.findByIdAndUpdate(id, content);
    if (!updateContent) {
      throw new Error("Comment cannot be empty");
    } else {
      return updateContent;
    }
  } catch (e) {
    throw new Error(e.toString());
  }
};

export default { addComment, getCommentsByServiceID, editComment };
