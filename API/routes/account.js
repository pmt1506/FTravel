import express from "express";
import { accountController } from "../controller/index.js";
import * as dotenv from "dotenv";
import auth from "../auth.js";
import passport from "passport";
import session from "express-session";
dotenv.config();

const accountRouter = express.Router();
//check if user loging?
function isLoggedin(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}
//config express session
const secretKey = process.env.secretKey;
accountRouter.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
accountRouter.use(passport.initialize());
accountRouter.use(passport.session());

//get all account
/**
 * @swagger
 * /account/all:
 *   get:
 *     summary: Get all accounts for admin
 *     tags: [Accounts]
 *   responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 *       500:
 *         description: Server fail
 */
accountRouter.get("/all", accountController.getAllAccount);
//get account info by id
/**
 * @swagger
 * /account/{accID}:
 *
 *   get:
 *
 *     summary: Get account info by ID
 *     tags: [Accounts]
 *     parameters:
 *       - name: accID
 *         in: path
 *         description: Account ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 *       500:
 *         description: Server fail
 */
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

accountRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
// google callback
accountRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  accountController.oauth2googleAuthen
);
//config login success
// accountRouter.get("/auth/protected", isLoggedin, (req, res) => {
//   let name = req.user.displayName;
//   console.log(req.user);
//   res.send(`hi there ${name}`);
// });
// login fail
// accountRouter.get("/auth/google/failure", (req, res) => {
//   res.send(" fail roi");
// });
// log out
accountRouter.use("/auth/logout", accountController.logOut);
export default accountRouter;
