import { Types } from 'mongoose';
import tasksListModel from '../models/tasksListModel';

const taskService = {

  async getListsByUser(userId: string) {

    const listasTareas = await tasksListModel.find({ user: userId }).sort({ createdAt: -1 }).lean();
    return listasTareas;
  },

  async updateCompleteStatus(userId: string, tasksListId: string, taskId: string, completed: boolean): Promise<void> {

    const tasksList = await tasksListModel.findOne({ user: userId, _id: tasksListId });

    if (!tasksList) {
      throw new Error('Task list not found');
    }

    const task = tasksList.tasks.id(taskId);

    if (!task) {
      throw new Error('Task not found');
    }

    task.completed = completed;
    await tasksList.save();

  },

  async createTask(userId: string, tasksListId: string, taskTitle: string): Promise<string> {

    const tasksList = await tasksListModel.findOne({ user: userId, _id: tasksListId });

    if (!tasksList) {
      throw new Error('Task list not found');
    }

    tasksList.tasks.push({ title: taskTitle, completed: false });
    await tasksList.save();
    return tasksList.tasks[tasksList.tasks.length - 1]._id.toString();

  },

  async updateTitle(userId: string, tasksListId: string, taskId: string, taskTitle: string): Promise<void> {

    const tasksList = await tasksListModel.findOne({ user: userId, _id: tasksListId });

    if (!tasksList) {
      throw new Error('Task list not found');
    }

    const task = tasksList.tasks.id(taskId);

    if (!task) {
      throw new Error('Task not found');
    }

    task.title = taskTitle;
    await tasksList.save();

  },

  async deleteTask(userId: string, tasksListId: string, taskId: string): Promise<void> {

    const tasksList = await tasksListModel.findOne({ user: userId, _id: tasksListId });

    if (!tasksList) {
      throw new Error('Task list not found');
    }

    const task = tasksList.tasks.id(taskId);

    if (!task) {
      throw new Error('Task not found');
    }

    task.deleteOne();
    await tasksList.save();

  },

};

export default taskService;