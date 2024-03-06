import express from "express";
import { serviceController } from "../controller/index.js";

const serviceRouter = express.Router();

//have filter for user
serviceRouter.get('/', serviceController.getAllServiceByType);
//test pagination
//http://localhost:9999/service?page=2
//http://localhost:9999/service?page=1&pageSize=5

//for admin

serviceRouter.get("/all", serviceController.getAllServiceAdmin);
// http://localhost:9999/service/all

/**
 * @swagger
 * /service:
 *   post:
 *     summary: Create a new service
 *     tags: [Services]
 *     requestBody:
 *       description: Service data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *
 *     responses:
 *       200:
 *         description: Service created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
serviceRouter.post("/", serviceController.createService);
/**
 * @swagger
 * /service/{id}:
 *   get:
 *     summary: Get a service by ID
 *     tags: [Services]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Service ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Service not found
 *       500:
 *         description: Server error
 */

serviceRouter.get("/:id", serviceController.getServiceByID);
/**
 * @swagger
 * /service/name/{serviceName}:
 *   get:
 *     summary: Get a service by name
 *     tags: [Services]
 *     parameters:
 *       - name: serviceName
 *         in: path
 *         description: Service name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Service not found
 *       500:
 *         description: Server error
 */

serviceRouter.get("/name/:serviceName", serviceController.getServiceByName);
/**
 * @swagger
 * /service/{id}:
 *   put:
 *     summary: Edit a service by ID
 *     tags: [Services]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Service ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated service data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *     responses:
 *       200:
 *         description: Service updated successfully
 *       404:
 *         description: Service not found
 *       500:
 *         description: Server error
 */
serviceRouter.put("/:id", serviceController.editService);

// Delete service by ID - not use, we hide it by edit status
// serviceRouter.delete('/:id', serviceController.deleteServiceByID);
export default serviceRouter;
