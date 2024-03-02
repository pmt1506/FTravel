import express from "express";
import reportController from "../controller/report.js";

const reportRouter = express.Router();
/**
 * @swagger
 * /report:
 *   get:
 *     summary: View all reports
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Server error
 */

reportRouter.get("/", reportController.viewAllReport);
/**
 * @swagger
 * /report/create:
 *   post:
 *     summary: Create a new report
 *     tags: [Reports]
 *     requestBody:
 *       description: Report data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *     responses:
 *       200:
 *         description: Report created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
reportRouter.post("/create", reportController.createReport);

/**
 * @swagger
 * /report/edit/{id}:
 *   patch:
 *     summary: Edit a report
 *     tags: [Reports]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Report ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated report data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *     responses:
 *       200:
 *         description: Report updated successfully
 *       404:
 *         description: Report not found
 *       500:
 *         description: Server error
 */
reportRouter.patch("/edit/:id", reportController.editReport);

export default reportRouter;
