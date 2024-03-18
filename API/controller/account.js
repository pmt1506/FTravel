import { accountDAO } from "../repositories/index.js";

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
  try {
    const found = await accountDAO.findAccountByEmailAndPassword(
      email,
      password
    );

    if (!found) res.status(200).json({ message: "user login" });
    else res.status(401).json({ message: "not login" });
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};

//add new account
const createAccount = async (req, res) => {
  const { username, password, email, phoneNumber } = req.body;
  try {
    const rs = await accountDAO.createAccount({
      username,
      phoneNumber,
      email,
      password,
    });
    res.status(200).json(rs);
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
    // res.json({ message: "Login Successful, welcome back", data: oauth2Result });
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
export default {
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
};
