import { Request, Response, NextFunction } from 'express'
import taskService from '../services/taskService';
import { set } from 'mongoose';
import { nextTick } from 'node:process';

const tasksController = {
  
  async getTasks(req: Request, res: Response, next: NextFunction) {

    try {
      const userId = req.user!.id;
      const tasks = await taskService.getListsByUser(userId);
      res.status(200).json(tasks);
    } catch (error) {
      next(error)
    }

  },

  async updateCompleteStatus(req: Request, res: Response, next: NextFunction) {

    try {

      const userId = req.user!.id;
      const tasksListId = req.body.tasksListId;
      const taskId = req.body.taskId;
      const completed = req.body.completed;

      await taskService.updateCompleteStatus(userId, tasksListId, taskId, completed);

      res.status(200).json({ message: 'Task status updated successfully' });

    } catch (error) {
      next(error)
    }

  },

  async createTask(req: Request, res: Response, next: NextFunction) {

    try {

      const userId = req.user!.id;
      const tasksListId = req.body.tasksListId;
      const taskTitle = req.body.taskTitle;

      const taskId = await taskService.createTask(userId, tasksListId, taskTitle);

      res.status(200).json({ message: 'Task created successfully', taskId });

    } catch (error) {
      next(error)
    }
    
  },

  async updateTitle(req: Request, res: Response, next: NextFunction) {

    try {

      const userId = req.user!.id;
      const tasksListId = req.body.tasksListId;
      const taskId = req.body.taskId;
      const taskTitle = req.body.taskTitle;

      await taskService.updateTitle(userId, tasksListId, taskId, taskTitle);

      res.status(200).json({ message: 'Task title updated successfully' });

    } catch (error) {
      next(error)
    }
    
  },

  async deleteTask(req: Request, res: Response, next: NextFunction) {

    try {

      const userId = req.user!.id;
      const tasksListId = req.params.tasksListId;
      const taskId = req.params.taskId;

      await taskService.deleteTask(userId, tasksListId, taskId);

      res.status(200).json({ message: 'Task deleted successfully' });

    } catch (error) {
      next(error)
    }

  },

}

export default tasksController;