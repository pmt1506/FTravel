import Services from "../models/service.js";

//Create a new service
const createService = async ({
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
  status,
}) => {
  try {
    const newService = await Services.create({
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
      status,
    });
    return newService._doc;
  } catch (error) {
    throw new Error(error.toString());
  }
};

//Get all services
const getAllService = async (page, pageSize, type) => {
  try {
    //pagination
    const startIndex = (page - 1) * pageSize;
    if (!type) {
      return await Services.find({ status: true })
        .populate("type")
        .skip(startIndex)
        .limit(pageSize);
    }
    const allServices = await Services.find({ status: true, type: type })
      .populate("type")
      .skip(startIndex)
      .limit(pageSize);
    return allServices.map((service) => service._doc);
  } catch (error) {
    throw new Error(error.toString());
  }
};

//Get all services for admin
const getAllServiceAdmin = async (page, pageSize) => {
  try {
    //pagination
    const startIndex = (page - 1) * pageSize;
    const allServices = await Services.find().skip(startIndex).limit(pageSize);
    return allServices.map((service) => service._doc);
  } catch (error) {
    throw new Error(error.toString());
  }
};

//Get Service by ID
const getServiceByID = async (serviceID) => {
  try {
    const service = await Services.findById(serviceID);
    if (!service) {
      throw new Error("Service not found");
    }
    return service._doc;
  } catch (error) {
    throw new Error(error.toString());
  }
};
//Get Service by name - find service
const getServiceByName = async (serviceName) => {
  try {
    const service = await Services.findOne({ title: serviceName });
    if (!service) {
      throw new Error("Service not found");
    }
    return service._doc;
  } catch (error) {
    throw new Error(error.toString());
  }
};

// Edit service
const editService = async (
  id,
  {
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
    status,
  }
) => {
  try {
    const editService = await Services.findByIdAndUpdate(
      id,
      {
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
        status,
      },
      { new: true }
    ); //new true là tạo bản ghi mới nếu không tìm thấy {_id:id}
    if (!editService) {
      throw new Error("Service not found");
    }
    return editService._doc;
  } catch (error) {
    throw new Error(error.toString());
  }
};

//// Delete service by ID - not use, we hide it by edit status
// const deleteServiceByID = async (serviceID) => {
//     try {
//         const deletedService = await Services.findByIdAndDelete(serviceID);
//         if (!deletedService) {
//             throw new Error("Service not found");
//         }
//         return deletedService._doc;
//     } catch (error) {
//         throw new Error(error.toString());
//     }
// }

export default {
  createService,
  getAllService,
  getServiceByID,
  getServiceByName,
  editService,
  getAllServiceAdmin,
  // deleteServiceByID
};
