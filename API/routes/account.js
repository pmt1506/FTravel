import express from "express";
import { accountController } from "../controller/index.js";

const accountRouter = express.Router();
//get all account
accountRouter.get("/all", accountController.getAllAccount);
//get account info by id
accountRouter.get("/:accID", accountController.getAccountByID);
//signup
accountRouter.post("/signup", accountController.createAccount);
//get all account
accountRouter.post("/login", accountController.getAccountByEmailAndPass);
//get
accountRouter.get("/all", accountController.getAllAccount);
//get all account
accountRouter.get("/all", accountController.getAllAccount);

export default accountRouter;
