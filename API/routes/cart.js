import express from "express";
import { cartController } from "../controller/index.js";

const cart = express.Router();
/**
 * @swagger
 * /carts:
 *   post:
 *     summary: Add an item to the cart
 *     tags: [Cart]
 *     requestBody:
 *       description: Cart item data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define your cart item properties here
 *               // Example: product ID, quantity, etc.
 *     responses:
 *       200:
 *         description: Item added to the cart successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
cart.post("/", cartController.addToCart);
/**
 * @swagger
 * /carts/{userID}:
 *   get:
 *     summary: View the user's cart
 *     tags: [Cart]
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
cart.get("/:userID", cartController.viewCart);
/**
 * @swagger
 * /carts/{serviceID}:
 *   delete:
 *     summary: Remove an item from the cart
 *     tags: [Cart]
 *     parameters:
 *       - name: serviceID
 *         in: path
 *         description: Service ID to remove from the cart
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item removed from the cart successfully
 *       404:
 *         description: Service not found in the cart
 *       500:
 *         description: Server error
 */
cart.delete("/:serviceID", cartController.deleteFromCart);

export default cart;
