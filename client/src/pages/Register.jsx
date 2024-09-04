import React, { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    axios.defaults.withCredentials = true;
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/user/signup', {
                name,
                idNumber,
                email,
                password
            });

            console.log('Registered successfully:', response.data);
            navigate('/login');
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    return (
        <div className='min-h-screen min-w-full bg-slate-500 flex items-center justify-center'>
            <div className='flex justify-center w-full'>
                {/* <div className='w-96 border-2 border-orange-400 hidden md:block'>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                </div> */}
                <div className='w-96 border-2 border-orange-400 p-8'>
                    <form onSubmit={handleSubmit}>
                        <div className='flex justify-center mb-3'>
                            <FaUserCircle className='h-28 w-28 rounded-full border-2 border-red-700' />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="name" className='block text-white mb-2'>Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='w-full p-2 border border-gray-300 rounded-full' 
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="idNumber" className='block text-white mb-2'>ID Number</label>
                            <input 
                                type="text" 
                                id="idNumber" 
                                value={idNumber}
                                onChange={(e) => setIdNumber(e.target.value)}
                                className='w-full p-2 border border-gray-300 rounded-full' 
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="email" className='block text-white mb-2'>Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='w-full p-2 border border-gray-300 rounded-full' 
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="password" className='block text-white mb-2'>Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='w-full p-2 border border-gray-300 rounded-full' 
                            />
                        </div>
                        <div className='mb-3'>
                            <button type="submit" className='w-full mt-2 p-2 border border-gray-300 rounded-full'>Sign Up</button>
                        </div>
                        <div className='flex justify-center items-center'>
                            <span className='text-white'>Already have an account? </span>
                            <NavLink to="/login" className='underline text-white ml-1'>Sign In</NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
