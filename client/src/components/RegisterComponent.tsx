import { useState } from 'react';
import { Link, useNavigate } from "react-router";
import { authService } from '../services/authService';
import toast, { Toaster } from 'react-hot-toast';

export const RegisterComponent = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const navigate = useNavigate();

    const handleButton = async () => {

        try {
            if(!username || !password || !repassword){
                toast.error('Please complete all fields');
                return;
            }

            if(password !== repassword){
                toast.error('Passwords do not match');
                return;
            }

            const request = await authService.register({username,password});
            toast.success(request.data.message || 'User registered successfully');
            navigate('/login');
        } catch (error) {
            if(error instanceof Error){
                toast.error(error.message);
            } else {
                toast.error('Error While registering user');
            }
        }

    }

    return (
        <div className="bg-white rounded-2xl shadow-md p-6 flex gap-4 flex-col items-center">
            <div className='flex flex-col w-full'>
                <label className='text-sm'>Username:</label>
                <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} className='p-1 rounded-md border'></input>
            </div>
            <div className='flex flex-col w-full'>
                <label className='text-sm'>Password:</label>
                <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className='p-1 rounded-md border'></input>
            </div>
            <div className='flex flex-col w-full'>
                <label className='text-sm'>Confirm Password:</label>
                <input id="repassword" type="password" value={repassword} onChange={e => setRepassword(e.target.value)} className='p-1 rounded-md border'></input>
            </div>
            <button onClick={handleButton} className='py-2 bg-sky-600 hover:bg-sky-500 w-full rounded-md text-white cursor-pointer'>Create User</button>
            <Link className="hover:underline" to="/login">← Back</Link>
            <Toaster />
        </div>
    )
}