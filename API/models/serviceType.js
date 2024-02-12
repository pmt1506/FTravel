import { Schema } from "mongoose";
import mongoose from "mongoose";

const serviceTypesSchema = new Schema(
  {
    serviceName: {
      type: String,
      require: [true, "must be unique"],
      unique: true,
    },
    serviceID: {
      type: String,
      require: true,
      unique: true,
    },
    status: {
      type: Boolean,
      require: true,
    },
  },
  { timestamps: true }
);
const ServiceTypes = mongoose.model("serviceTypess", serviceTypesSchema);
export default ServiceTypes;
