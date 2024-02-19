import express from 'express';
import { serviceController} from '../controller/index.js';

const serviceRouter = express.Router();


serviceRouter.get('/', serviceController.getAllService);
//test pagination
//http://localhost:9999/service?page=2
//http://localhost:9999/service?page=1&pageSize=5

serviceRouter.post('/', serviceController.createService);

export default serviceRouter;