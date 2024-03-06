import { serviceTypeDAO } from "../repositories/index.js";

const getAllServiceType = async (req,res) => {
    try {
        const allServiceType = await serviceTypeDAO.getAllServiceType();
        res.status(200).json(allServiceType);
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

export default{
    getAllServiceType
}