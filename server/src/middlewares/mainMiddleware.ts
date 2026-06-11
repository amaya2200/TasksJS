import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

function validateStringParameter(value: unknown, name: string): string {
    if (typeof value !== 'string') {
        throw new Error(`${name} must be a string`);
    }

    const trimmed = value.trim();

    if (!trimmed) {
        throw new Error(`${name} cannot be empty`);
    }

    return trimmed;
}

function validateMongoId(id: string, name: string): void {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error(`Invalid ${name}`);
    }
}

const mainMiddleware = {

    getTasks (req: Request, res: Response, next: NextFunction) {
        const userId = req.user!.id;
        validateMongoId(userId, 'User ID');
        next();
    },

    updateCompleteStatus (req: Request, res: Response, next: NextFunction) {
        const userId = req.user!.id;
        const tasksListId = req.body.tasksListId;
        const taskId = req.body.taskId;
        const completed = req.body.completed;

        validateMongoId(userId, 'User ID');
        validateMongoId(tasksListId, 'Tasks List ID');
        validateMongoId(taskId, 'Task ID');

        if (typeof completed !== 'boolean') {
            throw new Error('completed must be a boolean');
        }

        next();
    },

    createTask (req: Request, res: Response, next: NextFunction) {
        const userId = req.user!.id;
        const tasksListId = req.body.tasksListId;
        const taskTitle = req.body.taskTitle;
        validateMongoId(userId, 'User ID');
        validateMongoId(tasksListId, 'Tasks List ID');
        req.body.taskTitle = validateStringParameter(taskTitle, 'Task Title');
        next();
    },

    updateTitle (req: Request, res: Response, next: NextFunction) {
        const userId = req.user!.id;
        const tasksListId = req.body.tasksListId;
        const taskId = req.body.taskId;
        const taskTitle = req.body.taskTitle;
        validateMongoId(userId, 'User ID');
        validateMongoId(tasksListId, 'Tasks List ID');
        validateMongoId(taskId, 'Task ID');
        req.body.taskTitle = validateStringParameter(taskTitle, 'Task Title');
        next();
    },

    deleteTask (req: Request, res: Response, next: NextFunction) {
        const userId = req.user!.id;
        const tasksListId = req.params.tasksListId;
        const taskId = req.params.taskId;
        validateMongoId(userId, 'User ID');
        validateMongoId(tasksListId, 'Tasks List ID');
        validateMongoId(taskId, 'Task ID');
        next();
    },

    createList (req: Request, res: Response, next: NextFunction) {
        const userId = req.user!.id;
        const listName = req.body.listName;
        validateMongoId(userId, 'User ID');
        req.body.listName = validateStringParameter(listName, 'List Name');
        next();
    },

    updateName (req: Request, res: Response, next: NextFunction) {
        const userId = req.user!.id;
        const tasksListId = req.body.tasksListId;
        const listName = req.body.listName;
        validateMongoId(userId, 'User ID');
        validateMongoId(tasksListId, 'Tasks List ID');
        req.body.listName = validateStringParameter(listName, 'List Name');
        next();
    },

    deleteList (req: Request, res: Response, next: NextFunction) {
        const userId = req.user!.id;
        const tasksListId = req.params.tasksListId;
        validateMongoId(userId, 'User ID');
        validateMongoId(tasksListId, 'Tasks List ID');
        next();
    },

}

export default mainMiddleware;