import React, { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import vote from '../../src/assets/vote1.png'; 

function Navbar(props) {
    const [left, setLeft] = useState('-150px');
    const handleClick = () => {
        setLeft((prevLeft) => (prevLeft === '-150px' ? '0' : '-150px'));
    };

    return (
        <>
            <div className="main min-w-full bg-slate-800 max-h-20 flex justify-between items-center z-10 sticky top-0">
                <div className="m-5 s:hidden px-5">    
                    <NavLink to="/home">
                        <img src={vote} alt="Logo" className="h-14 rounded-full" />
                    </NavLink>
                </div>
                <div className='flex justify-end gap-10 s:w-full s:justify-between'>
                    <div className="text-white font-bold m-5 hidden s:block">
                        <GiHamburgerMenu onClick={handleClick} className='font-light text-2xl' />
                    </div>
                    <div className="text-green-600 font-bold">
                        <div className={`s:bg-slate-800 p-5 s:absolute s:top-16 s:h-fit transition-all duration-500`} style={{ left: left }}>
                            <ul className="flex flex-col sm:flex-row sm:space-x-7 space-y-4 sm:space-y-0 rounded-lg s:space-y-8 text-white">
                                <li onClick={handleClick} className="hover:bg-slate-500 hover:underline p-2 rounded">
                                    <NavLink to="/home">{props.home}</NavLink>
                                </li>
                                <li onClick={handleClick} className="hover:bg-slate-500 hover:underline p-2 rounded">
                                    <NavLink to="/candidate">{props.candidate}</NavLink>
                                </li>
                                <li onClick={handleClick} className="hover:bg-slate-500 hover:underline p-2 rounded">
                                    <NavLink to="/vote">{props.vote}</NavLink>
                                </li>
                                <li onClick={handleClick} className="hover:bg-slate-500 hover:underline p-2 rounded">
                                    <NavLink to="/result">{props.result}</NavLink>
                                </li>
                                <li onClick={handleClick} className="hover:bg-slate-500 hover:underline p-2 rounded">
                                    <NavLink to="/profile">{props.profile}</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='flex justify-center items-center mr-9'>
                        <FaUserCircle className='h-12 w-12 bg-white rounded-full border-2 border-red-700' />
                    </div>
                </div>  
            </div>
        </>
    );
}

export default Navbar;
