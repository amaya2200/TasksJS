import { useQuery } from '@tanstack/react-query';
import Sidebar from "../components/Sidebar"
import Main from "../components/Main"
import taskService from "../services/taskService"
import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { AxiosError } from 'axios';
import { useNavigate } from "react-router";

export const TasksPage = () => {

    const [activeList, setActiveList] = useState<string | null>(null);
    const navigate = useNavigate();
    const context = useContext(AuthContext);

    const { isPending, isError, isSuccess, data, error } = useQuery({
        queryKey: ['tasksLists'],
        queryFn: taskService.getTasks,
    });

    if (isSuccess && data && data.length > 0 && !activeList) {
        setActiveList(data[0]._id);
    }

    useEffect(() => {
        if (isPending) {
            const loadingToast = toast.loading('Loading data...');
            return () => toast.dismiss(loadingToast);
        }
    }, [isPending]);

    useEffect(() => {
        if (isError) {
            if(error instanceof AxiosError){
                toast.error(error.response?.data.message);

                if(error.response?.status === 401){
                    context?.logout();
                    navigate('/login');
                }

            } else {
                toast.error('Error fetching tasks');
            }
        }
    }, [isError, error, navigate, context]);

    useEffect(() => {
        if (!data) return;

        const activeListExists = data.some(list => list._id === activeList);

        if (!activeListExists) {setActiveList(data.length > 0 ? data[0]._id : null);}
    }, [data, activeList]);

    return (
        <div className="flex h-full w-full">
            <Sidebar 
                TasksLists = {data}
                activeList = {activeList}
                setActiveList = {setActiveList}
            />
            <Main 
                TasksLists = {data}
                activeList = {activeList}
            />
            <Toaster />
        </div>
    )
}