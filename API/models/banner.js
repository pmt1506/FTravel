import { Schema } from "mongoose";
import mongoose from "mongoose";

const bannerSchema = new Schema({}, { timestamps: true });
const Banners = mongoose.model("banners", bannerSchema);
export default Banners;
