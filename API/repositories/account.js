import Accounts from "../models/account.js";
// import { accountDAO } from "./index.js";

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
const editAccountByID = async (
  id,
  { email, phoneNumber, avatarIMG, username, address }
) => {
  try {
    const updateAcc = await Accounts.findByIdAndUpdate(
      id,
      {
        email,
        phoneNumber,
        avatarIMG,
        username,
        address,
      },
      { new: true }
    );
    if (!updateAcc) throw new Error("not found to update");
    return updateAcc;
  } catch (error) {
    throw new Error(error.toString());
  }
};
// view profile user
const getAccountInfoByID = async (id) => {
  try {
    return await Accounts.findById(id).exec();
  } catch (error) {
    throw new Error(error.toString());
  }
};

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
