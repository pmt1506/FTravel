import Bills from "../models/bill.js";

// Operation CRUD MONGODB -> Bill

//add bill
const addBill = async ({ price, userID, serviceID }) => {
  try {
    const newBill = await Bills.create({
      price,
      userID,
      serviceID,
      status: true,
    });
    return newBill._doc;
  } catch (error) {
    throw new Error(error.toString());
  }
};

// Get bills by userID
const getBillsByUserId = async (userID) => {
  try {
    const serviceBills = await Bills.find({ userID: userID })
      .populate("userID")
      .populate("serviceID")
      .exec();
    return serviceBills;
  } catch (error) {
    throw new Error(error.toString());
  }
};

export default {
  addBill,
  getBillsByUserId,
};
