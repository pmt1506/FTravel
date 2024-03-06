import ServiceTypes from "../models/serviceType.js";

const getAllServiceType = async () => {
    try {
        const allServiceType = await ServiceTypes.find();
        return allServiceType.map(service => service._doc);
    } catch (error) {
        throw new Error(error.toString());
    }
}

export default {
    getAllServiceType
}