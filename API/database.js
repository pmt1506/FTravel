import mongoose from "mongoose";

const connectDB = () => {
  try {
    const db = mongoose.connect(process.env.URI_MONGODB);
    console.log("connect roi hahaha");
    return db;
  } catch (error) {
    console.log(error.toString());
    throw new Error(error.toString());
  }
};
export default connectDB;
