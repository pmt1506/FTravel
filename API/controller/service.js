import { serviceDAO } from "../repositories/index.js";

const createService = async (req, res) => {
    try {
        const { title, thumbnail, slot, price, description, startDate, endDate, companyID, region, city, type, status } = req.body;

        const result = await serviceDAO.createService({
            title,
            thumbnail,
            slot,
            price,
            description,
            startDate,
            endDate,
            companyID,
            region,
            city,
            type,
            status
        });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
};

const getAllService = async (req,res) => {
    try {
        const allServices = await serviceDAO.getAllService();
        res.status(200).json(allServices);
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

export default{
    createService,
    getAllService
}