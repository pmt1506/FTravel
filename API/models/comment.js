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
    serviceID: {
      type: Schema.Types.ObjectId,
      ref: "services",
    },
  },
  { timestamps: true }
);
const Comments = mongoose.model("comments", commentSchema);
export default Comments;
