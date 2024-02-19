import mongoose from "mongoose";
// import ServiceTypes from "./models/serviceType.js";
// import Services from "./models/service.js";

const connectDB = async () => {
  try {
    const db = mongoose.connect(process.env.URI_MONGODB);
    console.log("Connect successfully");
    // await ServiceTypes.init();
    // await Services.init();
    // console.log("Schema mapping success");
    return db;
  } catch (error) {
    console.log(error.toString());
    throw new Error(error.toString());
  }
};
export default connectDB;
