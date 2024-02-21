import express from 'express';
import { cartController } from '../controller/index.js'

const cart = express.Router();

cart.post('/', cartController.addToCart);

cart.get('/:userID', cartController.viewCart)

cart.delete('/:serviceID', cartController.deleteFromCart)

export default cart;