import Reports from "../models/report.js";

const createReport = async () => {};

const editReport = async () => {};

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