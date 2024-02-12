import mongoose, { Schema } from "mongoose";
const roleSchema = new Schema(
  {
    roleName: {
      type: String,
      required: true,
    },
    roleID: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);
const Roles = mongoose.model("roles", roleSchema);
export default Roles;
