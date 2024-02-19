import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connectDB from "./database.js";
import serviceTypeRouter from "./routes/serviceType.js";
import serviceRouter from "./routes/service.js";
import { json } from "express";

const app = express();
app.use(express.json());

app.use(json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT;

app.get("/", (res, req) => {
  res.send("welcome kkk");
});

app.use('/type', serviceTypeRouter);
app.use('/service', serviceRouter);

app.listen(PORT, async () => {
  connectDB();
  console.log(`Server is running on port ${PORT} `);
});
