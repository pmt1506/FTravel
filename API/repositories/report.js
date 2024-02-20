import Reports from "../models/report.js";

const createReport = async ({ content, serviceID, userID }) => {
    try {
        const newReport = await Reports.create({ content, serviceID, userID });
        return newReport._doc;
    } catch (error) {
        throw new Error(error.toString());
    }
};

const editReport = async (id, content) => {
    try {
        const updatedReport = await Reports.findOneAndUpdate( id, { content }, { new: true } );
        if(!updatedReport) {
            throw new Error("Report is not found");
        }
        return updatedReport;
    } catch (error) {
        throw new Error(error.toString());
    }
};

const viewAllReport = async () => {
    try
    {
        return await Reports.find().populate().exec();
    } catch (error)
    {
        throw new Error(error.toString());
    }
};

export default {
    createReport,
    editReport,
    viewAllReport,
}