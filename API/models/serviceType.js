import { Schema } from "mongoose";
import mongoose from "mongoose";

const serviceTypesSchema = new Schema(
  {
    serviceName: {
      type: String,
      require: [true, "Service name must be required and unique"],
      unique: true,
    },
    serviceID: {
      type: String,
      require: true,
      unique: true,
    }
  },
  { timestamps: true }
);
const ServiceTypes = mongoose.model("typeServices", serviceTypesSchema);
export default ServiceTypes;
