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
const findAccountByEmail = async (email) => {
  try {
    const existAccount = await Accounts.findOne({ email: email });

    return existAccount;
  } catch (error) {
    throw new Error(error.message);
  }
};

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
  { email, phoneNumber, avatarIMG, userName, address }
) => {
  try {
    const updateAcc = await Accounts.findByIdAndUpdate(
      id,
      {
        email,
        phoneNumber,
        avatarIMG,
        userName,
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

// //edit user Profile
// const editPassword = async (
//   id,
//   { password }
// ) => {
//   try {
//     const updatePass = await Accounts.findByIdAndUpdate(
//       id,
//       {
//         password
//       },
//       { new: true }
//     );
//     if (!updatePass) throw new Error("not found to update");
//     return updatePass;
//   } catch (error) {
//     throw new Error(error.toString());
//   }
// };

const editPassword = async (id, { password }) => {
  try {
    // Validate input
    if (!password) {
      throw new Error("Password is required");
    }

    // Update password
    const updatePass = await Accounts.findByIdAndUpdate(
      id,
      { password },
      { new: true }
    );

    if (!updatePass) {
      throw new Error("Account not found");
    }

    return updatePass;
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
    const listAcc = await Accounts.find().populate().exec();

    // Destructure the account properties you want to keep
    const filteredAccounts = listAcc.map(({ createAt, updateAt, ...rest }) => {
      // Omit the 'password' property entirely
      const { password, ...filteredRest } = rest._doc;
      return filteredRest;
    });

    return filteredAccounts;
    // return await Accounts.find().populate().exec();
  } catch (error) {
    throw new Error(error.toString());
  }
};

export default {
  bannAccountByID,
  createAccount,
  editAccountByID,
  editPassword,
  findAccountByEmail,
  findAccountByEmailAndPassword,
  verifyAccount,
  getAccountInfoByID,
  getAllAccount,
};
