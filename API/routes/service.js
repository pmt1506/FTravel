import express from "express";
import { serviceController } from "../controller/index.js";
import verifyToken from "../middleware/authen.js";

const serviceRouter = express.Router();

//have filter for user
/**
 * @swagger
 * /service:
 *   post:
 *     summary: Get all services (filtered for user)
 *     tags: [Services]
 *     requestBody:
 *       description: Filter criteria (if any)
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Server error
 */

serviceRouter.get("/", serviceController.getAllServiceByType);
serviceRouter.get('/search', serviceController.getServicesByNameWithStatusAndTypes);

//test pagination
//http://localhost:9999/service?page=2
//http://localhost:9999/service?page=1&pageSize=5

//for vendor
serviceRouter.get("/vendor", serviceController.getAllServiceByVendor);

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
serviceRouter.post("/add", verifyToken, serviceController.createService);
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
