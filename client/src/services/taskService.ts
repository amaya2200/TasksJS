import api from '../api/axios'
import type {taskList} from '../types/tasks.js'

const taskService = {

  async getTasks():Promise<taskList[]> {
    const response = await api.get('/task');
    return response.data;
  },

  async updateCompleteStatus(tasksListId: string, taskId: string, completed: boolean):Promise<void> {
    await api.patch(`/task/completeStatus`, { tasksListId, taskId, completed });
  },

  async createTask(tasksListId: string, taskTitle: string):Promise<string> {
    const response = await api.post(`/task/create`, { tasksListId, taskTitle });
    return response.data.taskId;
  },

  async updateTaskTitle(tasksListId: string, taskId: string, taskTitle: string):Promise<void> {
    await api.patch(`/task/title`, { tasksListId, taskId, taskTitle });
  },

  async deleteTask(tasksListId: string, taskId: string):Promise<void> {
    await api.delete(`task/tasksList/${tasksListId}/task/${taskId}`);
  },

}

export default taskService;