import { billDAO } from "../repositories/index.js";

// Bill Controller

// Add Bill
const addBill = async (req, res) => {
  const userID = req.cookies.userID;
  try {
    const { price, serviceID } = req.body;
    const isExisted = await billDAO.checkDubplicate(userID, serviceID);
    if (isExisted) {
      return res.status(409).json({
        error: "book roi ma ban",
      });
    }
    const newBill = await billDAO.addBill({ price, userID, serviceID });
    res.status(201).json({
      message: "book thanh cong",
      data: newBill,
    });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// Get Bills by UserID
const getBillsByUserId = async (req, res) => {
  try {
    // const { userID } = req.params;
    const userID = req.cookies.userID;
    const serviceBills = await billDAO.getBillsByUserId(userID);
    res.status(200).json(serviceBills);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

export default { addBill, getBillsByUserId };
