import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connectDB from "./database.js";
import serviceTypeRouter from "./routes/serviceType.js";
import serviceRouter from "./routes/service.js";
import { json } from "express";

import { billRouter, commentRouter } from "./routes/index.js";
import reportRouter from "../API/routes/report.js";
import { cartRouter } from "./routes/index.js";
import auth from "./auth.js";
import passport from "passport";
import session from "express-session";
import { accountRouter } from "./routes/index.js";

const app = express();
app.use(express.json());

app.use(json());
app.use(cors());
dotenv.config();
//check if ủe loging?
function isLoggedin(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.use(`/cart`, cartRouter);
//config express session
app.use(
  session({
    secret: process.env.secret_key,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("muahahsss");
});

app.use(`/bill`, billRouter);

app.use("/comment", commentRouter);
app.use(`/report`, reportRouter);
app.use("/type", serviceTypeRouter);
app.use("/service", serviceRouter);
app.use("/account", accountRouter);

//passport authenticate
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
// google callback
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/protected",
    failureRedirect: "/auth/google/failure",
  })
);
//config login success
app.get("/auth/protected", isLoggedin, (req, res) => {
  let name = req.user.displayName;
  console.log(req.user);
  res.send(`hi there ${name}`);
});
// login fail
app.get("/auth/google/failure", (req, res) => {
  res.send(" fail roi");
});
// log out
app.use("/auth/logout", (req, res) => {
  req.session.destroy();
  res.send("bye");
});

app.listen(PORT, async () => {
  connectDB();
  console.log(`Server is running on port ${PORT} `);
});
