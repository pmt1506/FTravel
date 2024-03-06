import { Schema } from "mongoose";
import mongoose from "mongoose";

const billSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "accounts",
    },
    serviceID: {
      type: Schema.Types.ObjectId,
      ref: "services",
    },
    status: {
      type: Boolean,
      require: true,
    },
  },
  { timestamps: true }
);
const Bills = mongoose.model("bills", billSchema);
export default Bills;
