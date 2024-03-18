import mongoose, { Schema } from "mongoose";
const AccountSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email already exist"],
    },
    phoneNumber: {
      type: String,
      required: [false],
      unique: [true, "phone already exist"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      unique: [false],
    },
    accountRole: {
      type: Schema.Types.ObjectId,
      ref: "roles",
      required: true,
    },
    avatarIMG: {
      type: String,
      required: [false],
      unique: [false],
    },
    userName: {
      type: String,
      required: [true, "email is required"],
      unique: [false],
    },
    verify: {
      type: Boolean,
    },
    cccd: {
      type: String,
      required: false,
      unique: [false, "cccd already exist"],
    },
    address: {
      type: String,
      required: [false],
      unique: [false],
    },
    status: {
      type: Boolean,
      required: [true, "status is required"],
      unique: [false],
    },
  },
  { timestamps: true }
);

const Accounts = mongoose.model("accounts", AccountSchema);
export default Accounts;
