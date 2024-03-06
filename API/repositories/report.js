import Reports from "../models/report.js";

const createReport = async ({ content, serviceID, userID, status }) => {
  try {
    const newReport = await Reports.create({
      content,
      serviceID,
      userID,
      status,
    });
    return newReport._doc;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const editReport = async (id, status) => {
  try {
    const updatedReport = await Reports.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedReport) {
      throw new Error("Report is not found");
    }
    return updatedReport;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const viewAllReport = async () => {
  try {
    return await Reports.find().exec();
  } catch (error) {
    throw new Error(error.toString());
  }
};

export default {
  createReport,
  editReport,
  viewAllReport,
};
