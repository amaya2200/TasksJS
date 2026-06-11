import express from 'express';
import taskController from '../controllers/taskController';
import mainMiddleware from '../middlewares/mainMiddleware';

const taskRoutes = express.Router();

taskRoutes.get('/', mainMiddleware.getTasks, taskController.getTasks);
taskRoutes.patch('/completeStatus', mainMiddleware.updateCompleteStatus, taskController.updateCompleteStatus);
taskRoutes.delete('/tasksList/:tasksListId/task/:taskId', mainMiddleware.deleteTask, taskController.deleteTask);
taskRoutes.post('/create', mainMiddleware.createTask, taskController.createTask);
taskRoutes.patch('/title', mainMiddleware.updateTitle, taskController.updateTitle);

export default taskRoutes;