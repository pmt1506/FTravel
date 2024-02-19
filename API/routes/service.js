import express from 'express';
import { serviceController} from '../controller/index.js';

const serviceRouter = express.Router();


serviceRouter.get('/', serviceController.getAllService);

serviceRouter.post('/', serviceController.createService);

export default serviceRouter;