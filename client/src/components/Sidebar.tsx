import type {taskList} from '../types/tasks.js'
import type { ReactNode } from 'react';
import { useState } from 'react';
import useDeleteList from '../hooks/useDeleteList';
import useCreateList from '../hooks/useCreateList';
import useUpdateListName from '../hooks/useUpdateListName';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import createDeleteAlert from '../types/createDeleteAlert.js';

function Sidebar({TasksLists, activeList, setActiveList}: {TasksLists?: taskList[], activeList:string|null, setActiveList: (id: string) => void;}){

    const [newList, setNewList] = useState('');

    const deleteList = useDeleteList();
    const createList = useCreateList();
    const updateListName = useUpdateListName();

    const [editingTasksListId, setEditingTasksListId] = useState<string | null>(null);
    const [editedName, setEditedName] = useState('');

    const handleCreateList = () => {
        if(newList.trim() === '') {
            toast.error('List name cannot be empty');
            return;
        }
        createList.mutate({ listName: newList });
        setNewList('');
    };
    
    const handleDeleteList = async (taskListId: string) => {
        const result = await Swal.fire(
            createDeleteAlert(
                'Delete List?',
                'All tasks contained in this list will also be deleted.'
            )
        );

        if (!result.isConfirmed) return;

        deleteList.mutate({taskListId});
    };

    const handleSaveListName = () => {
        if (!editingTasksListId) return;

        if (editedName.trim() === '') {
            toast.error('List name cannot be empty');
            return;
        }

        updateListName.mutate({
            taskListId: editingTasksListId,
            listName: editedName,
        });

        setEditingTasksListId(null);
    };

    const handleListNameKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSaveListName();
        }

        if (e.key === 'Escape') {
            setEditingTasksListId(null);
        }
    };

    const startEditingList = (list: taskList) => {
        setEditingTasksListId(list._id);
        setEditedName(list.name);
    };

    let ItemsMenu: ReactNode[] | null = null;
    
    if(TasksLists){

        ItemsMenu = TasksLists.map(list =>
            <li
                key={list._id}
                className={`p-4 hover:bg-gray-200 hover:text-black hover:font-normal flex justify-between cursor-pointer ${list._id === activeList ? 'bg-gray-200 text-black font-normal' : 'font-light'}`}
                onClick={() => setActiveList(list._id)}
            >
                {editingTasksListId === list._id ? (
                    <input
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        onBlur={handleSaveListName}
                        onKeyDown={handleListNameKeyDown}
                        autoFocus
                        className="bg-white border-2 outline-none rounded-md p-1"
                    />
                ) : (
                    <span onDoubleClick={() => startEditingList(list)}>
                        {list.name}
                    </span>
                )}
                <span className='hover:bg-gray-400 p-1 rounded-2xl' onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteList(list._id);
                }}><FontAwesomeIcon icon={faTrashCan} /></span>
            </li>
        )

    }

    return (
        <aside className="w-[20%] h-full bg-white shadow-2xl flex flex-col justify-between">
            <ul>
                {ItemsMenu}
            </ul>
            <form className="flex" onSubmit={e => {e.preventDefault(); handleCreateList();}} >
                <input id="newList" type="text" value={newList} onChange={e => setNewList(e.target.value)} className='flex-1 bg-white w-full p-2 m-2 rounded-2xl shadow-md border outline-none' placeholder="Enter a new list..." autoComplete='off'></input>
            </form>
        </aside>
    );
}

export default Sidebar