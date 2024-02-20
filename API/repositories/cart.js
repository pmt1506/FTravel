import Carts from "../models/cart";

const addToCart = async ({ userID, serviceID }) => {
    try {
        const newCart = await Carts.create({ userID, serviceID });
        return newCart._doc;
    } catch {
        console.log(error.toString());
    }
}

const viewCart = async (userID) => {
    try {
        const populatedCart = await Carts.findOne({ _userID: userID })
            .populate('serviceID')
            .exec();

        return populatedCart._doc;
    } catch (error) {
        console.error(error.toString());
    }
};
const deleteFromCart = async (serviceID) => {
    try {
        return await Carts.deleteOne({ _serviceID: serviceID });
    } catch (error) {
        console.log(error.toString());
    }
};

export default {
    addToCart,
    viewCart,
    deleteFromCart
}