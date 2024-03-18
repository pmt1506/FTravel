import Accounts from "../models/account.js";
// import { accountDAO } from "./index.js";
import bcrypt from "bcrypt";

//create new account
const createAccount = async ({ userName, email, password, phoneNumber }) => {
  try {
    const newAccount = await Accounts.create({
      userName,
      email,
      phoneNumber,
      password,
      accountRole: "65e2ea90d9e75d25d6a2b09a",
      status: true,
      avatarIMG: "https://i.ibb.co/19p9565/avt-FTravel.jpg",
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
const createAccountFromGoogle = async (googleData) => {
  console.log(googleData.displayname);
  try {
    const newpass = generateRandomPassword();
    const salt = bcrypt.genSaltSync(parseInt(10));
    const hashedPassword = bcrypt.hashSync(newpass, salt);
    const newAcc = await createAccount({
      userName: googleData.displayname,
      email: googleData.email,
      phoneNumber: "999999 999",
      password: hashedPassword,
    });
    return newAcc;
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

//ban account (admin) ------ nen doi thanh updateAccountStatusByID 
const bannAccountByID = async (id, status) => {
  try {
    const updatedAccount = await Accounts.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
      }
    ).populate("accountRole", "roleName");
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
  console.log(id);
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
    const fo = await Accounts.findById(id).exec();
    const { createAt, password, updateAt, ...fil } = fo._doc;
    return fil;
  } catch (error) {
    throw new Error(error.toString());
  }
};

// view list account
const getAllAccount = async () => {
  try {
    const listAcc = await Accounts.find().populate("accountRole").exec();

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
  createAccountFromGoogle,
};
