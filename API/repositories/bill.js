import Bills from "../models/bill.js";

// Operation CRUD MONGODB -> Bill

//add bill
const addBill = async ({ price, userID, serviceID, status }) => {
  try {
    const newBill = await Bills.create({ price, userID, serviceID, status });
    return newBill._doc;
  } catch (error) {
    throw new Error(error.toString());
  }
};

// Get bills by userID
const getBillsByUserId = async (userID) => {
  try {
    const serviceBills = await Bills.find({ userID: userID }).exec();
    return serviceBills;
  } catch (error) {
    throw new Error(error.toString());
  }
};

export default {
  addBill,
  getBillsByUserId,
};
