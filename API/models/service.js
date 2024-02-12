import { Schema } from "mongoose";
import mongoose from "mongoose";

const serviceSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    thumbnail: {
      type: String,
      require: true,
    },
    slot: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    startDate: {
      type: Date,
      require: true,
    },
    endDate: {
      type: Date,
      require: true,
    },
    comment: [
      {
        type: Schema.Types.ObjectId,
        ref: "comments",
      },
    ],
    companyID: {
      type: Schema.Types.ObjectId,
      ref: "accounts",
      require: true,
    },
    region: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: "typeServices",
    },
    status: {
      type: Boolean,
      require: true,
    },
  },
  { timestamps: true }
);
const Services = mongoose.model("services", serviceSchema);
export default Services;
