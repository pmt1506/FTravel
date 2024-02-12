import mongoose, { Schema } from "mongoose";

const reportSchema = new Schema(
  {
    content: {
      type: String,
      require: [true, "must not leave emty"],
    },
    serviceID: {
      type: Schema.Types.ObjectId,
      ref: "services",
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: "accounts",
    },
  },
  { timestamps: true }
);
const Reports = mongoose.model("reports", reportSchema);
export default Reports;
