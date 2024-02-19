import { billDAO } from "../repositories.js";

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

// Get Bills by Service ID
const getBillsByServiceId = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const serviceBills = await billDAO.getBillsByServiceId(serviceId);
    res.json(serviceBills);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

export default { addBill, getBillsByServiceId };
