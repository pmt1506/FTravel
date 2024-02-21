import express from "express";
import reportController from "../controller/report.js";

const reportRouter = express.Router();

reportRouter.get("/", reportController.viewAllReport);

reportRouter.post("/create", reportController.createReport);

reportRouter.patch("/edit/:id", reportController.editReport);

export default reportRouter;