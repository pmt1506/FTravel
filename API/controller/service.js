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

const getServiceByID = async (req, res) => {
    try {
        const serviceID = req.params.id; 

        const serviceByID = await serviceDAO.getServiceByID(serviceID); 
        if (serviceByID) {
            res.status(200).json(
                serviceByID
            );
        } else {
            res.status(404).json({
                message: "Service not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
}
const getServiceByName = async (req, res) => {
    try {
        // const name = req.params.serviceName;
        // const data = serviceDAO.find((x) => x.name === name);
    
        const { serviceName } = req.params;

        const serviceByName = await serviceDAO.getServiceByName(serviceName);
        if (serviceByName) {
            res.status(200).json(serviceByName);
        } else {
            res.status(404).json({
                message: "Service not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
}

const editService = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, thumbnail, slot, price, description, startDate, endDate, companyID, region, city, type, status } = req.body;

        const editedService = await serviceDAO.editService(id, {
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

        if (editedService) {
            res.status(200).json(editedService);
        } else {
            res.status(404).json({
                message: "Service not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
}

// Delete service - not use, we hide it by edit status
// const deleteServiceByID = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const deletedService = await serviceDAO.deleteServiceByID(id);
//         if (deletedService) {
//             res.status(200).json(deletedService);
//         } else {
//             res.status(404).json({
//                 message: "Service not found"
//             });
//         }
//     } catch (error) {
//         res.status(500).json({
//             error: error.toString()
//         });
//     }
// }

export default{
    createService,
    getAllService,
    getServiceByID,
    getServiceByName,
    editService
    // deleteServiceByID
}