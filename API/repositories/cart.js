import Carts from "../models/cart.js";

const addToCart = async ({ userID, serviceID }) => {
  try {
    const newCart = await Carts.create({ userID, serviceID });
    return newCart;
  } catch (error) {
    throw error;
  }
};

const viewCart = async (userID, page = 1, pageSize = 5) => {
  try {
    const skip = (page - 1) * pageSize;
    const populatedCart = await Carts.find({ userID: userID })
      .populate("serviceID")
      .skip(skip)
      .limit(pageSize)
      .exec();
    return populatedCart;
  } catch (error) {
    throw error;
  }
};

const deleteFromCart = async (serviceID, userID) => {
  try {
    return await Carts.deleteOne({ serviceID: serviceID, userID: userID });
  } catch (error) {
    throw error;
  }
};

const checkDuplicate = async (userID, serviceID) => {
  try {
    const existingCart = await Carts.findOne({ userID, serviceID });
    return existingCart;
  } catch (error) {
    throw error;
  }
};

export default {
  addToCart,
  viewCart,
  deleteFromCart,
  checkDuplicate,
};
