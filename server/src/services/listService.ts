import { Types } from 'mongoose';
import tasksListModel from '../models/tasksListModel';

const listService = {

  async createList(userId: string, listName: string): Promise<string> {

    const newList = new tasksListModel({ user: userId, name: listName, tasks: [] });
    const savedList = await newList.save();
    return savedList._id.toString();

  },

  async updateName(userId: string, tasksListId: string, listName: string): Promise<void> {

    const tasksList = await tasksListModel.findOne({ user: userId, _id: tasksListId });

    if (!tasksList) {
      throw new Error('Task list not found');
    }

    tasksList.name = listName;
    await tasksList.save();

  },

  async deleteList(userId: string, tasksListId: string): Promise<void> {

    const tasksList = await tasksListModel.findOne({ user: userId, _id: tasksListId });

    if (!tasksList) {
      throw new Error('Task list not found');
    }

    await tasksList.deleteOne();

  },

}

export default listService;
