import Services from "../models/service.js";
import ServiceTypes from "../models/serviceType.js";

//Create a new service

const createService = async ({
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
      accountID,
      region,
      city,
      type,
      status: true,
    });
    return newService._doc;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const getAllServiceByType = async (
  type,
  page,
  pageSize,
  sortBy,
  minPrice,
  maxPrice,
  region,
  city
) => {
  try {
    const skip = (page - 1) * pageSize;
    const limit = pageSize;

    let query = { status: true };

    if (type) {
      query.type = type;
    }

    // Add min and max price conditions to the query if provided
    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      query.price = { $gte: minPrice, $lte: maxPrice };
    }

    // Add region and city conditions to the query
    if (region) {
      query.region = region;
    }

    if (city) {
      query.city = city;
    }

    // Check if both minPrice and maxPrice are NaN, if so, exclude price condition from the query
    if (isNaN(minPrice) && isNaN(maxPrice)) {
      delete query.price;
    }

    let sortQuery = {};
    if (sortBy) {
      // Determine sorting order based on the sortBy parameter
      const sortOrder = sortBy.startsWith("-") ? -1 : 1;
      const sortField = sortOrder === -1 ? sortBy.substring(1) : sortBy;

      sortQuery[sortField] = sortOrder;
    }

    if (!page && !pageSize) {
      return await Services.find(query).populate("type").sort(sortQuery);
    }

    const services = await Services.find(query)
      .skip(skip)
      .limit(limit)
      .populate("type")
      .sort(sortQuery)
      .exec();

    return services;
  } catch (error) {
    throw new Error(error.toString());
  }
};

// Get services count by type
const getServiceCountByType = async (type) => {
  try {
    const allServices = await Services.find({ status: true, type: type })
      .populate("type")
      .countDocuments();
    return allServices;
  } catch (error) {
    throw new Error(error.toString());
  }
};

//Get all services for admin
const getAllServiceAdmin = async (page, pageSize) => {
  try {
    //pagination
    const startIndex = (page - 1) * pageSize;
    const allServices = await Services.find()
      .populate("type", "serviceName")
      .populate("accountID", "username")
      .skip(startIndex)
      .limit(pageSize);
    return allServices.map((service) => service._doc);
  } catch (error) {
    throw new Error(error.toString());
  }
};
//Get Service by ID
const getServiceByID = async (serviceID) => {
  try {
    const service = await Services.findById(serviceID).populate("type").exec();
    if (!service) {
      throw new Error("Service not found");
    }
    return service._doc;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const getServicesByNameWithStatusAndTypes = async (keyword, serviceID) => {
  try {
    if (!keyword || !serviceID) {
      return []; // Return an empty array if keyword is empty or serviceIDs is not valid
    }

    const servicesStartsWith = await Services.find({
      title: { $regex: `^${keyword}` },
      type: serviceID,
      status: true,
    }).populate("type");

    const servicesContains = await Services.find({
      title: { $regex: keyword },
      type: serviceID,
      status: true,
    }).populate("type");

    const services = [...servicesStartsWith, ...servicesContains];

    return services;
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

//Get Service by vendor
const getServiceByVendor = async (accountID, page, pageSize) => {
  try {
    const skip = (page - 1) * pageSize;
    const limit = pageSize;

    const services = await Services.find({ accountID: accountID })
      .skip(skip)
      .limit(limit)
      .populate("accountID", "username")
      .populate("type", "serviceName")
      .exec();

    return services;
  } catch (error) {
    throw new Error(error.toString());
  }
};

// Get services count by vendor
const getServiceCountByVedor = async (accountID) => {
  try {
    const allServices = await Services.find({
      accountID: accountID,
    })
      .populate("accountID")
      .countDocuments();
    return allServices;
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
    accountID,
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
        accountID,
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
  getAllServiceByType,
  getServiceCountByType,
  getServiceByID,
  getServiceByName,
  editService,
  getAllServiceAdmin,
  getServiceByVendor,
  getServiceCountByVedor,
  getServicesByNameWithStatusAndTypes,
  // deleteServiceByID
};
