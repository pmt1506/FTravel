import express from "express";
import { billController } from "../controller/index.js";

const billRouter = express.Router();

// Route to add a new bill
billRouter.post("/add", billController.addBill);

// Route to get bills by service ID
billRouter.get("/history/:userID", billController.getBillsByUserId);

export default billRouter;
