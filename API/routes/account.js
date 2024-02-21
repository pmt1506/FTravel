import express from "express";
import { accountController } from "../controller/index.js";

const accountRouter = express.Router();
//get all account
accountRouter.get("/all", accountController.getAllAccount);
//get account info by id
accountRouter.get("/:accID", accountController.getAccountByID);
//signup
accountRouter.post("/signup", accountController.createAccount);
//login route
accountRouter.post("/login", accountController.getAccountByEmailAndPass);
// edit profile user
accountRouter.patch("/profile/:accID", accountController.updateUserInfo);
// edit status user (admin)
accountRouter.patch("/accStatus/:accID", accountController.updateAccountStatus);
//
accountRouter.get("/all", accountController.getAllAccount);

export default accountRouter;
