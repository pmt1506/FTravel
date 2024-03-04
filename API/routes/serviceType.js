import express from "express";
import { serviceTypeController } from "../controller/index.js";

const serviceTypeRouter = express.Router();

/**
 * @swagger
 * /type:
 *   get:
 *     summary: Get all type service)
 *     tags: [ServiceType]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Server error
 */
serviceTypeRouter.get("/", serviceTypeController.getAllServiceType);

export default serviceTypeRouter;
