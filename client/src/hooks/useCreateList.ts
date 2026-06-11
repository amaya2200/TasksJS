import { useMutation, useQueryClient } from '@tanstack/react-query';
import listService from '../services/listService';
import toast from 'react-hot-toast';
import type { taskList } from '../types/tasks';
import { useNavigate } from "react-router";
import { useContext } from 'react';
import {AuthContext} from '../context/AuthContext';
import { AxiosError } from 'axios';

export default function useCreateList() {

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      listName
    }: {
      listName: string;
    }) => listService.createList(listName),

    onMutate: async ({ listName }) => {
      await queryClient.cancelQueries({ queryKey: ['tasksLists'] });

      const previousTasksLists = queryClient.getQueryData<taskList[]>(['tasksLists']);
      const tempId = `temp-${Date.now()}`;

      queryClient.setQueryData<taskList[]>(['tasksLists'], old => [
        ...(old ?? []),
        { _id: tempId, name: listName, tasks: [] }
      ]);

      return { previousTasksLists, tempId };
    },

    onError: (error: unknown, _vars, context) => {
      if (context?.previousTasksLists) {
        queryClient.setQueryData(['tasksLists'], context.previousTasksLists);
      }

      toast.error(
        error instanceof AxiosError ? error.response?.data.message : 'Error creating tasks list'
      );

      if(error instanceof AxiosError && error.response?.status === 401){
          authContext?.logout();
          navigate('/login');
      }
    },

    onSuccess: (taskListId, _vars, context) => {
      queryClient.setQueryData<taskList[]>(['tasksLists'], old =>
        old?.map(list =>
          list._id === context.tempId ? { ...list, _id: taskListId } : list
        )
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasksLists'] });
    },
  });
}