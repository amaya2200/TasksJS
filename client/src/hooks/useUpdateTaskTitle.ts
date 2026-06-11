import { useMutation, useQueryClient } from '@tanstack/react-query';
import taskService from '../services/taskService';
import toast from 'react-hot-toast';
import type { taskList } from '../types/tasks';
import { useNavigate } from "react-router";
import { useContext } from 'react';
import {AuthContext} from '../context/AuthContext';
import { AxiosError } from 'axios';

export default function useUpdateTaskTitle() {

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      taskListId,
      taskId,
      taskTitle,
    }: {
      taskListId: string;
      taskId: string;
      taskTitle: string;
    }) => taskService.updateTaskTitle(taskListId, taskId, taskTitle),

    onMutate: async ({ taskListId, taskId, taskTitle }) => {
      await queryClient.cancelQueries({ queryKey: ['tasksLists'] });

      const previousTasksLists = queryClient.getQueryData<taskList[]>(['tasksLists']);

      queryClient.setQueryData<taskList[]>(['tasksLists'], old =>
        old?.map(list =>
          list._id !== taskListId
            ? list
            : {
                ...list,
                tasks: list.tasks?.map(task =>
                  task._id === taskId ? { ...task, title: taskTitle } : task
                ),
              }
        )
      );

      return { previousTasksLists };
    },

    onError: (error: unknown, _vars, context) => {
      if (context?.previousTasksLists) {
        queryClient.setQueryData(['tasksLists'], context.previousTasksLists);
      }

      toast.error(
        error instanceof AxiosError ? error.response?.data.message : 'Error updating task title'
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