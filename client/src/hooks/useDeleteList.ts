import { useMutation, useQueryClient } from '@tanstack/react-query';
import listService from '../services/listService';
import toast from 'react-hot-toast';
import type { taskList } from '../types/tasks';
import { useNavigate } from "react-router";
import { useContext } from 'react';
import {AuthContext} from '../context/AuthContext';
import { AxiosError } from 'axios';

export default function useDeleteList() {

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      taskListId
    }: {
      taskListId: string;
    }) => listService.deleteList(taskListId),

    onMutate: async ({ taskListId }) => {
      await queryClient.cancelQueries({ queryKey: ['tasksLists'] });

      const previousTasksLists = queryClient.getQueryData<taskList[]>(['tasksLists']);

      queryClient.setQueryData<taskList[]>(['tasksLists'], old =>
        old?.filter(list => list._id !== taskListId)
      );

      return { previousTasksLists };
    },

    onError: (error: unknown, _vars, context) => {
      if (context?.previousTasksLists) {
        queryClient.setQueryData(['tasksLists'], context.previousTasksLists);
      }

      toast.error(
        error instanceof AxiosError ? error.response?.data.message : 'Error deleting task list'
      );

      if(error instanceof AxiosError && error.response?.status === 401){
          authContext?.logout();
          navigate('/login');
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasksLists'] });
    },
  });
}