import { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router";
import {AuthContext} from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { AxiosError } from 'axios';

export const LoginComponent = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const handleButton = async () => {

        try {
            await authContext?.login(username, password);
            navigate('/tasks');
        } catch (error) {
            if(error instanceof AxiosError){
                toast.error(error.response?.data.message);
            } else {
                toast.error('Error While logging in user');
            }
        }

    }

    return (
        <div className ="h-full flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-md p-6 flex gap-4 flex-col items-center">
                <div className='flex flex-col w-full'>
                    <label className='text-sm'>Username:</label>
                    <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} className='p-1 rounded-md border'></input>
                </div>
                <div className='flex flex-col w-full'>
                    <label className='text-sm'>Password:</label>
                    <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className='p-1 rounded-md border'></input>
                </div>
                <button onClick={handleButton} className='py-2 bg-sky-600 hover:bg-sky-500 w-full rounded-md text-white cursor-pointer'>Login</button>
                <Link className="hover:underline" to="/register">Not registered? Register Here</Link>
                <Toaster />
            </div>
        </div>
    )
}