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
        //pagination
        const page = req.query.page || 1; // Trang mặc định là 1 nếu không fix
        const pageSize = req.query.pageSize || 10; //Số lượng hiển thị trên trang là 10 nếu không fix
        const allServices = await serviceDAO.getAllService(page, pageSize);
        res.status(200).json({allServices, page, total: allServices.length});
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