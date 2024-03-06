import Accounts from "../models/account.js";
// import { accountDAO } from "./index.js";

//create new account
const createAccount = async ({ username, email, password, phoneNumber }) => {
  try {
    const newAccount = await Accounts.create({
      username,
      email,
      phoneNumber,
      password,
      status: true,
    });
    return newAccount;
  } catch (error) {
    throw new Error(error.toString());
  }
};

//find account by email
const findAccountByEmail = async () => {};

//Find account by email and password
const findAccountByEmailAndPassword = async (email, password) => {
  try {
    const foundAccount = await Accounts.findOne({
      email: email,
      password: password,
    }).exec();
    if (!foundAccount) return true;
    else return false;
  } catch (error) {
    throw new Error(error.toString());
  }
};

//verifyAccount
const verifyAccount = async () => {};

//ban account (admin)
const bannAccountByID = async (id, status) => {
  try {
    const updatedAccount = await Accounts.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
      }
    );
    if (!updatedAccount) throw new Error("not found to update");
    return updatedAccount;
  } catch (error) {
    throw new Error(error.toString());
  }
};

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
