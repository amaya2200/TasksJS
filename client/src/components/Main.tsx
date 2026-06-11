import type {taskList, task} from '../types/tasks'
import type { ReactNode } from 'react';
import { useState } from 'react';
import useUpdateTaskStatus from '../hooks/useUpdateTaskStatus';
import useDeleteTask from '../hooks/useDeleteTask';
import useCreateTask from '../hooks/useCreateTask';
import useUpdateTaskTitle from '../hooks/useUpdateTaskTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import createDeleteAlert from '../types/createDeleteAlert.js';

function Main({TasksLists, activeList}: {TasksLists?: taskList[], activeList:string|null}){

    const [newTask, setNewTask] = useState('');
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [editedTitle, setEditedTitle] = useState('');

    const updateTaskStatus = useUpdateTaskStatus();
    const deleteTask = useDeleteTask();
    const createTask = useCreateTask();
    const updateTask = useUpdateTaskTitle();

    if (!TasksLists || TasksLists.length === 0 || !activeList) {
        return null;
    }

    const handleCreateTask = () => {
        if(newTask.trim() === '') {
            toast.error('Task title cannot be empty');
            return;
        }
        createTask.mutate({ taskListId:activeList!, taskTitle:newTask });
        setNewTask('');
    };
    
    const handleDeleteButtonClick = async (taskListId: string, taskId: string) => {

        const result = await Swal.fire(createDeleteAlert('Delete Task?'));

        if (!result.isConfirmed) return;

        deleteTask.mutate({ taskListId, taskId });
    };
    
    const handleCheckboxChange = (taskListId: string, taskId: string, completed: boolean) => {
        updateTaskStatus.mutate({ taskListId, taskId, completed });
    };

    const startEditing = (task: task) => {
        setEditingTaskId(task._id);
        setEditedTitle(task.title);
    };

    const handleSave = () => {
        if (!editingTaskId) return;

        if (editedTitle.trim() === '') {
            toast.error('Title cannot be empty');
            return;
        }

        updateTask.mutate({
            taskListId: activeList!,
            taskId: editingTaskId,
            taskTitle: editedTitle,
        });

        setEditingTaskId(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSave();
        }

        if (e.key === 'Escape') {
            setEditingTaskId(null);
        }
    };

    let tasks: ReactNode[] | null = null;

    if(TasksLists && TasksLists.length > 0 && activeList){

        const TasksList = TasksLists.find(list => list._id === activeList);

        if(TasksList && TasksList.tasks && TasksList.tasks.length > 0){

            tasks = TasksList.tasks.map(task =>
                <tr key={task._id} className="text-center border border-gray-400 hover:bg-gray-400">
                    <td className="p-1">
                        {editingTaskId === task._id ? (
                            <input
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                                onKeyDown={handleKeyDown}
                                onBlur={handleSave}
                                autoFocus
                                className="w-full"
                            />
                        ) : (
                            <span onDoubleClick={() => startEditing(task)}>
                                {task.title}
                            </span>
                        )}
                    </td>
                    <td className="p-1">
                        <input type="checkbox" checked={task.completed} onChange={e => handleCheckboxChange(activeList!, task._id, e.target.checked)} className="h-4 w-4 accent-sky-600 cursor-pointer" disabled={task.isOptimistic}/>
                    </td>
                    <td className="p-1">
                        <button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 cursor-pointer" onClick={() => handleDeleteButtonClick(activeList!, task._id)} disabled={task.isOptimistic}>
                            <FontAwesomeIcon icon={faTrashCan} />Delete
                        </button>
                    </td>
                </tr>
            );

        }

    }

    return (
        <main className="flex flex-1 justify-center items-start p-4">
            <div className="w-[80%] flex flex-col gap-2">
                <table className="bg-white rounded-2xl shadow-md table-auto">
                    <thead>
                        <tr>
                            <th className="p-1">Description</th>
                            <th className="p-1">Completed</th>
                            <th className="p-1">Actions</th>
                        </tr>
                    </thead>
                    <tbody>{tasks}</tbody>
                </table>
                <form className="flex gap-2" onSubmit={e => {e.preventDefault(); handleCreateTask();}} >
                    <input id="newTask" type="text" value={newTask} onChange={e => setNewTask(e.target.value)} className='flex-1 bg-white w-full p-2 rounded-2xl shadow-md border outline-none' placeholder="Enter a new task..." autoComplete='off'></input>
                    <button type="submit" className='bg-sky-600 text-white py-2 px-4 rounded-2xl shadow-md hover:bg-sky-500'>Add Task</button>
                </form>
            </div>
        </main>
    );
}

export default Main