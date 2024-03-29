import { cartDAO } from "../repositories/index.js";

const addToCart = async (req, res) => {
  try {
    const { serviceID } = req.body;
    const userID = req.cookies.userID;

    if (!userID) {
      res.status(401).json({
        message: "Please login first",
      });
    }

    const isExisted = await cartDAO.checkDuplicate(userID, serviceID);

    if (!isExisted) {
      const result = await cartDAO.addToCart({ userID, serviceID });

      res.status(200).json({
        message: "Add to cart successfully",
        result,
      });
    } else {
      res.status(403).json({
        message: "Already in cart",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};

const viewCart = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;

    const listCart = await cartDAO.viewCart(req.cookies.userID, page, pageSize);

    res.status(200).json(listCart);
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

const deleteFromCart = async (req, res) => {
  try {
    const serviceID = req.body.serviceID;
    const userID = req.cookies.userID;

    res.status(200).json(await cartDAO.deleteFromCart(serviceID, userID));
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

export default {
  addToCart,
  viewCart,
  deleteFromCart,
};
