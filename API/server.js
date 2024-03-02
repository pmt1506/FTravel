import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connectDB from "./database.js";
import { cartRouter } from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.use(`/cart`, cartRouter)
const PORT = process.env.PORT;

app.get("/", (res, req) => {
  res.send("welcome kkk");
});
app.listen(PORT, async () => {
  connectDB();
  console.log(`Server is running on port ${PORT} `);
});
