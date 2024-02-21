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
    accountType: {
      type: Schema.Types.ObjectId,
      ref: "accountTypes",
      require: true,
    },
    accountRole: {
      type: Schema.Types.ObjectId,
      ref: "roles",
      require: true,
    },
    avatarIMG: {
      type: String,
      required: [false],
      unique: [false],
    },
    username: {
      type: String,
      required: [true, "email is required"],
      unique: [false],
    },
    cccd: {
      type: String,
      required: [false],
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
