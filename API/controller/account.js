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
    res.status(4044).json({
      message: "not found",
    });
  }
};

// get accouny info by ID
const getAccountByID = async (req, res) => {};

// get edit status account
const updateAccountStatus = async (req, res) => {};

// get edit profile user
const updateUserInfo = async (req, res) => {};

// get verify account
const verifyAccount = async (req, res) => {};

// find account by email
const getAccountByEmail = async (req, res) => {};

// find account by email and password
const getAccountByEmailAndPass = async (req, res) => {};

//add new account
const createAccount = async (req, res) => {};

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
