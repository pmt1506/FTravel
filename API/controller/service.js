import { serviceDAO } from "../repositories/index.js";

const createService = async (req, res) => {
  try {
    const {
      title,
      thumbnail,
      slot,
      price,
      description,
      startDate,
      endDate,
      accountID,
      region,
      city,
      type,
      status,
    } = req.body;

    const result = await serviceDAO.createService({
      title,
      thumbnail,
      slot,
      price,
      description,
      startDate,
      endDate,
      accountID,
      region,
      city,
      type,
      status,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};

// const getAllService = async (req, res) => {
//   try {
//     //pagination
//     const page = req.body.page || 1; // Trang mặc định là 1 nếu không fix
//     const pageSize = req.body.pageSize || 8; //Số lượng hiển thị trên trang là 10 nếu không fix
//     const type = req.body.type;
//     const allServices = await serviceDAO.getAllService(page, pageSize, type);
//     if (allServices.length === 0) {
//       return res.status(404).json({ message: "No services found" });
//     }
//     res.status(200).json({ allServices, page, total: allServices.length });
//   } catch (error) {
//     res.status(500).json({
//       message: error.toString(),
//     });
//   }
// };

const getAllServiceByType = async (req, res) => {
  try {
    const { type, page, pageSize, sortBy } = req.query;

    if (!type) {
      return res.status(400).json({
        message: 'Please provide the "type" parameter in the query.',
      });
    }

    // Validate and set default values for page and pageSize
    const validatedPage = parseInt(page, 10) || 1;
    const validatedPageSize = parseInt(pageSize, 10) || 10;

    if (validatedPage <= 0 || validatedPageSize <= 0) {
      return res.status(400).json({
        message: 'Invalid values for "page" or "pageSize".',
      });
    }

    // Filter services by type with pagination and sorting
    const servicesByType = await serviceDAO.getAllServiceByType(
      type,
      validatedPage,
      validatedPageSize,
      sortBy
    );

    // Get service count by type
    const serviceCountByType = await serviceDAO.getServiceCountByType(type);

    // Calculate total pages
    const totalPages = Math.ceil(serviceCountByType / validatedPageSize);

    res.status(200).json({
      servicesByType,
      total: serviceCountByType,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

const getAllServiceAdmin = async (req, res) => {
  try {
    //pagination
    const page = req.body.page || 1; // Trang mặc định là 1 nếu không fix
    const pageSize = req.body.pageSize || 10; //Số lượng hiển thị trên trang là 10 nếu không fix
    const allServices = await serviceDAO.getAllServiceAdmin(page, pageSize);
    if (allServices.length === 0) {
      return res.status(404).json({ message: "No services found" });
    }
    res.status(200).json({ allServices, page, total: allServices.length });
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

const getServiceByID = async (req, res) => {
  try {
    const serviceID = req.params.id;

    const serviceByID = await serviceDAO.getServiceByID(serviceID);
    if (serviceByID) {
      res.status(200).json(serviceByID);
    } else {
      res.status(404).json({
        message: "Service not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};
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
        message: "Service not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};

const getAllServiceByVendor = async (req, res) => {
  try {
    const { accountID, page, pageSize } = req.query;

    if (!accountID) {
      return res.status(400).json({
        message: 'Please provide the "accountID" parameter in the query.',
      });
    }
    // Validate and set default values for page and pageSize
    const validatedPage = parseInt(page, 10) || 1;
    const validatedPageSize = parseInt(pageSize, 10) || 8;

    if (validatedPage <= 0 || validatedPageSize <= 0) {
      return res.status(400).json({
        message: 'Invalid values for "page" or "pageSize".',
      });
    }

    // Filter services by vendor with pagination
    const servicesByVendor = await serviceDAO.getServiceByVendor(
      accountID,
      validatedPage,
      validatedPageSize
    );

    // Get service count by vendor
    const serviceCountByVendor = await serviceDAO.getServiceCountByVedor(
      accountID
    );

    // Calculate total pages
    const totalPages = Math.ceil(serviceCountByVendor / validatedPageSize);

    res
      .status(200)
      .json({ servicesByVendor, total: serviceCountByVendor, totalPages });
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

const editService = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      thumbnail,
      slot,
      price,
      description,
      startDate,
      endDate,
      accountID,
      region,
      city,
      type,
      status,
    } = req.body;

    const editedService = await serviceDAO.editService(id, {
      title,
      thumbnail,
      slot,
      price,
      description,
      startDate,
      endDate,
      accountID,
      region,
      city,
      type,
      status,
    });

    if (editedService) {
      res.status(200).json(editedService);
    } else {
      res.status(404).json({
        message: "Service not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};

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

export default {
  createService,
  getAllServiceByType,
  getServiceByID,
  getServiceByName,
  editService,
  getAllServiceAdmin,
  getAllServiceByVendor,
  // deleteServiceByID
};
