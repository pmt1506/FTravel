import mongoose from "mongoose";

// Method connect to DB

const connectDB = () => {
    try {
        const db = mongoose.connect(process.env.URL_MONGODB);
        console.log("Connect success to DB");
        return db;
    } catch (error) {
        console.log(error.toString());
        throw new Error(error.toString())
    }
}
export default connectDB;