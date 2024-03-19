import express from "express";
import { billController } from "../controller/index.js";

const billRouter = express.Router();

// Route to add a new bill
/**
 * @swagger
 * /bill/add:
 *   post:
 *     summary: Add a new bill
 *     tags: [Bills]
 *     requestBody:
 *       description: Bill data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *
 *     responses:
 *       200:
 *         description: Bill added successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

billRouter.post("/add", billController.addBill);

// Route to get bills by service ID
/**
 * @swagger
 * /bill/history/{userID}:
 *   get:
 *     summary: Get bills by user ID
 *     tags: [Bills]
 *     parameters:
 *       - name: userID
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
billRouter.get("/history/", billController.getBillsByUserId);

export default billRouter;
