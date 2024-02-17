import Accounts from "../models/account.js";

//create new account
const createAccount = async () => {};

//find account by email
const findAccountByEmail = async () => {};

//Find account by email and password
const findAccountByEmailAndPassword = async () => {};

//verifyAccount
const verifyAccount = async () => {};

//ban account (admin)
const bannAccountByID = async () => {};

//edit user Profile
const editAccountByID = async () => {};

// view profile user
const getAccountInfoByID = async () => {};

// view list account
const getAllAccount = async () => {
  try {
    return await Accounts.find().populate().exec();
  } catch (error) {
    throw new Error(error.toString());
  }
};

export default {
  bannAccountByID,
  createAccount,
  editAccountByID,
  findAccountByEmail,
  findAccountByEmailAndPassword,
  verifyAccount,
  getAccountInfoByID,
  getAllAccount,
};
