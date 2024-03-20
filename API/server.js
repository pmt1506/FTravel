import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connectDB from "./database.js";
import serviceTypeRouter from "./routes/serviceType.js";
import serviceRouter from "./routes/service.js";
import { json } from "express";
import cookieParser from "cookie-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { billRouter, commentRouter } from "./routes/index.js";
import reportRouter from "../API/routes/report.js";
import { cartRouter } from "./routes/index.js";
import { accountRouter } from "./routes/index.js";
const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(json());
app.use(
  cors({
    origin: "http://localhost:3000", // Only allow requests from this origin
    methods: "GET,HEAD, POST, PATCH, DELETE", // Only allow specific HTTP methods
    // preflightContinue: true,
    credentials: true,
  })
);
dotenv.config();
//swagger config
const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "FTravel api",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:9999/" }],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//routes
app.use("/cart", cartRouter);

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("muahahsss");
});

app.use("/bill", billRouter);

app.use("/comment", commentRouter);
app.use("/report", reportRouter);
app.use("/type", serviceTypeRouter);
app.use("/service", serviceRouter);
app.use("/account", accountRouter);

//passport authenticate

app.listen(PORT, async () => {
  connectDB();
  console.log(`Server is running on port ${PORT} `);
});
