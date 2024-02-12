import { Schema } from "mongoose";
import mongoose from "mongoose";

const cartSchema = new Schema(
  {
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
const Carts = mongoose.model("carts", cartSchema);
export default Carts;
