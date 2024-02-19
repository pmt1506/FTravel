import Bills from "../models/bill.js";

// Operation CRUD MONGODB -> Bill

//add bill
const addBill = async ({ price, userID, serviceID, status }) => {
  try {
    const newBill = await Bills.create({ price, userID, serviceID, status });
    return newBill._doc;
  } catch (error) {
    console.log(error.toString());
  }
};

// Get bills by service ID
const getBillsByServiceId = async (serviceId) => {
  try {
    const serviceBills = await Bills.find({ serviceID: serviceId }).populate(
      "userID"
    );
    return serviceBills;
  } catch (error) {
    console.log(error.toString());
  }
};

export default {
  addBill,
  getBillsByServiceId,
};