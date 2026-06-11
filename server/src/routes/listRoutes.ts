import express from 'express';
import listController from '../controllers/listController';
import mainMiddleware from '../middlewares/mainMiddleware';

const listRoutes = express.Router();

listRoutes.delete('/tasksList/:tasksListId', mainMiddleware.deleteList, listController.deleteList);
listRoutes.post('/create', mainMiddleware.createList, listController.createList);
listRoutes.patch('/name', mainMiddleware.updateName, listController.updateName);

export default listRoutes;