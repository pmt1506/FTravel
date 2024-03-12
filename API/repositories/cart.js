import Carts from "../models/cart.js";

const addToCart = async ({ userID, serviceID }) => {
  try {
    const newCart = await Carts.create({ userID, serviceID });
    return newCart;
  } catch {
    console.log(error.toString());
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
    console.error(error.toString());
    throw error; // Re-throw the error to be caught in the calling function
  }
};

const deleteFromCart = async (serviceID) => {
  try {
    return await Carts.deleteOne({ serviceID: serviceID });
  } catch (error) {
    console.log(error.toString());
  }
};

export default {
  addToCart,
  viewCart,
  deleteFromCart,
};
