import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connectDB from "./database.js";
import serviceTypeRouter from "./routes/serviceType.js";
import serviceRouter from "./routes/service.js";
import { json } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { billRouter, commentRouter } from "./routes/index.js";
import reportRouter from "../API/routes/report.js";
import { cartRouter } from "./routes/index.js";

import { accountRouter } from "./routes/index.js";

const app = express();
app.use(express.json());

app.use(json());
app.use(cors());
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

app.use(`/cart`, cartRouter);
//config express session
// app.use(
  // session({
  //   secret: process.env.secret_key,
  //   resave: false,
  //   saveUninitialized: true,
  //   cookie: { secure: false },
  // })
// );
// app.use(passport.initialize());
// app.use(passport.session());
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
