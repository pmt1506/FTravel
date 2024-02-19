import { reportDAO } from "../repositories/report.js";

const viewAllReport = async (req, res) => {
    const listReport = await reportDAO.viewAllReport()
    try
    {
        if(listReport.length > 0) {
            res.status(200).json(listReport);
        } else {
            res.status(401).json ({
                message: "Not found!",
            });
        }
    } catch (error)
    {
        res.status(404).json ({
            message: "Not found!",
        });
    }
};

const createReport = async (req, res) => {};

const editReport = async (req, res) => {};

export default {
    viewAllReport,
    createReport,
    editReport,
}