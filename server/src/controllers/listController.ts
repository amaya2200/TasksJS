import { Request, Response, NextFunction } from 'express'
import listService from '../services/listService';

const listController = {
  
  async createList(req: Request, res: Response, next: NextFunction) {

    try {

      const userId = req.user!.id;
      const listName = req.body.listName;

      const listId = await listService.createList(userId, listName);

      res.status(200).json({ message: 'List created successfully', listId });

    } catch (error) {
      next(error)
    }
    
  },

  async updateName(req: Request, res: Response, next: NextFunction) {

    try {

      const userId = req.user!.id;
      const tasksListId = req.body.tasksListId;
      const listName = req.body.listName;

      await listService.updateName(userId, tasksListId, listName);

      res.status(200).json({ message: 'List name updated successfully' });

    } catch (error) {
      next(error)
    }
    
  },

  async deleteList(req: Request, res: Response, next: NextFunction) {

    try {

      const userId = req.user!.id;
      const tasksListId = req.params.tasksListId;

      await listService.deleteList(userId, tasksListId);

      res.status(200).json({ message: 'List deleted successfully' });

    } catch (error) {
      next(error)
    }

  },

}

export default listController;