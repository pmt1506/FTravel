import express from 'express';
import { serviceController} from '../controller/index.js';

const serviceRouter = express.Router();

//have filter for user
serviceRouter.get('/', serviceController.getAllServiceByType);
//test pagination
//http://localhost:9999/service?page=2
//http://localhost:9999/service?page=1&pageSize=5

//for admin
serviceRouter.get('/', serviceController.getAllServiceAdmin);

serviceRouter.post('/create/', serviceController.createService);

serviceRouter.get('/:id', serviceController.getServiceByID);

serviceRouter.get('/name/:serviceName', serviceController.getServiceByName); 

serviceRouter.put('/:id', serviceController.editService); 

// Delete service by ID - not use, we hide it by edit status
// serviceRouter.delete('/:id', serviceController.deleteServiceByID);
export default serviceRouter;