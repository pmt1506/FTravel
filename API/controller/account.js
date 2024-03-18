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

//  edit account status
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
  console.log("haha");
  try {
    const { email, phoneNumber, avatarIMG, userName, address } = req.body;
    const updateAccount = await accountDAO.editAccountByID(id, {
      email,
      phoneNumber,
      avatarIMG,
      userName,
      address,
    });
    if (updateAccount !== null) {
      res.status(200).json({message: "Edit successfully!", data: updateAccount});
    }
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};

// get edit profile password
// const updatePassword = async (req, res) => {
//   const { id } = req.params;

//   console.log(id);
//   try {
//     const { password } = req.body;
//     const updatePassword = await accountDAO.editPassword(id, {
//       password,
//     });
    
//     if (updatePassword !== null) {
//       res.status(200).json({message: "Edit successfully!", data: updatePassword});
//     }
//   } catch (error) {
//     res.status(500).json({
//       error: error.toString(),
//     });
//   }
// };

const updatePassword = async (req, res) => {
  const { accID } = req.params;

  try {
    const { password } = req.body;

    // Call DAO function to update password
    const updatePassword = await accountDAO.editPassword(accID, { password });

    // Send response
    res.status(200).json({ message: "Password updated successfully", data: updatePassword });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.toString() });
  }
};

// get verify account
const verifyAccount = async (req, res) => {};

// find account by email
const getAccountByEmail = async (req, res) => {};

// find account by email and password
const getAccountByEmailAndPass = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
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
      { userId: foundAccount._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1hr",
      }
    );
    const refreshToken = jwt.sign(
      { userId: foundAccount._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1w",
      }
    );
    const { createdAt, updatedAt, ...filterAcc } = foundAccount._doc;
    delete filterAcc.password;
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
      message: "Login success, welcome home",
      data: filterAcc,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
//create access token
function genAccessToken(id) {
  return jwt.sign(id, process.env.JWT_SECRET_KEY, {
    expiresIn: "30s",
  });
}
//refresh token
let refreshTokenArr = [];
const refreshTokenHa = async (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null)
    return res.status(401).json({ error: "ko co refresh token b oi" });
  if (!refreshTokenArr.includes(refreshToken)) {
    return res.status(403).json({ error: "m la ai ma trom duoc ref cua t" });
  }
  jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, (err, id) => {
    if (err) {
      return res.status(403).json({ error: "m la ai ma trom duoc ref cua t" });
    }
    const accessToken = jwt.sign(id, process.env.JWT_SECRET_KEY, {});
    res.json({ accessToken: accessToken });
  });
};
//add new account
const createAccount = async (req, res) => {
  const { userName, password, rePassword, email, phoneNumber } = req.body;
  if (
    userName.length == 0 ||
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
      userName,
      phoneNumber,
      email,
      password: hashedPassword,
    });
    res.status(200).json({ message: "create success,Please login " });
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};
const oauth2googleAuthen = async (req, res) => {
  // console.log(req.user._doc);
  // console.log("haha");
  try {
    const oauth2Result = await req.user;
    // console.log("haha2");

    // console.log(oauth2Result._doc.email);
    if (oauth2Result && oauth2Result.error) {
      return res.status(400).json({ error: oauth2Result.error });
    }
    // console.log("haha3");

    const foundAccount = await accountDAO.findAccountByEmail(
      oauth2Result._doc.email
    );
    // console.log("haha4");

    // delete req.sess
    if (!foundAccount) {
      // const newAcc= await accountDAO.createAccount(req.user.displayname)
      return res.status(404).json({ error: "User not found in the database" });
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
    return res.redirect("http://localhost:3000");
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
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }

      /////////////
      try {
        const existingUser = await accountDAO.findAccountByEmail(
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
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const generateRandomPassword = () => {
  // Generate a random string with specified length
  const length = 10;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let newPassword = "";
  for (let i = 0; i < length; i++) {
    newPassword += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return newPassword;
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
  updatePassword,
  verifyAccount,
  oauth2googleAuthen,
  googleLogin,
  refreshTokenHa,
};
