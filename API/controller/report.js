import reportDAO from "../repositories/report.js";

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

const createReport = async (req, res) => {
    try {
        const { content, serviceID, userID, status } = req.body;
        const newReport = await reportDAO.createReport({ content, serviceID, userID, status });
        res.status(201).json(newReport);
    } catch (error){
        res.status(500).json({ error: error.toString() });
    }
};

const editReport = async (req, res) => {
    try {
        const { status } = req.body;
        const newStatus = !status;
        const { id } = req.params;
        const editedReport = await reportDAO.editReport(id, newStatus);
        res.status(200).json(editedReport);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

export default {
    viewAllReport,
    createReport,
    editReport
}