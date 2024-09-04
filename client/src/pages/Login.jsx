import React, { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import img from '../../src/assets/portf.png'; // Remove if not used
import bg from '../../src/assets/bg.avif';  // Remove if not used

function Login() {
    const [idNumber, setIdNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/user/login', {
                email,
                idNumber,
                password,
            });
    
            const token = response.data.token;
            console.log(token);
            console.log('Logged in successfully');
    
            // Navigate to a protected route where Mainheader is rendered
            navigate('/home'); // Redirect to a route inside Mainheader
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };
    

    return (
        <div className='min-h-screen min-w-full bg-slate-500 flex items-center justify-center'>
            {/* style={{ backgroundImage: `url(${bg})` }}  */}
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
                        <div className='mb-3 flex justify-between items-center'>
                            <div className='flex items-center'>
                                <input type="checkbox" className="checkbox-custom" />
                                <label className='ml-2 text-white'>Check me</label>
                            </div>
                            <a href="" className='underline text-white'>Forgot Password</a>
                        </div>
                        <div className='mb-3'>
                            <button type="submit" className='w-full mt-2 p-2 border border-gray-300 rounded-full'>Login</button>
                        </div>
                        {/* <div className='flex justify-center items-center mb-3'>
                            <div className='h-[0.5px] w-32 bg-black mr-2'></div>
                            <span className='text-white'>or</span>
                            <div className='h-[0.5px] w-32 bg-black ml-2'></div>
                        </div>
                        <div className='mb-3'>
                            <button className='w-full mt-2 p-2 border border-gray-300 rounded-full flex items-center justify-center'>
                                <FcGoogle className='h-6 w-6 mr-2' />
                                Sign In using Google
                            </button>
                        </div> */}
                        <div className='flex justify-center items-center'>
                            <span className='text-white'>Don't have an account? </span>
                            <NavLink to="/register" className='underline text-white ml-1'>Sign Up</NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
