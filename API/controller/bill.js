import { billDAO } from "../repositories/index.js";

// Bill Controller

// Add Bill
const addBill = async (req, res) => {
  try {
    const { price, userID, serviceID, status } = req.body;
    const newBill = await billDAO.addBill({ price, userID, serviceID, status });
    res.status(201).json(newBill);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// Get Bills by UserID
const getBillsByUserId = async (req, res) => {
  try {
    const { userID } = req.params;
    const serviceBills = await billDAO.getBillsByUserId(userID);
    res.json(serviceBills);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

export default { addBill, getBillsByUserId };
