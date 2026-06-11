import api from '../api/axios'

const listService = {

  async createList(listName: string):Promise<string> {
    const response = await api.post(`/list/create`, { listName });
    return response.data.listId;
  },

  async updateListName(tasksListId: string, listName: string):Promise<void> {
    await api.patch(`/list/name`, { tasksListId, listName });
  },

  async deleteList(tasksListId: string):Promise<void> {
    await api.delete(`list/tasksList/${tasksListId}`);
  },

}

export default listService;