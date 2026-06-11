import { useMutation, useQueryClient } from '@tanstack/react-query';
import taskService from '../services/taskService';
import toast from 'react-hot-toast';
import type { taskList } from '../types/tasks';
import { useNavigate } from "react-router";
import { useContext } from 'react';
import {AuthContext} from '../context/AuthContext';
import { AxiosError } from 'axios';

export default function useCreateTask() {

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      taskListId,
      taskTitle
    }: {
      taskListId: string;
      taskTitle: string;
    }) => taskService.createTask(taskListId, taskTitle),

    onMutate: async ({ taskListId, taskTitle }) => {
      await queryClient.cancelQueries({ queryKey: ['tasksLists'] });

      const previousTasksLists = queryClient.getQueryData<taskList[]>(['tasksLists']);
      const tempId = `temp-${Date.now()}`;

      queryClient.setQueryData<taskList[]>(['tasksLists'], old =>
        old?.map(list =>
          list._id !== taskListId ? list: {
            ...list, tasks: [
              ...list.tasks,
              {
                _id: tempId,
                title: taskTitle,
                completed: false,
                isOptimistic: true,
              },
            ],
          }
        )
      );

      return { previousTasksLists, tempId };
    },

    onError: (error: unknown, _vars, context) => {
      if (context?.previousTasksLists) {
        queryClient.setQueryData(['tasksLists'], context.previousTasksLists);
      }

      toast.error(
        error instanceof AxiosError ? error.response?.data.message : 'Error creating task'
      );

      if(error instanceof AxiosError && error.response?.status === 401){
          authContext?.logout();
          navigate('/login');
      }
    },

    onSuccess: (taskId, vars, context) => {
      queryClient.setQueryData<taskList[]>(['tasksLists'], old =>
        old?.map(list =>
          list._id !== vars.taskListId ? list : {
            ...list,
            tasks: list.tasks.map(task =>
              task._id === context.tempId ? { ...task, _id: taskId } : task
            ),
          }
        )
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasksLists'] });
    },
  });
}