import { accountDAO } from "../repositories/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

// get all account
const getAllAccount = async (req, res) => {
  const listAccount = await accountDAO.getAllAccount();
  try {
    if (listAccount.length > 0) {
      res.status(200).json(listAccount);
    } else {
      res.status(401).json({
        message: "not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "not found",
    });
  }
};

// get accouny info by ID
const getAccountByID = async (req, res) => {
  const id = req.params.accID;
  try {
    const accProfile = await accountDAO.getAccountInfoByID(id);
    if (accProfile !== null) {
      res.status(200).json(accProfile);
    } else {
      res.status(404).json({
        message: `not found $${id}`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "not found",
    });
  }
};

// get edit status account
const updateAccountStatus = async (req, res) => {
  const id = req.params.accID;
  const accStatus = req.body.status;
  const newStat = !accStatus;
  try {
    const updateAccount = await accountDAO.bannAccountByID(id, newStat);
    if (updateAccount !== null) {
      res.status(200).json(updateAccount);
    }
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};
// get edit profile user
const updateUserInfo = async (req, res) => {
  const id = req.params.accID;
  try {
    const { email, phoneNumber, avatarIMG, username, address } = req.body;
    const updateAccount = await accountDAO.editAccountByID(id, {
      email,
      phoneNumber,
      avatarIMG,
      username,
      address,
    });
    if (updateAccount !== null) {
      res.status(200).json(updateAccount);
    }
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};

// get verify account
const verifyAccount = async (req, res) => {};

// find account by email
const getAccountByEmail = async (req, res) => {};

// find account by email and password
const getAccountByEmailAndPass = async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundAccount = await accountDAO.findAccountByEmail(email);
    if (!foundAccount) {
      return res.status(400).json({ error: " email not found" });
    }
    const matchPassword = bcrypt.compareSync(password, foundAccount.password);
    if (!matchPassword) {
      return res.status(400).json({ error: "wrong password" });
    }
    const accessToken = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1hr",
      }
    );
    const refreshToken = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1w",
      }
    );
    const { createdAt, updatedAt, ...filterAcc } = foundAccount._doc;
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      path: "/",
      expires: new Date(Date.now() + 60 * 60 * 1000), //1hr
      sameSite: "lax",
      secure: false,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), //1week
      sameSite: "lax",
      secure: false,
    });
    return res
      .status(200)
      .json({ message: "Login success, welcome home", data: filterAcc });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  // try {
  //   const found = await accountDAO.findAccountByEmailAndPassword(
  //     email,
  //     password
  //   );

  //   if (!found) res.status(200).json({ message: "user login" });
  //   else res.status(401).json({ message: "not login" });
  // } catch (error) {
  //   res.status(500).json({
  //     error: error.toString(),
  //   });
  // }
};

//add new account
const createAccount = async (req, res) => {
  const { username, password, rePassword, email, phoneNumber } = req.body;
  if (
    username.length == 0 ||
    email.length == 0 ||
    phoneNumber.length == 0 ||
    password.length == 0
  ) {
    return res.status(400).json({ error: " fill all the fields please" });
  }
  if (rePassword !== password) {
    return res
      .status(400)
      .json({ error: "Confirm password not match, please check" });
  }
  const existUser = await accountDAO.findAccountByEmail(email);
  if (existUser) {
    return res.status(400).json({ error: "email already sign up" });
  }
  const salt = bcrypt.genSaltSync(parseInt(10));
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const rs = await accountDAO.createAccount({
      username,
      phoneNumber,
      email,
      hashedPassword,
    });
    res.status(200).json({ message: "create success" });
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};
const oauth2googleAuthen = async (req, res) => {
  try {
    const oauth2Result = await req.user;
    if (oauth2Result && oauth2Result.error) {
      return res.status(400).json({ error: oauth2Result.error });
    }
    const accessToken = jwt.sign(
      { userId: oauth2Result._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1hr",
      }
    );
    const refreshToken = jwt.sign(
      { userId: oauth2Result._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1w",
      }
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      path: "/",
      expires: new Date(Date.now() + 60 * 60 * 1000),
      sameSite: "lax",
      secure: false,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      sameSite: "lax",
      secure: false,
    });
    return res.redirect("http://localhost:3000/oauth2Redirect");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const googleLogin = async (req, res) => {
  try {
    const token = req.body.token;
    if (!token) {
      return res
        .status(400)
        .json({ error: "No Token was provided, please try again" });
    }
    jwt.verify(
      token,
      getKey,
      { algorithms: ["RS256"] },
      async (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ error: "Invalid token" });
        }

        try {
          const existingUser = await AuthenticateRepository.getUserByEmail(
            decodedToken.email
          );
          if (!existingUser) {
            return res.status(400).json({ error: "Email not found" });
          }
          const accessToken = jwt.sign(
            { userId: existingUser._id },
            process.env.JWT_SECRET_KEY,
            {
              expiresIn: "1hr",
            }
          );

          const refreshToken = jwt.sign(
            { userId: existingUser._id },
            process.env.JWT_SECRET_KEY,
            {
              expiresIn: "1w",
            }
          );

          const { createdAt, updatedAt, password, ...filteredUser } =
            existingUser._doc;

          res.cookie("accessToken", accessToken, {
            httpOnly: true,
            path: "/",
            expires: new Date(Date.now() + 60 * 60 * 1000),
            sameSite: "lax",
            secure: false,
          });

          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            path: "/",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            sameSite: "lax",
            secure: false,
          });

          return res.status(200).json({
            message: "Login successfully! Welcome back",
            data: filteredUser,
          });
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const logOut = async (req, res) => {
  try {
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    return res.status(200).json({ message: "Logged Out" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export default {
  logOut,
  createAccount,
  getAccountByEmail,
  getAccountByEmailAndPass,
  getAccountByID,
  getAllAccount,
  updateAccountStatus,
  updateUserInfo,
  verifyAccount,
  oauth2googleAuthen,
  googleLogin,
};
