import express from "express";
import { commentController } from "../controller/index.js";

const commentRouter = express.Router();

// Route to add a new comment

commentRouter.post("/add", commentController.addComment);

// Route to get comments by service ID

commentRouter.get("/:serviceID", commentController.getCommentsByServiceID);

//Route to edit comment by User
commentRouter.patch("/edit", commentController.editComment);

export default commentRouter;
