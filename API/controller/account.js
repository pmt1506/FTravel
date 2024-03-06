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

export default {
  createAccount,
  getAccountByEmail,
  getAccountByEmailAndPass,
  getAccountByID,
  getAllAccount,
  updateAccountStatus,
  updateUserInfo,
  verifyAccount,
};
