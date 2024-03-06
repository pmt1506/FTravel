import express from 'express';
import { serviceTypeController} from '../controller/index.js';

const serviceTypeRouter = express.Router();


serviceTypeRouter.get('/', serviceTypeController.getAllServiceType);

export default serviceTypeRouter;