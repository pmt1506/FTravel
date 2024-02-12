import { Schema } from "mongoose";
import mongoose from "mongoose";

const commentSchema = new Schema(
  {
    content: {
      type: String,
      require: true,
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: "accounts",
    },
  },
  { timestamps: true }
);
const Comments = mongoose.model("comments", commentSchema);
export default Comments;
