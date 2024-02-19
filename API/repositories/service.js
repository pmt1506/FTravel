import Services from "../models/service.js";

//Create a new service
const createService = async ({ title, thumbnail, slot, price, description, startDate, endDate, companyID, region, city, type, status }) => {
    try {
        const newService = await Services.create({ title, thumbnail, slot, price, description, startDate, endDate, companyID, region, city, type, status });
        return newService._doc; 
    } catch (error) {
        throw new Error(error.toString());
    }
}

//Get all services
const getAllService = async () => {
    try {
        const allServices = await Services.find();
        return allServices.map(service => service._doc);
    } catch (error) {
        throw new Error(error.toString());
    }
}

export default{
    createService,
    getAllService
}