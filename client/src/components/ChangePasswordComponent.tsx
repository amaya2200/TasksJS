import { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router";
import { authService } from '../services/authService';
import toast, { Toaster } from 'react-hot-toast';
import {AuthContext} from '../context/AuthContext';
import { AxiosError } from 'axios';

export const ChangePasswordComponent = () => {
    
    const [repassword, setRepassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewpassword] = useState('');
    const navigate = useNavigate();
    const context = useContext(AuthContext);

    const handleChangePassword = async () => {

        if(!oldPassword || !newPassword || !repassword){
            toast.error('Please complete all fields');
            return;
        }

        if(newPassword !== repassword){
            toast.error('Passwords do not match');
            return;
        }

        try {
            const username = context?.username || '';
            const request = await authService.changePassword({username,oldPassword,newPassword});
            toast.success(request.data.message || 'Password updated successfully');
            navigate('/');
        } catch (error) {
            if(error instanceof AxiosError){
                toast.error(error.response?.data.message);
            } else {
                toast.error('Error While changing password');
            }
        }

    }

    return (
        <div className ="h-full flex items-center justify-center">
            <form
                className="bg-white rounded-2xl shadow-md p-6 flex gap-4 flex-col items-center"
                onSubmit={(e) => {e.preventDefault();handleChangePassword();}}
            >
                <div className='flex flex-col w-full'>
                    <label className='text-sm'>Current Password:</label>
                    <input id="oldPassword" type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} className='p-1 rounded-md border'></input>
                </div>
                <div className='flex flex-col w-full'>
                    <label className='text-sm'>New Password:</label>
                    <input id="newPassword" type="password" value={newPassword} onChange={e => setNewpassword(e.target.value)} className='p-1 rounded-md border'></input>
                </div>
                <div className='flex flex-col w-full'>
                    <label className='text-sm'>Confirm New Password:</label>
                    <input id="repassword" type="password" value={repassword} onChange={e => setRepassword(e.target.value)} className='p-1 rounded-md border'></input>
                </div>
                <button type="submit" className='py-2 bg-sky-600 hover:bg-sky-500 w-full rounded-md text-white cursor-pointer'>Change Password</button>
                <Link className="hover:underline" to="/tasks">← Back</Link>
                <Toaster />
            </form>
        </div>
    )
}